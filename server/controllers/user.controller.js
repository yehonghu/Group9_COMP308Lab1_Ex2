// User Controller
// Handles user game collection management (add/remove games, view collection)
// Follows MVC architecture pattern

import User from '../models/user.model.js';
import Game from '../models/game.model.js';

// @desc    Get user's game collection
// @route   GET /api/users/collection
// @access  Private
export const getUserCollection = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('games');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.games);
  } catch (error) {
    console.error('Get user collection error:', error);
    res.status(500).json({ message: 'Server error fetching collection' });
  }
};

// @desc    Add a game to user's collection
// @route   POST /api/users/collection/:gameId
// @access  Private
export const addGameToCollection = async (req, res) => {
  try {
    const { gameId } = req.params;

    // Verify the game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if game is already in collection
    if (user.games.includes(gameId)) {
      return res.status(400).json({ message: 'Game already in your collection' });
    }

    // Add game to user's collection
    user.games.push(gameId);
    await user.save();

    // Return updated collection with populated game data
    const updatedUser = await User.findById(req.userId).populate('games');
    res.json({
      message: 'Game added to collection',
      games: updatedUser.games,
    });
  } catch (error) {
    console.error('Add game to collection error:', error);
    res.status(500).json({ message: 'Server error adding game to collection' });
  }
};

// @desc    Remove a game from user's collection
// @route   DELETE /api/users/collection/:gameId
// @access  Private
export const removeGameFromCollection = async (req, res) => {
  try {
    const { gameId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if game is in collection
    if (!user.games.includes(gameId)) {
      return res.status(400).json({ message: 'Game not in your collection' });
    }

    // Remove game from collection
    user.games = user.games.filter((id) => id.toString() !== gameId);
    await user.save();

    // Return updated collection with populated game data
    const updatedUser = await User.findById(req.userId).populate('games');
    res.json({
      message: 'Game removed from collection',
      games: updatedUser.games,
    });
  } catch (error) {
    console.error('Remove game from collection error:', error);
    res.status(500).json({ message: 'Server error removing game from collection' });
  }
};
