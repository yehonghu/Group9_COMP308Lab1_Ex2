// Configuration file for the Game Library Management System
// Contains database URI, JWT secret, and server settings

import dotenv from 'dotenv';
dotenv.config();

const config = {
  // MongoDB connection URI
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/game-library',

  // JWT secret key for token signing
  jwtSecret: process.env.JWT_SECRET || 'comp308-group9-secret-key-2026',

  // JWT token expiration time
  jwtExpiration: '24h',

  // Server port
  port: process.env.PORT || 5000,

  // Cookie settings
  cookieMaxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

export default config;
