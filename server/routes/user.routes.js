// User Routes
// Defines API endpoints for user game collection management

import { Router } from 'express';
import {
  getUserCollection,
  addGameToCollection,
  removeGameFromCollection,
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// All user routes are protected (require authentication)

// GET /api/users/collection - Get user's game collection
router.get('/collection', authMiddleware, getUserCollection);

// POST /api/users/collection/:gameId - Add a game to collection
router.post('/collection/:gameId', authMiddleware, addGameToCollection);

// DELETE /api/users/collection/:gameId - Remove a game from collection
router.delete('/collection/:gameId', authMiddleware, removeGameFromCollection);

export default router;
