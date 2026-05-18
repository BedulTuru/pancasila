import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { config } from '../config';
import { AppError } from '../middleware/error.middleware';
import { calculateLevel, XP_REWARDS } from '../utils/levelSystem';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError(400, 'Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, config.BCRYPT_ROUNDS);
    
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'STUDENT' as any },
      select: { id: true, email: true, name: true, role: true, createdAt: true, xp: true, level: true, points: true },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, tokenVersion: 0 },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN as any }
    );

    res.status(201).json({ user, token });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError(401, 'Email atau password salah');
    }

    // Check account lockout
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = Math.ceil((user.lockUntil.getTime() - new Date().getTime()) / 60000);
      throw new AppError(403, `Akun terkunci sementara karena terlalu banyak percobaan masuk. Coba lagi dalam ${remainingTime} menit.`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const attempts = user.loginAttempts + 1;
      const lockUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
      
      await prisma.user.update({
        where: { id: user.id },
        data: { loginAttempts: attempts, lockUntil }
      });

      throw new AppError(401, 'Email atau password salah');
    }

    if (!user.isActive) {
      throw new AppError(403, 'Akun dinonaktifkan. Silakan hubungi admin.');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastLogin = user.lastStreakAt ? new Date(user.lastStreakAt) : null;
    lastLogin?.setHours(0, 0, 0, 0);

    let newStreak = user.loginStreak;
    let xpEarned = 0;

    if (!lastLogin || lastLogin.getTime() < today.getTime()) {
      const diffDays = lastLogin ? Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)) : 0;
      if (diffDays === 1) newStreak += 1;
      else if (diffDays > 1) newStreak = 1;
      else newStreak = Math.max(newStreak, 1);
      xpEarned = XP_REWARDS.DAILY_LOGIN;
    }

    const newXp = user.xp + xpEarned;
    const newLevel = calculateLevel(newXp);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastStreakAt: new Date(),
        loginStreak: newStreak,
        xp: newXp,
        level: newLevel,
        points: { increment: xpEarned },
        loginAttempts: 0,
        lockUntil: null
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, tokenVersion: user.tokenVersion },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN as any }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        loginStreak: newStreak,
        xp: newXp,
        level: newLevel,
        points: user.points + xpEarned
      },
      token,
    });
  }

  static async me(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { 
        id: true, email: true, name: true, role: true, 
        avatar: true, loginStreak: true, createdAt: true, 
        xp: true, level: true, points: true 
      },
    });
    if (!user) throw new AppError(404, 'Pengguna tidak ditemukan');
    res.json(user);
  }
}
