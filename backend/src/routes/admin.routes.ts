import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticate, requireRole, adminSecretCheck } from '../middleware/auth.middleware';
import { validate, changePasswordSchema } from '../utils/schemas';

const router = Router();

// Middleware to ensure all routes here are ADMIN and have secret check
router.use(authenticate, requireRole('ADMIN'), adminSecretCheck);

router.get('/analytics', AdminController.getAnalytics);
router.get('/metrics', AdminController.getSystemMetrics);
router.get('/users', AdminController.getUsers);
router.get('/export/users', AdminController.exportUsers);
router.patch('/users/:id', AdminController.updateUser);
router.patch('/users/:id/reset-password', validate(changePasswordSchema), AdminController.resetPassword);
router.post('/users/:id/evict', AdminController.evictSession);
router.delete('/users/:id', AdminController.deleteUser);

// Security & Audit
router.get('/audit-logs', AdminController.getAuditLogs);

// Admin Endpoints
router.post('/impersonate/:userId', AdminController.impersonate);
router.get('/system-config', AdminController.getSystemConfig);
router.patch('/system-config', AdminController.updateSystemConfig);

router.get('/announcements', AdminController.getAnnouncements);
router.post('/announcements', AdminController.createAnnouncement);
router.delete('/announcements/:id', AdminController.deleteAnnouncement);

// Security - IP Blacklist
router.get('/blacklist', AdminController.getBlacklist);
router.post('/blacklist', AdminController.blacklistIp);
router.delete('/blacklist/:id', AdminController.removeBlacklistIp);

export default router;
