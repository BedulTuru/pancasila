import { Router } from 'express';
import { PortalController } from '../controllers/portal.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/config', PortalController.getConfig);
router.get('/public-stats', PortalController.getPublicStats);
router.get('/leaderboard', PortalController.getLeaderboard);
router.get('/progress', authenticate, PortalController.getProgress);
router.post('/progress/:materialId', authenticate, PortalController.updateProgress);
router.get('/search', PortalController.search);

export default router;
