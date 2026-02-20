// Game Controller
// Handles CRUD operations for game documents
// Follows MVC architecture pattern

import Game from '../models/game.model.js';

// @desc    Get all games
// @route   GET /api/games
// @access  Public
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    console.error('Get all games error:', error);
    res.status(500).json({ message: 'Server error fetching games' });
  }
};

// @desc    Get a single game by ID
// @route   GET /api/games/:id
// @access  Public
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Get game by ID error:', error);
    res.status(500).json({ message: 'Server error fetching game' });
  }
};

// @desc    Create a new game
// @route   POST /api/games
// @access  Private
export const createGame = async (req, res) => {
  try {
    const { title, genre, platform, releaseYear, developer, rating, description } = req.body;

    // Validate required fields
    if (!title || !genre || !platform || !releaseYear || !developer) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const game = new Game({
      title,
      genre,
      platform,
      releaseYear,
      developer,
      rating: rating || 0,
      description: description || '',
    });

    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ message: 'Server error creating game' });
  }
};

// @desc    Update a game
// @route   PUT /api/games/:id
// @access  Private
export const updateGame = async (req, res) => {
  try {
    const { title, genre, platform, releaseYear, developer, rating, description } = req.body;

    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update fields
    game.title = title ?? game.title;
    game.genre = genre ?? game.genre;
    game.platform = platform ?? game.platform;
    game.releaseYear = releaseYear ?? game.releaseYear;
    game.developer = developer ?? game.developer;
    game.rating = rating ?? game.rating;
    game.description = description ?? game.description;

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    console.error('Update game error:', error);
    res.status(500).json({ message: 'Server error updating game' });
  }
};

// @desc    Delete a game
// @route   DELETE /api/games/:id
// @access  Private
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Delete game error:', error);
    res.status(500).json({ message: 'Server error deleting game' });
  }
};

// @desc    Search games by title or genre
// @route   GET /api/games/search/:query
// @access  Public
export const searchGames = async (req, res) => {
  try {
    const { query } = req.params;
    const games = await Game.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
        { developer: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(games);
  } catch (error) {
    console.error('Search games error:', error);
    res.status(500).json({ message: 'Server error searching games' });
  }
};
