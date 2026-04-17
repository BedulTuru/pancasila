import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { body, param, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { calculateLevel, XP_REWARDS } from './utils/levelSystem';
import { filterProfanity } from './utils/profanityFilter';

export const prisma = new PrismaClient();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'pancasila-edu-secret-key-2024-minimum-32-chars';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'god-tier-pancasila-secret-2024-xyz';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://drive.google.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

const IS_PROD = process.env.NODE_ENV === 'production';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: IS_PROD ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100') : 5000,
  message: { error: 'Terlalu banyak permintaan, coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter as any);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: IS_PROD ? 10 : 100,
  message: { error: 'Terdeteksi aktivitas mencurigakan. Silakan coba lagi setelah 15 menit.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Pengguna tidak ditemukan atau nonaktif' });
    }
    req.user = { userId: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
};

const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Izin tidak cukup' });
    }
    next();
  };
};

const adminSecretCheck = (req: Request, res: Response, next: NextFunction) => {
  const secret = req.headers['x-admin-secret-key'];
  if (req.user?.role === 'ADMIN' && secret !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Akses ditolak: Kunci rahasia admin tidak valid.' });
  }
  next();
};

// ADMIN EXPORT UTILS
const convertToCSV = (objArray: any[]) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  const header = Object.keys(array[0]).join(',') + '\r\n';
  str += header;
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ',';
      line += `"${array[i][index]}"`;
    }
    str += line + '\r\n';
  }
  return str;
};

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const logActivity = async (userId: string, action: string, entityType?: string, entityId?: string, details?: string, req?: Request) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        details,
        ipAddress: req?.ip,
        userAgent: req?.headers['user-agent'],
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// AUTH
app.post('/api/auth/register', authLimiter as any,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
  body('name').trim().isLength({ min: 2 }),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ error: 'Email sudah terdaftar' });
      const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: 'STUDENT' },
        select: { id: true, email: true, name: true, role: true, createdAt: true, xp: true, level: true, points: true },
      });
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
      await logActivity(user.id, 'REGISTER', 'user', user.id, 'Pengguna mendaftar', req);
      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Registrasi gagal' });
    }
  }
);

app.post('/api/auth/login', authLimiter as any,
  body('email').isEmail(),
  body('password').notEmpty(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Kredensial tidak valid' });
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: 'Kredensial tidak valid' });
      if (!user.isActive) return res.status(403).json({ error: 'Akun dinonaktifkan' });

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
          points: { increment: xpEarned }
        },
      });

      if (xpEarned > 0) {
        await logActivity(user.id, 'XP_REWARD', 'user', user.id, `Hadiah login harian: +${xpEarned} XP`, req);
      }

      await logActivity(user.id, 'LOGIN', 'user', user.id, 'Pengguna login', req);
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
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
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login gagal' });
    }
  }
);

app.get('/api/auth/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, name: true, role: true, avatar: true, loginStreak: true, createdAt: true, xp: true, level: true, points: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengguna' });
  }
});

// PUBLIC STATS (No auth required)
app.get('/api/public/stats', async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalMaterials, totalQuizzes, totalAttempts] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.material.count({ where: { isPublished: true } }),
      prisma.quiz.count({ where: { isPublished: true } }),
      prisma.quizAttempt.count(),
    ]);
    res.json({ totalUsers, totalMaterials, totalQuizzes, totalAttempts });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil statistik' });
  }
});

// CATEGORIES
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { materials: true, quizzes: true } } },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kategori' });
  }
});

app.post('/api/categories', authenticate, requireRole('ADMIN', 'TUTOR'),
  body('name').trim().notEmpty(), body('slug').trim().notEmpty(), validate,
  async (req: Request, res: Response) => {
    try {
      const { name, slug, icon, color, order } = req.body;
      const category = await prisma.category.create({ data: { name, slug, icon, color, order: order || 0 } });
      await logActivity(req.user!.userId, 'CREATE_CATEGORY', 'category', category.id, `Membuat kategori: ${name}`, req);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Gagal membuat kategori' });
    }
  }
);

