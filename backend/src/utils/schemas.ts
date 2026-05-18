import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(1, 'Password harus diisi'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[0-9]/, 'Password harus mengandung angka')
      .regex(/[^a-zA-Z0-9]/, 'Password harus mengandung karakter spesial'),
    name: z.string().min(2, 'Nama minimal 2 karakter'),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(8, 'Password minimal 8 karakter'),
  }),
});

export const categorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nama kategori harus diisi'),
    slug: z.string().min(1, 'Slug harus diisi'),
    icon: z.string().optional(),
    color: z.string().optional(),
    order: z.number().int().default(0),
  }),
});

export const materialSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Judul harus diisi'),
    content: z.string().min(1, 'Konten harus diisi'),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    videoUrl: z.string().optional(),
    driveUrl: z.string().optional(),
    fileUrl: z.string().optional(),
    categoryId: z.string().uuid('ID Kategori tidak valid'),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('EASY'),
    type: z.enum(['ARTICLE', 'VIDEO', 'BOOK']).default('ARTICLE'),
    isPublished: z.boolean().default(false),
  }),
});

export const quizSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Judul harus diisi'),
    description: z.string().optional(),
    categoryId: z.string().uuid('ID Kategori tidak valid'),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('EASY'),
    quizType: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE']).default('MULTIPLE_CHOICE'),
    timeLimit: z.number().int().optional(),
    shuffle: z.boolean().default(true),
    passingScore: z.number().int().min(0).max(100).default(70),
    isPublished: z.boolean().default(false),
    questions: z.array(z.any()).optional(),
  }),
});

export const validate = (schema: any) => async (req: any, res: any, next: any) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const details = error.issues.map((e: any) => ({
        field: e.path.length > 0 ? e.path[e.path.length - 1] : 'global',
        message: e.message,
      }));
      const firstMessage = details[0]?.message || 'Kesalahan validasi data';
      return res.status(400).json({ error: firstMessage, details });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan pada validasi data' });
  }
};
