import { Request, Response } from 'express';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { materials: true, quizzes: true } } },
    });
    res.json(categories);
  }

  static async create(req: Request, res: Response) {
    const { name, slug, icon, color, order } = req.body;
    const category = await prisma.category.create({ 
      data: { name, slug, icon, color, order: order || 0 } 
    });
    res.status(201).json(category);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, slug, icon, color, order } = req.body;
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, icon, color, order }
    });
    res.json(category);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const materials = await prisma.material.count({ where: { categoryId: id } });
    const quizzes = await prisma.quiz.count({ where: { categoryId: id } });
    
    if (materials > 0 || quizzes > 0) {
      throw new AppError(400, 'Kategori sedang digunakan oleh materi atau kuis dan tidak bisa dihapus.');
    }
    
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  }
}