// MATERIALS
app.get('/api/materials', async (req: Request, res: Response) => {
  try {
    const { categoryId, difficulty, type, search, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);
    const where: any = { isPublished: true };
    if (categoryId) where.categoryId = categoryId;
    if (difficulty) where.difficulty = difficulty;
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
    // NOTE: viewCount is incremented in GET /materials/:slug (detail view), NOT here.
    // Incrementing here would inflate counts every time the portal list loads.
    res.json({ data: materials, pagination: { page: parseInt(page as string), limit: parseInt(limit as string), total, totalPages: Math.ceil(total / take) } });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil materi' });
  }
});

app.get('/api/materials/:slug', async (req: Request, res: Response) => {
  try {
    // Check if user is logged in to fetch their specific progress
    const authHeader = req.headers.authorization;
    let userId: string | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        userId = decoded.userId;
      } catch (e) {
        // Continue as guest if token is invalid
      }
    }

    const material = await prisma.material.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: {
          include: {
            quizzes: {
              where: { isPublished: true },
              take: 1
            }
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
        // Include progress only for the current user
        progress: userId ? { where: { userId } } : false,
      },
    });

    if (!material) return res.status(404).json({ error: 'Materi tidak ditemukan' });

    // Increment viewCount here instead of in the list call
    await prisma.material.update({
      where: { id: material.id },
      data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment viewCount:', err));

    res.json(material);
  } catch (error) {
    console.error('Fetch material detail error:', error);
    res.status(500).json({ error: 'Gagal mengambil materi' });
  }
});

app.post('/api/materials', authenticate, requireRole('ADMIN', 'TUTOR'),
  body('title').trim().notEmpty(), body('content').notEmpty(), body('categoryId').isUUID(), validate,
  async (req: Request, res: Response) => {
    try {
      const { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, isPublished } = req.body;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + uuidv4().slice(0, 8);
      const material = await prisma.material.create({
        data: { title, slug, content, description, coverImage, videoUrl, driveUrl, fileUrl, type: req.body.type || 'ARTICLE', categoryId, authorId: req.user!.userId, difficulty: difficulty || 'EASY', isPublished: isPublished || false },
        include: { category: true, author: { select: { id: true, name: true } } },
      });
      await logActivity(req.user!.userId, 'CREATE_MATERIAL', 'material', material.id, `Membuat materi: ${title}`, req);
      res.status(201).json(material);
    } catch (error) {
      console.error('Create material error:', error);
      res.status(500).json({ error: 'Gagal membuat materi' });
    }
  }
);

app.put('/api/materials/:id', authenticate, requireRole('ADMIN', 'TUTOR'),
  param('id').isUUID(), validate,
  async (req: Request, res: Response) => {
    try {
      const existing = await prisma.material.findUnique({ where: { id: req.params.id } });
      if (!existing) return res.status(404).json({ error: 'Materi tidak ditemukan' });
      if (existing.authorId !== req.user!.userId && req.user!.role !== 'ADMIN') return res.status(403).json({ error: 'Tidak diizinkan' });
      // Allowlist fields to prevent mass-assignment / field injection
      const { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, isPublished, type } = req.body;
      const material = await prisma.material.update({
        where: { id: req.params.id },
        data: { title, content, description, coverImage, videoUrl, driveUrl, fileUrl, categoryId, difficulty, isPublished, type },
        include: { category: true },
      });
      await logActivity(req.user!.userId, 'UPDATE_MATERIAL', 'material', material.id, `Memperbarui materi`, req);
      res.json(material);
    } catch (error) {
      res.status(500).json({ error: 'Gagal memperbarui materi' });
    }
  }
);

