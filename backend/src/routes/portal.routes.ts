import { Router } from 'express';
import { PortalController } from '../controllers/portal.controller';
import { authenticate, maintenanceGuard } from '../middleware/auth.middleware';

const router = Router();

// Publicly accessible even in maintenance mode so frontend can detect maintenance status
router.get('/config', PortalController.getConfig);
router.get('/public-stats', PortalController.getPublicStats);

// Guarded by maintenance check
router.get('/leaderboard', maintenanceGuard, PortalController.getLeaderboard);
router.get('/progress', authenticate, maintenanceGuard, PortalController.getProgress);
router.post('/progress/:materialId', authenticate, maintenanceGuard, PortalController.updateProgress);
router.get('/search', maintenanceGuard, PortalController.search);

export default router;
