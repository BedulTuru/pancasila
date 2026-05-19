import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from './error.middleware';

export const ipBlacklistGuard = async (req: Request, res: Response, next: NextFunction) => {
  let ip = req.ip;
  
  if (!ip) return next();

  // Normalize IPv4-mapped IPv6 address (e.g. ::ffff:127.0.0.1 -> 127.0.0.1)
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  const isBlacklisted = await prisma.ipBlacklist.findUnique({
    where: { ip }
  });

  if (isBlacklisted) {
    throw new AppError(403, 'Akses ditolak: Alamat IP Anda telah diblokir oleh protokol keamanan pusat.');
  }

  next();
};
