import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth.middleware';
import { validate, quizSchema } from '../utils/schemas';

const router = Router();

router.get('/', optionalAuthenticate, QuizController.getAll);
router.get('/:slug', optionalAuthenticate, QuizController.getBySlug);
router.post('/', authenticate, requireRole('ADMIN', 'TUTOR'), validate(quizSchema), QuizController.create);
router.post('/:id/attempt', authenticate, QuizController.attempt);
router.delete('/:id', authenticate, requireRole('ADMIN', 'TUTOR'), QuizController.delete);

export default router;
