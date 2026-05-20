import { Request, Response } from 'express';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';
import fs from 'fs';
import path from 'path';
import { logActivity } from '../utils/logger';
import { StorageService } from '../services/storage.service';

const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '../../uploads');

export class MiscController {
  static async getAnnouncements(req: Request, res: Response) {
    const announcements = await prisma.announcement.findMany({ 
      where: { isActive: true }, 
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }] 
    });
    res.json(announcements);
  }

  static async createAnnouncement(req: Request, res: Response) {
    const { title, content, priority } = req.body;
    const announcement = await prisma.announcement.create({ 
      data: { title, content, priority: priority || 0 } 
    });
    await logActivity(req.user!.userId, 'CREATE_ANNOUNCEMENT', 'announcement', announcement.id, `Membuat pengumuman: ${title}`, req);
    res.status(201).json(announcement);
  }

  static async getFiles(req: Request, res: Response) {
    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }
    const files = fs.readdirSync(uploadsDir).map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return { 
        name: file, 
        size: stats.size, 
        url: `/uploads/${file}`, 
        createdAt: stats.birthtime 
      };
    });
    res.json(files);
  }

  static async handleUpload(req: Request, res: Response) {
    if (!req.file) throw new AppError(400, 'Tidak ada file diupload');
    const fileUrl = await StorageService.uploadFile(req.file);
    await logActivity(req.user!.userId, 'UPLOAD_FILE', 'file', undefined, `Mengupload: ${req.file.originalname}`, req);
    res.json({ 
      url: fileUrl, 
      name: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype 
    });
  }

  static async getUploadSignature(req: Request, res: Response) {
    const signatureData = StorageService.getUploadSignature();
    res.json(signatureData);
  }

  static async healthCheck(req: Request, res: Response) {
    try {
      // Quick database query to wake up/keep Neon database warm
      await prisma.$queryRaw`SELECT 1`;
      res.json({ 
        status: 'ok', 
        db: 'connected',
        timestamp: new Date().toISOString(), 
        uptime: process.uptime() 
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        db: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}