app.delete('/api/materials/:id', authenticate, requireRole('ADMIN', 'TUTOR'),
  async (req: Request, res: Response) => {
    try {
      const existing = await prisma.material.findUnique({ where: { id: req.params.id } });
      if (!existing) return res.status(404).json({ error: 'Materi tidak ditemukan' });
      if (existing.authorId !== req.user!.userId && req.user!.role !== 'ADMIN') return res.status(403).json({ error: 'Tidak diizinkan' });
      await prisma.material.delete({ where: { id: req.params.id } });
      await logActivity(req.user!.userId, 'DELETE_MATERIAL', 'material', req.params.id, `Menghapus materi`, req);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Gagal menghapus materi' });
    }
  }
);

// QUIZZES
app.get('/api/quizzes', async (req: Request, res: Response) => {
  try {
    const { categoryId, difficulty, search, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);
    const where: any = { isPublished: true };
    if (categoryId) where.categoryId = categoryId;
    if (difficulty) where.difficulty = difficulty;
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
    res.json({ data: quizzes, pagination: { page: parseInt(page as string), limit: parseInt(limit as string), total, totalPages: Math.ceil(total / take) } });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kuis' });
  }
});

app.get('/api/quizzes/:slug', async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { slug: req.params.slug },
      include: { category: true, author: { select: { id: true, name: true, avatar: true } }, questions: { orderBy: { order: 'asc' }, include: { options: { orderBy: { order: 'asc' } } } } },
    });
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });
    const sanitizedQuestions = quiz.questions.map(q => ({
      id: q.id, content: q.content, hint: q.hint, imageUrl: q.imageUrl, driveUrl: q.driveUrl, order: q.order, points: q.points,
      options: quiz.shuffle ? q.options.sort(() => Math.random() - 0.5).map(o => ({ id: o.id, content: o.content })) : q.options.map(o => ({ id: o.id, content: o.content })),
    }));
    res.json({ ...quiz, questions: sanitizedQuestions });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil kuis' });
  }
});

app.post('/api/quizzes', authenticate, requireRole('ADMIN', 'TUTOR'),
  body('title').trim().notEmpty(), body('categoryId').isUUID(), validate,
  async (req: Request, res: Response) => {
    try {
      const { title, description, categoryId, difficulty, quizType, timeLimit, shuffle, passingScore, isPublished, questions } = req.body;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + uuidv4().slice(0, 8);
      const quiz = await prisma.quiz.create({
        data: {
          title, slug, description, categoryId, authorId: req.user!.userId,
          difficulty: difficulty || 'EASY', quizType: quizType || 'MULTIPLE_CHOICE',
          timeLimit: timeLimit || 3600, shuffle: shuffle !== false, passingScore: passingScore || 70, isPublished: isPublished || false,
          questions: questions ? {
            create: questions.map((q: any, idx: number) => ({
              content: q.content, hint: q.hint, explanation: q.explanation, imageUrl: q.imageUrl, driveUrl: q.driveUrl, order: idx, points: q.points || 1,
              options: q.options ? { create: q.options.map((o: any, oIdx: number) => ({ content: o.content, isCorrect: o.isCorrect || false, order: oIdx })) } : [],
            })),
          } : undefined,
        },
        include: { category: true, questions: { include: { options: true } } },
      });
      await logActivity(req.user!.userId, 'CREATE_QUIZ', 'quiz', quiz.id, `Membuat kuis: ${title}`, req);
      res.status(201).json(quiz);
    } catch (error) {
      console.error('Create quiz error:', error);
      res.status(500).json({ error: 'Gagal membuat kuis' });
    }
  }
);

