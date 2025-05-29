import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { registrationController, registrationValidation } from '../controllers/registration';
import { auth } from '../middleware/auth';

const router = Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.post(
  '/register',
  upload.single('paymentConfirmation'),
  registrationValidation,
  registrationController.register
);

// Protected routes (require admin authentication)
router.get('/registrations', auth, registrationController.getAllRegistrations);
router.get('/registrations/:userId', auth, registrationController.getRegistrationById);
router.patch('/registrations/:userId/status', auth, registrationController.updateStatus);

export default router;
