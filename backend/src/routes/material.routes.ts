import { Router } from 'express';
import { MaterialController } from '../controllers/material.controller';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth.middleware';
import { validate, materialSchema } from '../utils/schemas';

const router = Router();

router.get('/', optionalAuthenticate, MaterialController.getAll);
router.get('/:slug', optionalAuthenticate, MaterialController.getBySlug);
router.post('/', authenticate, requireRole('ADMIN', 'TUTOR'), validate(materialSchema), MaterialController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'TUTOR'), validate(materialSchema), MaterialController.update);
router.delete('/:id', authenticate, requireRole('ADMIN', 'TUTOR'), MaterialController.delete);

export default router;