// QUIZ ATTEMPT
app.post('/api/quizzes/:id/attempt', authenticate, body('answers').isArray(), validate,
  async (req: Request, res: Response) => {
    try {
      const { answers, timeSpent } = req.body;
      const quizId = req.params.id;
      const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: { include: { options: true } } } });
      if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan' });

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

      // Separate backend-only data from database-compatible data
      const dbAnswers = attemptAnswers.map(({ correctAnswerId, ...rest }) => rest);

      const attempt = await prisma.quizAttempt.create({
        data: {
          userId: req.user!.userId, quizId, score, totalScore, percentage,
          isPassed: percentage >= quiz.passingScore, timeSpent, completedAt: new Date(),
          answers: { create: dbAnswers },
        },
      });
      await logActivity(req.user!.userId, 'COMPLETE_QUIZ', 'quiz', quizId, `Skor: ${score}/${totalScore}`, req);

      // XP Rewards logic
      let xpEarned = 0;
      if (percentage >= quiz.passingScore) xpEarned += XP_REWARDS.QUIZ_PASS;
      if (percentage === 100) xpEarned += XP_REWARDS.QUIZ_PERFECT;

      if (xpEarned > 0) {
        const currentUser = await prisma.user.findUnique({ where: { id: req.user!.userId } });
        if (currentUser) {
          const newXp = currentUser.xp + xpEarned;
          const newLevel = calculateLevel(newXp);
          await prisma.user.update({
            where: { id: req.user!.userId },
            data: { xp: newXp, level: newLevel, points: { increment: xpEarned } }
          });
        }
      }

      await checkAchievements(req.user!.userId);
      res.status(201).json({ attemptId: attempt.id, score, totalScore, percentage, isPassed: percentage >= quiz.passingScore, passingScore: quiz.passingScore, answers: attemptAnswers, xpEarned });
    } catch (error) {
      console.error('Quiz attempt error:', error);
      res.status(500).json({ error: 'Gagal mengumpulkan kuis' });
    }
  }
);

app.get('/api/quizzes/:id/attempts', authenticate, async (req: Request, res: Response) => {
  try {
    const attempts = await prisma.quizAttempt.findMany({
      where: { userId: req.user!.userId, quizId: req.params.id },
      orderBy: { completedAt: 'desc' },
      include: { answers: { include: { question: { select: { id: true, content: true, explanation: true } } } } },
    });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil percobaan kuis' });
  }
});

// PROGRESS
app.get('/api/progress', authenticate, async (req: Request, res: Response) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.user!.userId },
      include: { material: { select: { id: true, title: true, slug: true, difficulty: true, category: true } } },
    });
    const materialsCompleted = progress.filter(p => p.isCompleted).length;
    const quizzesAttempted = await prisma.quizAttempt.count({ where: { userId: req.user!.userId } });
    const totalScore = await prisma.quizAttempt.aggregate({ where: { userId: req.user!.userId }, _sum: { score: true, totalScore: true } });
    res.json({ materialsCompleted, materialsInProgress: progress.length - materialsCompleted, quizzesAttempted, totalScore: totalScore._sum.score || 0, totalPossibleScore: totalScore._sum.totalScore || 0, progress });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil progres' });
  }
});

app.post('/api/progress/:materialId', authenticate,
  body('progress').isInt({ min: 0, max: 100 }), validate,
  async (req: Request, res: Response) => {
    try {
      const { progress, isCompleted } = req.body;
      const userProgress = await prisma.userProgress.upsert({
        where: { userId_materialId: { userId: req.user!.userId, materialId: req.params.materialId } },
        update: { progress, isCompleted: isCompleted || progress >= 100, lastReadAt: new Date(), completedAt: isCompleted || progress >= 100 ? new Date() : null },
        create: { userId: req.user!.userId, materialId: req.params.materialId, progress, isCompleted: isCompleted || progress >= 100, completedAt: isCompleted || progress >= 100 ? new Date() : null },
      });
      // XP Rewards for material completion
      if ((isCompleted || progress >= 100) && (!userProgress.completedAt)) {
        const currentUser = await prisma.user.findUnique({ where: { id: req.user!.userId } });
        if (currentUser) {
          const newXp = currentUser.xp + XP_REWARDS.MATERIAL_READ;
          const newLevel = calculateLevel(newXp);
          await prisma.user.update({
            where: { id: req.user!.userId },
            data: { xp: newXp, level: newLevel, points: { increment: XP_REWARDS.MATERIAL_READ } }
          });
        }
      }

      await checkAchievements(req.user!.userId);
      res.json(userProgress);
    } catch (error) {
      res.status(500).json({ error: 'Gagal memperbarui progres' });
    }
  }
);

