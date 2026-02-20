// Authentication Routes
// Defines API endpoints for user registration, login, logout, and session check

import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/register - Register a new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// POST /api/auth/logout - Logout user
router.post('/logout', logout);

// GET /api/auth/me - Get current user (protected)
router.get('/me', authMiddleware, getMe);

export default router;
