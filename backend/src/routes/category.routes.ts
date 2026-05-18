import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { validate, categorySchema } from '../utils/schemas';

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', authenticate, requireRole('ADMIN', 'TUTOR'), validate(categorySchema), CategoryController.create);
router.put('/:id', authenticate, requireRole('ADMIN', 'TUTOR'), validate(categorySchema), CategoryController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), CategoryController.delete);

export default router;