// LEADERBOARD
app.get('/api/leaderboard', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await prisma.user.findMany({
      where: { role: 'STUDENT', isActive: true },
      select: {
        id: true, name: true, avatar: true, loginStreak: true, xp: true, level: true, points: true,
        _count: { select: { quizAttempts: true, achievements: true } },
        quizAttempts: { where: { isPassed: true }, select: { percentage: true }, orderBy: { percentage: 'desc' }, take: 1 },
        progress: { where: { isCompleted: true }, select: { id: true } },
      },
      orderBy: { xp: 'desc' }, take: limit,
    });
    const leaderboard = users.map((user, index) => ({
      rank: index + 1, userId: user.id, name: user.name, avatar: user.avatar,
      xp: user.xp, level: user.level,
      streak: user.loginStreak, bestScore: user.quizAttempts[0]?.percentage || 0,
      quizzesCompleted: user._count.quizAttempts, achievements: user._count.achievements,
      materialsCompleted: user.progress.length,
    }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil leaderboard' });
  }
});

// ACHIEVEMENTS
app.get('/api/achievements', async (req: Request, res: Response) => {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: { points: 'desc' } });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil pencapaian' });
  }
});

app.get('/api/achievements/mine', authenticate, async (req: Request, res: Response) => {
  try {
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.user!.userId },
      include: { achievement: true },
    });
    res.json(userAchievements);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil pencapaian' });
  }
});

// ANALYTICS (ADMIN)
app.get('/api/admin/export/users', authenticate, requireRole('ADMIN'), adminSecretCheck, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, xp: true, level: true, points: true, loginStreak: true, createdAt: true, isActive: true },
    });
    const csv = convertToCSV(users);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users_export.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengekspor data' });
  }
});

app.get('/api/analytics', authenticate, requireRole('ADMIN'), adminSecretCheck, async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalMaterials, totalQuizzes, totalAttempts, recentActivity, popularMaterials, categoryStats] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.material.count(),
      prisma.quiz.count(),
      prisma.quizAttempt.count(),
      prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { user: { select: { name: true } } } }),
      prisma.material.findMany({ where: { isPublished: true }, orderBy: { viewCount: 'desc' }, take: 10, select: { id: true, title: true, viewCount: true, slug: true } }),
      prisma.category.findMany({ include: { _count: { select: { materials: true, quizzes: true } } } }),
    ]);
    const avgPassRate = await prisma.quizAttempt.aggregate({ _avg: { percentage: true } });
    res.json({
      totals: { users: totalUsers, materials: totalMaterials, quizzes: totalQuizzes, attempts: totalAttempts },
      avgPassRate: Math.round(avgPassRate._avg.percentage || 0),
      popularMaterials, categoryStats, recentActivity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil analytics' });
  }
});

// ADMIN USERS
app.get('/api/admin/users', authenticate, requireRole('ADMIN'), adminSecretCheck, async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20', role, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const where: any = {};
    if (role) where.role = role;
    if (search) { where.OR = [{ name: { contains: search as string } }, { email: { contains: search as string } }]; }
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where, skip, take: parseInt(limit as string), orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, name: true, role: true, avatar: true, isActive: true, loginStreak: true, lastLoginAt: true, createdAt: true, _count: { select: { quizAttempts: true, achievements: true } } },
      }),
      prisma.user.count({ where }),
    ]);
    res.json({ data: users, pagination: { page: parseInt(page as string), limit: parseInt(limit as string), total, totalPages: Math.ceil(total / parseInt(limit as string)) } });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil pengguna' });
  }
});

app.patch('/api/admin/users/:id', authenticate, requireRole('ADMIN'), adminSecretCheck, async (req: Request, res: Response) => {
  try {
    const { role, isActive } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role, isActive },
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });
    await logActivity(req.user!.userId, 'UPDATE_USER', 'user', user.id, `Memperbarui role/status pengguna`, req);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui pengguna' });
  }
});

