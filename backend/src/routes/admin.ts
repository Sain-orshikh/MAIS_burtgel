import { Router } from 'express';
import { adminController, adminValidation } from '../controllers/admin';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', adminValidation.login, adminController.login);

// Protected routes
router.post('/register', auth, adminValidation.register, adminController.register);
router.get('/profile', auth, adminController.getProfile);

export default router;
