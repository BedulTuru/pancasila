import { Router } from 'express';
import { MiscController } from '../controllers/misc.controller';
import { authenticate, requireRole, adminSecretCheck } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../middleware/error.middleware';

const router = Router();
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '../../uploads');

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = [
    'application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'
  ];
  if (allowedMimes.includes(file.mimetype)) cb(null, true);
  else cb(new AppError(400, 'Jenis file tidak valid'));
};

const upload = multer({ 
  storage, 
  fileFilter: fileFilter as any, 
  limits: { fileSize: 50 * 1024 * 1024 } 
});

router.get('/health', MiscController.healthCheck);
router.get('/announcements', MiscController.getAnnouncements);
router.post('/announcements', authenticate, requireRole('ADMIN'), adminSecretCheck, MiscController.createAnnouncement);

router.get('/files', authenticate, requireRole('ADMIN', 'TUTOR'), MiscController.getFiles);
router.get('/upload/signature', authenticate, requireRole('ADMIN', 'TUTOR'), MiscController.getUploadSignature as any);
router.post('/upload', authenticate, requireRole('ADMIN', 'TUTOR'), upload.single('file'), MiscController.handleUpload as any);

export default router;