app.delete('/api/admin/users/:id', authenticate, requireRole('ADMIN'), adminSecretCheck, async (req: Request, res: Response) => {
  try {
    if (req.params.id === req.user!.userId) return res.status(400).json({ error: 'Tidak dapat menghapus akun sendiri' });
    await prisma.user.delete({ where: { id: req.params.id } });
    await logActivity(req.user!.userId, 'DELETE_USER', 'user', req.params.id, `Menghapus pengguna`, req);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus pengguna' });
  }
});

// COMMENTS
app.post('/api/comments', authenticate,
  body('content').trim().notEmpty(), validate,
  async (req: Request, res: Response) => {
    try {
      const { content, materialId, quizId, parentId } = req.body;

      // Terapkan Penyaring Konten
      const filteredContent = filterProfanity(content);

      const comment = await prisma.comment.create({
        data: { content: filteredContent, userId: req.user!.userId, materialId, quizId, parentId },
        include: { user: { select: { id: true, name: true, avatar: true } } },
      });
      await logActivity(req.user!.userId, 'CREATE_COMMENT', 'comment', comment.id, `Komentar pada ${materialId ? 'materi' : 'kuis'}`, req);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Comment error:', error);
      res.status(500).json({ error: 'Gagal membuat komentar' });
    }
  }
);

// QUESTION BANK
app.get('/api/question-bank', authenticate, requireRole('ADMIN', 'TUTOR'), async (req: Request, res: Response) => {
  try {
    const where: any = {};
    if (req.query.categoryId) where.categoryId = req.query.categoryId;
    if (req.query.difficulty) where.difficulty = req.query.difficulty;
    const questions = await prisma.questionBank.findMany({ where, include: { options: { orderBy: { order: 'asc' } } } });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil bank soal' });
  }
});

app.post('/api/question-bank/import', authenticate, requireRole('ADMIN', 'TUTOR'),
  body('questions').isArray(), validate,
  async (req: Request, res: Response) => {
    try {
      const { questions } = req.body;
      const imported = await prisma.$transaction(
        questions.map((q: any) =>
          prisma.questionBank.create({
            data: {
              question: q.question, hint: q.hint, explanation: q.explanation,
              categoryId: q.categoryId, difficulty: q.difficulty || 'EASY',
              quizType: q.quizType || 'MULTIPLE_CHOICE', points: q.points || 1,
              options: { create: q.options.map((o: any, idx: number) => ({ content: o.content, isCorrect: o.isCorrect || false, order: idx })) },
            },
          })
        )
      );
      await logActivity(req.user!.userId, 'IMPORT_QUESTIONS', 'question_bank', undefined, `Mengimpor ${imported.length} soal`, req);
      res.status(201).json({ count: imported.length });
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengimpor soal' });
    }
  }
);

// ANNOUNCEMENTS
app.get('/api/announcements', async (req: Request, res: Response) => {
  try {
    const announcements = await prisma.announcement.findMany({ where: { isActive: true }, orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }] });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil pengumuman' });
  }
});

app.post('/api/announcements', authenticate, requireRole('ADMIN'), adminSecretCheck,
  body('title').trim().notEmpty(), body('content').trim().notEmpty(), validate,
  async (req: Request, res: Response) => {
    try {
      const { title, content, priority } = req.body;
      const announcement = await prisma.announcement.create({ data: { title, content, priority: priority || 0 } });
      await logActivity(req.user!.userId, 'CREATE_ANNOUNCEMENT', 'announcement', announcement.id, `Membuat pengumuman: ${title}`, req);
      res.status(201).json(announcement);
    } catch (error) {
      res.status(500).json({ error: 'Gagal membuat pengumuman' });
    }
  }
);

