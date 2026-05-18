import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { config } from '../config';
import { AppError } from './error.middleware';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  tokenVersion: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError(401, 'Token tidak ditemukan');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true, tokenVersion: true },
    });

    if (!user || !user.isActive) {
      throw new AppError(401, 'Pengguna tidak ditemukan atau nonaktif');
    }

    if (user.tokenVersion !== decoded.tokenVersion) {
      throw new AppError(401, 'Sesi telah berakhir, silakan login kembali');
    }

    req.user = { 
      userId: user.id, 
      email: user.email, 
      role: user.role,
      tokenVersion: user.tokenVersion
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Sesi telah berakhir, silakan login kembali');
    }
    throw new AppError(401, 'Token tidak valid');
  }
};

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, role: true, isActive: true, tokenVersion: true },
      });
      if (user && user.isActive && user.tokenVersion === decoded.tokenVersion) {
        req.user = { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          tokenVersion: user.tokenVersion
        };
      }
    } catch (error) {
      // Silently fail for optional auth
    }
  }
  next();
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, 'Izin tidak cukup untuk mengakses fitur ini');
    }
    next();
  };
};

export const adminSecretCheck = (req: Request, res: Response, next: NextFunction) => {
  const secret = req.headers['x-admin-secret-key'];
  
  if (req.user?.role === 'ADMIN' && secret !== config.ADMIN_SECRET_KEY) {
    throw new AppError(403, 'Akses ditolak: Kunci rahasia admin tidak valid.');
  }
  next();
};

export const maintenanceGuard = async (req: Request, res: Response, next: NextFunction) => {
  const systemConfig = await prisma.systemConfig.findFirst();
  
  if (!systemConfig) return next();

  // LOCKDOWN MODE: Only ADMIN allowed
  if (systemConfig.lockdownMode) {
    if (req.user?.role !== 'ADMIN') {
      throw new AppError(423, 'PROTOKOL LOCKDOWN AKTIF: Seluruh akses platform dibatasi secara ketat.');
    }
    return next();
  }

  // MAINTENANCE MODE: ADMIN, TUTOR allowed
  if (systemConfig.maintenanceMode) {
    if (req.user?.role === 'ADMIN' || req.user?.role === 'TUTOR') {
      return next();
    }
    throw new AppError(503, systemConfig.maintenanceMsg || 'Sistem sedang dalam pemeliharaan.');
  }

  next();
};
