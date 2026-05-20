import { Request, Response } from 'express';
import os from 'os';
import bcrypt from 'bcryptjs';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';
import { logActivity } from '../utils/logger';

import jwt from 'jsonwebtoken';
import { config } from '../config';

export class AdminController {
  static async getAnalytics(req: Request, res: Response) {
    const [totalUsers, totalMaterials, totalQuizzes, totalAttempts, recentActivity, popularMaterials, categoryStats] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' as any } }),
      prisma.material.count(),
      prisma.quiz.count(),
      prisma.quizAttempt.count(),
      prisma.activityLog.findMany({ 
        orderBy: { createdAt: 'desc' }, 
        take: 20, 
        include: { user: { select: { name: true } } } 
      }),
      prisma.material.findMany({ 
        where: { isPublished: true }, 
        orderBy: { viewCount: 'desc' }, 
        take: 10, 
        select: { id: true, title: true, viewCount: true, slug: true } 
      }),
      prisma.category.findMany({ 
        include: { _count: { select: { materials: true, quizzes: true } } } 
      }),
    ]);

    const avgPassRate = await prisma.quizAttempt.aggregate({ _avg: { percentage: true } });

    // Cold materials (Least viewed)
    const coldMaterials = await prisma.material.findMany({
      where: { isPublished: true },
      orderBy: { viewCount: 'asc' },
      take: 10,
      select: { id: true, title: true, viewCount: true, slug: true }
    });

    res.json({
      totals: { users: totalUsers, materials: totalMaterials, quizzes: totalQuizzes, attempts: totalAttempts },
      avgPassRate: Math.round(avgPassRate._avg.percentage || 0),
      popularMaterials, 
      coldMaterials,
      categoryStats, 
      recentActivity,
    });
  }

  static async getSystemMetrics(req: Request, res: Response) {
    const startDb = Date.now();
    let dbStatus = 'CONNECTED';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (err) {
      dbStatus = 'DISCONNECTED';
    }
    const dbLatency = Date.now() - startDb;

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const [activeSessions, systemConfig] = await Promise.all([
      prisma.user.count({
        where: {
          OR: [
            { lastLoginAt: { gte: fifteenMinutesAgo } },
            { progress: { some: { lastReadAt: { gte: fifteenMinutesAgo } } } }
          ]
        }
      }),
      prisma.systemConfig.findFirst()
    ]);

    const metrics = {
      cpuLoad: os.loadavg()[0],
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
      uptime: os.uptime(),
      dbStatus,
      latency: dbLatency || 10,
      activeSessions: activeSessions || 1, // Fallback to at least 1 (active admin)
      lockdownMode: systemConfig?.lockdownMode || false,
      osType: os.type(),
      osRelease: os.release(),
      nodeVersion: process.version,
      architecture: os.arch(),
    };
    res.json(metrics);
  }

  static async getUsers(req: Request, res: Response) {
    const { page = '1', limit = '20', role, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        select: { 
          id: true, email: true, name: true, role: true, 
          avatar: true, isActive: true, loginStreak: true, 
          lastLoginAt: true, createdAt: true, 
          _count: { select: { quizAttempts: true, achievements: true } } 
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({ 
      data: users, 
      pagination: { 
        page: parseInt(page as string), 
        limit: take, 
        total, 
        totalPages: Math.ceil(total / take) 
      } 
    });
  }

  static async exportUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        level: true,
        points: true,
        loginStreak: true,
        isActive: true,
        createdAt: true,
      }
    });

    let csv = '\uFEFF'; // UTF-8 BOM
    csv += 'ID,Nama,Email,Role,Level,Poin (XP),Login Streak,Status Aktif,Tanggal Terdaftar\n';

    users.forEach(u => {
      const escape = (val: any) => {
        const str = String(val ?? '').replace(/"/g, '""');
        return `"${str}"`;
      };
      csv += `${escape(u.id)},${escape(u.name)},${escape(u.email)},${escape(u.role)},${u.level},${u.points},${u.loginStreak},${u.isActive ? 'Aktif' : 'Nonaktif'},${escape(new Date(u.createdAt).toLocaleString('id-ID'))}\n`;
    });

    await logActivity(req.user!.userId, 'EXPORT_USERS', 'security', 'all', `Ekspor data seluruh pengguna ke CSV`, req);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=pancasila_users.csv');
    res.status(200).send(csv);
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { role, isActive } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { role, isActive },
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });

    await logActivity(req.user!.userId, 'UPDATE_USER', 'user', user.id, `Memperbarui role/status pengguna`, req);
    res.json(user);
  }

  static async resetPassword(req: Request, res: Response) {
    const { id } = req.params;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, config.BCRYPT_ROUNDS);

    await prisma.user.update({
      where: { id },
      data: { 
        password: hashedPassword,
        tokenVersion: { increment: 1 } // Force logout on password reset
      }
    });

    await logActivity(req.user!.userId, 'RESET_PASSWORD', 'user', id, `Mereset password pengguna`, req);
    res.json({ success: true, message: 'Password has been successfully re-encrypted.' });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    if (id === req.user!.userId) throw new AppError(400, 'Tidak dapat menghapus akun sendiri');
    
    await prisma.user.delete({ where: { id } });
    await logActivity(req.user!.userId, 'DELETE_USER', 'user', id, `Menghapus pengguna`, req);
    res.status(204).send();
  }

  static async evictSession(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } }
    });
    
    await logActivity(req.user!.userId, 'EVICT_SESSION', 'user', userId, `Memutuskan sesi aktif pengguna`, req);
    res.json({ success: true, message: 'Session Revocation Protocol Engaged.' });
  }

  static async getAuditLogs(req: Request, res: Response) {
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: {
          select: { name: true, email: true, role: true }
        }
      }
    });
    res.json(logs);
  }

  static async getAnnouncements(req: Request, res: Response) {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(announcements);
  }

  static async createAnnouncement(req: Request, res: Response) {
    const { title, content, priority } = req.body;
    const announcement = await prisma.announcement.create({
      data: { 
        title, 
        content, 
        priority: priority || 0,
        isActive: true
      }
    });

    await logActivity(req.user!.userId, 'CREATE_ANNOUNCEMENT', 'announcement', announcement.id, `Membuat pengumuman: ${title}`, req);
    res.json(announcement);
  }

  static async deleteAnnouncement(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.announcement.delete({ where: { id } });
    await logActivity(req.user!.userId, 'DELETE_ANNOUNCEMENT', 'announcement', id, `Menghapus pengumuman`, req);
    res.status(204).send();
  }

  static async verifyPin(req: Request, res: Response) {
    // Middlware superAdminPinCheck already verified it if it reached here
    res.json({ success: true, message: 'Authorization Synchronized.' });
  }

  static async impersonate(req: Request, res: Response) {
    const { userId } = req.params;
    
    const targetUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!targetUser) throw new AppError(404, 'User not found');

    const token = jwt.sign(
      { userId: targetUser.id, email: targetUser.email, role: targetUser.role, tokenVersion: targetUser.tokenVersion },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await logActivity(req.user!.userId, 'IMPERSONATE_USER', 'user', userId, `Impersonating user: ${targetUser.email}`, req);
    
    res.json({ 
      token, 
      user: {
        id: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
        role: targetUser.role
      } 
    });
  }

  static async getSystemConfig(req: Request, res: Response) {
    let systemConfig = await prisma.systemConfig.findFirst();
    if (!systemConfig) {
      systemConfig = await prisma.systemConfig.create({ data: { maintenanceMode: false } });
    }
    res.json(systemConfig);
  }

  static async updateSystemConfig(req: Request, res: Response) {
    const { 
      maintenanceMode, lockdownMode, maintenanceMsg, 
      broadcastActive, broadcastTitle, broadcastMsg, broadcastPriority,
      easyColor, mediumColor, hardColor
    } = req.body;

    const boolMaintenance = Boolean(maintenanceMode);
    const boolLockdown = Boolean(lockdownMode);
    const boolBroadcast = Boolean(broadcastActive);
    let systemConfig = await prisma.systemConfig.findFirst();
    
    if (systemConfig) {
      systemConfig = (await prisma.systemConfig.update({
        where: { id: systemConfig.id },
        data: { 
          maintenanceMode: boolMaintenance, 
          lockdownMode: boolLockdown,
          maintenanceMsg,
          broadcastActive: boolBroadcast,
          broadcastTitle,
          broadcastMsg,
          broadcastPriority: parseInt(broadcastPriority as string) || 0,
          easyColor,
          mediumColor,
          hardColor
        } as any
      })) as any;
    } else {
      systemConfig = (await prisma.systemConfig.create({ 
        data: { 
          maintenanceMode: boolMaintenance, 
          lockdownMode: boolLockdown,
          maintenanceMsg,
          broadcastActive: boolBroadcast,
          broadcastTitle,
          broadcastMsg,
          broadcastPriority: parseInt(broadcastPriority as string) || 0,
          easyColor,
          mediumColor,
          hardColor
        } as any
      })) as any;
    }

    await logActivity(req.user!.userId, 'UPDATE_SYSTEM_CONFIG', 'config', (systemConfig as any).id, `Update System Config`, req);
    res.json(systemConfig);
  }

  static async getBlacklist(req: Request, res: Response) {
    const list = await prisma.ipBlacklist.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(list);
  }

  static async blacklistIp(req: Request, res: Response) {
    const { ip, reason } = req.body;
    if (!ip) throw new AppError(400, 'IP address is required');

    const entry = await prisma.ipBlacklist.upsert({
      where: { ip },
      update: { reason, blockedBy: req.user!.email },
      create: { ip, reason, blockedBy: req.user!.email }
    });

    await logActivity(req.user!.userId, 'BLACKLIST_IP', 'security', ip, `IP Terdaftar di Blacklist: ${reason}`, req);
    res.json(entry);
  }

  static async removeBlacklistIp(req: Request, res: Response) {
    const { id } = req.params;
    const entry = await prisma.ipBlacklist.delete({ where: { id } });
    await logActivity(req.user!.userId, 'UNBLACKLIST_IP', 'security', entry.ip, `IP Dihapus dari Blacklist`, req);
    res.status(204).send();
  }

  static async getFeedbacks(req: Request, res: Response) {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true, role: true, avatar: true }
        }
      }
    });
    res.json(feedbacks);
  }

  static async deleteFeedback(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.feedback.delete({ where: { id } });
    await logActivity(req.user!.userId, 'DELETE_FEEDBACK', 'feedback', id, `Menghapus saran/pesan pengaduan`, req);
    res.status(204).send();
  }
}
