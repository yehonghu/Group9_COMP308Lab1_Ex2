// Game Routes
// Defines API endpoints for game CRUD operations

import { Router } from 'express';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  searchGames,
} from '../controllers/game.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/games - Get all games (public)
router.get('/', getAllGames);

// GET /api/games/search/:query - Search games (public)
router.get('/search/:query', searchGames);

// GET /api/games/:id - Get a single game by ID (public)
router.get('/:id', getGameById);

// POST /api/games - Create a new game (protected)
router.post('/', authMiddleware, createGame);

// PUT /api/games/:id - Update a game (protected)
router.put('/:id', authMiddleware, updateGame);

// DELETE /api/games/:id - Delete a game (protected)
router.delete('/:id', authMiddleware, deleteGame);

export default router;
