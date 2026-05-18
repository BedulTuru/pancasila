import { Router } from 'express';
import { DiscussionController } from '../controllers/discussion.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/comments', authenticate, DiscussionController.createComment);
router.post('/feedback', authenticate, DiscussionController.submitFeedback);
router.delete('/comments/:id', authenticate, requireRole('ADMIN', 'TUTOR'), DiscussionController.deleteComment);

export default router;
