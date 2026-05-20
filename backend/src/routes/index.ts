import { Router } from 'express';
import authRoutes from './auth.routes';
import materialRoutes from './material.routes';
import categoryRoutes from './category.routes';
import quizRoutes from './quiz.routes';
import adminRoutes from './admin.routes';
import portalRoutes from './portal.routes';
import discussionRoutes from './discussion.routes';
import miscRoutes from './misc.routes';
import achievementRoutes from './achievement.routes';

import { authenticate, optionalAuthenticate, maintenanceGuard } from '../middleware/auth.middleware';
import { ipBlacklistGuard } from '../middleware/security.middleware';

const router = Router();

// Global Security & Blacklist Check
router.use(ipBlacklistGuard);

// Populate session information (req.user) if valid Bearer token exists
router.use(optionalAuthenticate);

// Auth routes (allow login/register)
router.use('/auth', authRoutes);

// Protected routes with maintenance check
router.use('/materials', maintenanceGuard, materialRoutes);
router.use('/categories', maintenanceGuard, categoryRoutes);
router.use('/quizzes', maintenanceGuard, quizRoutes);
router.use('/admin', adminRoutes); // Admin routes handle their own auth/roles
router.use('/portal', portalRoutes);
router.use('/discussion', maintenanceGuard, discussionRoutes);
router.use('/achievements', maintenanceGuard, achievementRoutes);
router.use('/', maintenanceGuard, miscRoutes);

export default router;
