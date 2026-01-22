import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Protected routes (authentication required)
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/change-password', protect, changePassword);

export default router;