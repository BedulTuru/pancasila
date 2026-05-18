import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from './error.middleware';

export const ipBlacklistGuard = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  
  if (!ip) return next();

  const isBlacklisted = await prisma.ipBlacklist.findUnique({
    where: { ip }
  });

  if (isBlacklisted) {
    throw new AppError(403, 'Akses ditolak: Alamat IP Anda telah diblokir oleh protokol keamanan pusat.');
  }

  next();
};
