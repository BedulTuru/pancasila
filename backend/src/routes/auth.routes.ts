import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate, loginSchema, registerSchema } from '../utils/schemas';
import rateLimit from 'express-rate-limit';
import { IS_PROD } from '../config';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: IS_PROD ? 10 : 100,
  message: { error: 'Terdeteksi aktivitas mencurigakan. Silakan coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, validate(registerSchema), AuthController.register);
router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.get('/me', authenticate, AuthController.me);

export default router;