// GOOGLE DRIVE
app.post('/api/drive/upload-url', authenticate, requireRole('ADMIN', 'TUTOR'), async (req: Request, res: Response) => {
  try {
    const { fileName } = req.body;
    if (process.env.GOOGLE_DRIVE_FOLDER_ID && process.env.GOOGLE_DRIVE_CLIENT_ID) {
      res.json({ uploadUrl: `https://drive.google.com/uc?id=${fileName}`, message: 'Google Drive integration configured' });
    } else {
      res.json({ uploadUrl: `/uploads/${uuidv4()}-${fileName}`, message: 'Using local storage' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghasilkan URL upload' });
  }
});

app.get('/api/drive/files', authenticate, requireRole('ADMIN', 'TUTOR'), async (req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(uploadsDir).map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return { name: file, size: stats.size, url: `/uploads/${file}`, createdAt: stats.birthtime };
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendaftar file' });
  }
});

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
  if (allowedMimes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Jenis file tidak valid'));
};

const upload = multer({ storage, fileFilter: fileFilter as any, limits: { fileSize: 50 * 1024 * 1024 } });

app.post('/api/upload', authenticate, requireRole('ADMIN', 'TUTOR'), upload.single('file') as any, async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file diupload' });
    const fileUrl = `/uploads/${req.file.filename}`;
    await logActivity(req.user!.userId, 'UPLOAD_FILE', 'file', undefined, `Mengupload: ${req.file.originalname}`, req);
    res.json({ url: fileUrl, name: req.file.originalname, size: req.file.size, mimetype: req.file.mimetype });
  } catch (error) {
    res.status(500).json({ error: 'Upload gagal' });
  }
});

// FILE SERVE FOR GOOGLE DRIVE LINKS
app.get('/api/drive/proxy', authenticate, async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== 'string') return res.status(400).json({ error: 'URL diperlukan' });
    // Proxy Google Drive URLs to avoid CORS issues
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
      res.json({ proxiedUrl: url, message: 'URL dapat diakses langsung' });
    } else {
      res.status(400).json({ error: 'Hanya Google Drive yang didukung' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Proxy gagal' });
  }
});

// ACHIEVEMENT CHECKER
async function checkAchievements(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: { select: { quizAttempts: true, achievements: true } },
        progress: { where: { isCompleted: true } }
      },
    }) as any;
    if (!user) return;
    const achievements = await prisma.achievement.findMany();
    const userAchievementIds = await prisma.userAchievement.findMany({ where: { userId }, select: { achievementId: true } });
    const earnedIds = new Set(userAchievementIds.map(a => a.achievementId));
    for (const achievement of achievements) {
      if (earnedIds.has(achievement.id)) continue;
      let earned = false;
      const criteria = JSON.parse(achievement.criteria);
      switch (criteria.type) {
        case 'QUIZZES_COMPLETED': earned = user._count.quizAttempts >= criteria.count; break;
        case 'MATERIALS_COMPLETED': earned = user.progress.length >= criteria.count; break;
        case 'STREAK_DAYS': earned = user.loginStreak >= criteria.count; break;
        case 'ROLE': earned = user.role === criteria.role; break;
      }
      if (earned) await prisma.userAchievement.create({ data: { userId, achievementId: achievement.id } });
    }
  } catch (error) {
    console.error('Achievement check error:', error);
  }
}

// FEEDBACK
app.post('/api/feedback', authenticate,
  body('content').trim().notEmpty(), validate,
  async (req: Request, res: Response) => {
    try {
      const { content, category } = req.body;
      const filteredContent = filterProfanity(content);
      const feedback = await prisma.feedback.create({
        data: { content: filteredContent, category: category || 'GENERAL', userId: req.user!.userId },
      });
      await logActivity(req.user!.userId, 'SUBMIT_FEEDBACK', 'feedback', feedback.id, `Kategori: ${category}`, req);
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengirim feedback' });
    }
  }
);

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// ERROR HANDLING
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File terlalu besar. Maksimal 50MB.' });
    return res.status(400).json({ error: err.message });
  }
  if (err.message === 'Not allowed by CORS') return res.status(403).json({ error: 'CORS tidak diizinkan' });
  res.status(err.status || 500).json({ error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message });
});

// START
app.listen(PORT, () => {
  console.log(`\n🎓 Pancasila Edu Portal - Backend API\nServer: http://localhost:${PORT}\nEnvironment: ${process.env.NODE_ENV || 'development'}\nDatabase: SQLite\n`);
});

export default app;
