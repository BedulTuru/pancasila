import { Request, Response } from 'express';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';
import { v4 as uuidv4 } from 'uuid';
import { logActivity } from '../utils/logger';
import { XP_REWARDS, calculateLevel } from '../utils/levelSystem';

export class QuizController {
  static async getAll(req: Request, res: Response) {
    const { categoryId, difficulty, targetRange, search, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);
    
    const isAdmin = req.user?.role === 'ADMIN' || req.user?.role === 'TUTOR';
    const where: any = isAdmin ? {} : { isPublished: true };
    
    if (categoryId) where.categoryId = categoryId;
    if (difficulty) where.difficulty = difficulty;
    if (targetRange) where.targetRange = targetRange;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }

    const [quizzes, total] = await Promise.all([
      prisma.quiz.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { id: true, name: true, slug: true, color: true } },
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { questions: true, attempts: true } },
        },
      }),
      prisma.quiz.count({ where }),
    ]);

    res.json({ 
      data: quizzes, 
      pagination: { 
        page: parseInt(page as string), 
        limit: take, 
        total, 
        totalPages: Math.ceil(total / take) 
      } 
    });
  }

  static async getBySlug(req: Request, res: Response) {
    const quiz = await prisma.quiz.findUnique({
      where: { slug: req.params.slug },
      include: { 
        category: true, 
        author: { select: { id: true, name: true, avatar: true } }, 
        questions: { 
          orderBy: { order: 'asc' }, 
          include: { options: { orderBy: { order: 'asc' } } } 
        } 
      },
    });

    if (!quiz) throw new AppError(404, 'Kuis tidak ditemukan');

    const isStaff = req.user?.role === 'ADMIN' || req.user?.role === 'TUTOR';
    if (!quiz.isPublished && !isStaff) {
      throw new AppError(403, 'Kuis ini belum dipublikasikan');
    }

    const sanitizedQuestions = quiz.questions.map(q => ({
      id: q.id, 
      content: q.content, 
      hint: q.hint, 
      imageUrl: q.imageUrl, 
      driveUrl: q.driveUrl, 
      order: q.order, 
      points: q.points,
      options: quiz.shuffle 
        ? q.options.sort(() => Math.random() - 0.5).map(o => ({ id: o.id, content: o.content })) 
        : q.options.map(o => ({ id: o.id, content: o.content })),
    }));

    res.json({ ...quiz, questions: sanitizedQuestions });
  }

  static async create(req: Request, res: Response) {
    const { 
      title, description, categoryId, difficulty, targetRange,
      quizType, timeLimit, shuffle, passingScore, 
      isPublished, questions 
    } = req.body;

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + uuidv4().slice(0, 8);

    const quiz = await prisma.quiz.create({
      data: {
        title, slug, description, categoryId, 
        authorId: req.user!.userId,
        difficulty: difficulty || 'EASY', 
        targetRange: targetRange || '4-7',
        quizType: quizType || 'MULTIPLE_CHOICE',
        timeLimit: timeLimit || 3600, 
        shuffle: shuffle !== false, 
        passingScore: passingScore || 70, 
        isPublished: isPublished || false,
        questions: questions ? {
          create: questions.map((q: any, idx: number) => ({
            content: q.content, 
            hint: q.hint, 
            explanation: q.explanation, 
            imageUrl: q.imageUrl, 
            driveUrl: q.driveUrl, 
            order: idx, 
            points: q.points || 1,
            options: { 
              create: q.options.map((o: any, oIdx: number) => ({ 
                content: o.content, 
                isCorrect: o.isCorrect || false, 
                order: oIdx 
              })) 
            },
          })),
        } : undefined,
      },
      include: { category: true, questions: { include: { options: true } } },
    });

    await logActivity(req.user!.userId, 'CREATE_QUIZ', 'quiz', quiz.id, `Membuat kuis: ${title}`, req);
    res.status(201).json(quiz);
  }

  static async attempt(req: Request, res: Response) {
    const { answers, timeSpent } = req.body;
    const quizId = req.params.id;
    
    const quiz = await prisma.quiz.findUnique({ 
      where: { id: quizId }, 
      include: { questions: { include: { options: true } } } 
    });
    
    if (!quiz) throw new AppError(404, 'Kuis tidak ditemukan');

    let score = 0, totalScore = 0;
    const attemptAnswers = quiz.questions.map(question => {
      totalScore += question.points;
      const userAnswer = answers.find((a: any) => a.questionId === question.id);
      const correctOption = question.options.find(o => o.isCorrect);
      const isCorrect = correctOption ? userAnswer?.answer === correctOption.id : false;

      if (isCorrect) score += question.points;
      return {
        questionId: question.id,
        answer: userAnswer?.answer || '',
        isCorrect,
        points: isCorrect ? question.points : 0,
        correctAnswerId: correctOption?.id || null
      };
    });

    const percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
    const isPassed = percentage >= quiz.passingScore;

    const dbAnswers = attemptAnswers.map(({ correctAnswerId, ...rest }) => rest);

    // Wrap in transaction for Database Integrity
    const result = await prisma.$transaction(async (tx) => {
      const attempt = await tx.quizAttempt.create({
        data: {
          userId: req.user!.userId, 
          quizId, 
          score, 
          totalScore, 
          percentage,
          isPassed, 
          timeSpent, 
          completedAt: new Date(),
          answers: { create: dbAnswers as any },
        },
      });

      await tx.activityLog.create({
        data: {
          userId: req.user!.userId,
          action: 'COMPLETE_QUIZ',
          entityType: 'quiz',
          entityId: quizId,
          details: `Skor: ${score}/${totalScore}`,
          ipAddress: req.ip,
          userAgent: req.get('user-agent')
        }
      });

      // XP Rewards logic inside transaction
      let xpEarned = 0;
      if (isPassed) xpEarned += XP_REWARDS.QUIZ_PASS;
      if (percentage === 100) xpEarned += XP_REWARDS.QUIZ_PERFECT;

      if (xpEarned > 0) {
        const currentUser = await tx.user.findUnique({ where: { id: req.user!.userId } });
        if (currentUser) {
          const newXp = currentUser.xp + xpEarned;
          const newLevel = calculateLevel(newXp);
          await tx.user.update({
            where: { id: req.user!.userId },
            data: { xp: newXp, level: newLevel, points: { increment: xpEarned } }
          });
        }
      }

      return { attempt, xpEarned };
    });

    res.status(201).json({ 
      attemptId: result.attempt.id, 
      score, 
      totalScore, 
      percentage, 
      isPassed, 
      passingScore: quiz.passingScore, 
      answers: attemptAnswers, 
      xpEarned: result.xpEarned 
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new AppError(404, 'Kuis tidak ditemukan');
    }

    await prisma.quiz.delete({
      where: { id },
    });

    await logActivity(req.user!.userId, 'DELETE_QUIZ', 'quiz', id, `Menghapus kuis: ${quiz.title}`, req);
    res.status(204).send();
  }
}
