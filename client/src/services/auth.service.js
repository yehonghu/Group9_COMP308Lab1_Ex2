// Authentication Service
// Handles API calls for user registration, login, logout, and session check

import axios from 'axios';

const API_URL = '/api/auth';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Register a new user
export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  return response.data;
};

// Login user
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};
