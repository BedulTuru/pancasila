import { Request, Response } from 'express';
import { prisma } from '../index';

export class AchievementController {
  static async getMine(req: Request, res: Response) {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.user!.userId },
      include: { achievement: true },
      orderBy: { earnedAt: 'desc' },
    });
    res.json(achievements);
  }

  static async getAll(req: Request, res: Response) {
    const achievements = await prisma.achievement.findMany({
      orderBy: { points: 'asc' },
    });
    res.json(achievements);
  }
}
