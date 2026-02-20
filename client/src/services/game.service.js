// Game Service
// Handles API calls for game CRUD operations and user collection management

import axios from 'axios';

const GAME_API = '/api/games';
const USER_API = '/api/users';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// ---- Game CRUD Operations ----

// Get all games
export const getAllGames = async () => {
  const response = await axios.get(GAME_API);
  return response.data;
};

// Get a single game by ID
export const getGameById = async (id) => {
  const response = await axios.get(`${GAME_API}/${id}`);
  return response.data;
};

// Create a new game
export const createGame = async (gameData) => {
  const response = await axios.post(GAME_API, gameData);
  return response.data;
};

// Update a game
export const updateGame = async (id, gameData) => {
  const response = await axios.put(`${GAME_API}/${id}`, gameData);
  return response.data;
};

// Delete a game
export const deleteGame = async (id) => {
  const response = await axios.delete(`${GAME_API}/${id}`);
  return response.data;
};

// Search games
export const searchGames = async (query) => {
  const response = await axios.get(`${GAME_API}/search/${query}`);
  return response.data;
};

// ---- User Collection Operations ----

// Get user's game collection
export const getUserCollection = async () => {
  const response = await axios.get(`${USER_API}/collection`);
  return response.data;
};

// Add a game to user's collection
export const addToCollection = async (gameId) => {
  const response = await axios.post(`${USER_API}/collection/${gameId}`);
  return response.data;
};

// Remove a game from user's collection
export const removeFromCollection = async (gameId) => {
  const response = await axios.delete(`${USER_API}/collection/${gameId}`);
  return response.data;
};
