import { Request } from 'express';
import { prisma } from '../index';

export const logActivity = async (
  userId: string, 
  action: string, 
  entityType?: string, 
  entityId?: string, 
  details?: string, 
  req?: Request
) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action: action.toUpperCase(),
        entityType,
        entityId,
        details,
        ipAddress: req?.ip,
        userAgent: req?.headers['user-agent'],
      },
    });
  } catch (error) {
    console.error('❌ Failed to log activity:', error);
  }
};
