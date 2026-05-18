import { Request, Response } from 'express';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';
import { v4 as uuidv4 } from 'uuid';
import { logActivity } from '../utils/logger';
import fs from 'fs';
import path from 'path';

export class MaterialController {
  static async getAll(req: Request, res: Response) {
    const { categoryId, difficulty, targetRange, type, search, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);
    
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'TUTOR';
    const where: any = isAdmin ? {} : { isPublished: true };
    
    if (categoryId) where.categoryId = categoryId;
    if (difficulty) where.difficulty = difficulty;
    if (targetRange) where.targetRange = targetRange;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }

    const [materials, total] = await Promise.all([
      prisma.material.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { id: true, name: true, slug: true, color: true } },
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { comments: true } },
        },
      }),
      prisma.material.count({ where }),
    ]);

    res.json({ 
      data: materials, 
      pagination: { 
        page: parseInt(page as string), 
        limit: take, 
        total, 
        totalPages: Math.ceil(total / take) 
      } 
    });
  }

  static async getBySlug(req: Request, res: Response) {
    const userId = req.user?.userId;

    const material = await prisma.material.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: {
          include: {
            quizzes: { where: { isPublished: true }, take: 1 }
          }
        },
        author: { select: { id: true, name: true, avatar: true } },
        comments: {
          where: { parentId: null },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
            replies: { include: { user: { select: { id: true, name: true, avatar: true } } } }
          },
          orderBy: { createdAt: 'desc' }
        },
        progress: userId ? { where: { userId } } : false,
      },
    });

    if (!material) throw new AppError(404, 'Materi tidak ditemukan');

    const isStaff = req.user?.role === 'ADMIN' || req.user?.role === 'TUTOR';
    if (!material.isPublished && !isStaff) {
      throw new AppError(403, 'Materi ini sedang dalam mode draft');
    }

    // Async increment (fire and forget)
    prisma.material.update({
      where: { id: material.id },
      data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment viewCount:', err));

    res.json(material);
  }

  static async create(req: Request, res: Response) {
    const { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, targetRange, isPublished, type } = req.body;
    
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + uuidv4().slice(0, 8);

    const material = await prisma.material.create({
      data: { 
        title, slug, content, description, coverImage, 
        videoUrl, driveUrl, fileUrl, categoryId, 
        authorId: req.user!.userId, 
        difficulty: difficulty || 'EASY', 
        targetRange: targetRange || '4-7',
        isPublished: isPublished || false,
        type: type || 'ARTICLE'
      },
      include: { category: true, author: { select: { id: true, name: true } } },
    });

    await logActivity(req.user!.userId, 'CREATE_MATERIAL', 'material', material.id, `Membuat materi: ${title}`, req);
    res.status(201).json(material);
  }

  static async update(req: Request, res: Response) {
    const existing = await prisma.material.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new AppError(404, 'Materi tidak ditemukan');
    
    if (existing.authorId !== req.user!.userId && req.user!.role !== 'ADMIN') {
      throw new AppError(403, 'Tidak diizinkan memperbarui materi orang lain');
    }

    const { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, targetRange, isPublished, type } = req.body;
    
    const material = await prisma.material.update({
      where: { id: req.params.id },
      data: { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, targetRange, isPublished, type },
      include: { category: true },
    });

    await logActivity(req.user!.userId, 'UPDATE_MATERIAL', 'material', material.id, `Memperbarui materi`, req);
    res.json(material);
  }

  static async delete(req: Request, res: Response) {
    const existing = await prisma.material.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new AppError(404, 'Materi tidak ditemukan');
    
    if (existing.authorId !== req.user!.userId && req.user!.role !== 'ADMIN') {
      throw new AppError(403, 'Tidak diizinkan menghapus materi orang lain');
    }

    // Cleanup physical files
    const cleanupFile = (fileUrl: string | null) => {
      if (!fileUrl) return;
      // Extract filename from URL (assuming /uploads/filename.ext)
      const filename = fileUrl.split('/').pop();
      if (!filename) return;
      const filePath = path.join(process.cwd(), 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    cleanupFile(existing.fileUrl);
    cleanupFile(existing.coverImage);

    await prisma.material.delete({ where: { id: req.params.id } });
    await logActivity(req.user!.userId, 'DELETE_MATERIAL', 'material', req.params.id, `Menghapus materi`, req);
    res.status(204).send();
  }
}
