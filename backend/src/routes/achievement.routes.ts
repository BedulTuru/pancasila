import { Router } from 'express';
import { AchievementController } from '../controllers/achievement.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/mine', authenticate, AchievementController.getMine);
router.get('/', AchievementController.getAll);

export default router;
