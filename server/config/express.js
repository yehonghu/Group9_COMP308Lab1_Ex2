// Express application configuration file
// Sets up middleware, CORS, cookie parsing, and route mounting

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import routes
import authRoutes from '../routes/auth.routes.js';
import gameRoutes from '../routes/game.routes.js';
import userRoutes from '../routes/user.routes.js';

const configureExpress = () => {
  const app = express();

  // --- Middleware ---

  // Parse incoming JSON requests
  app.use(express.json());

  // Parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Parse cookies
  app.use(cookieParser());

  // Enable CORS for the React frontend
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true, // Allow cookies to be sent
    })
  );

  // --- API Routes ---
  app.use('/api/auth', authRoutes);
  app.use('/api/games', gameRoutes);
  app.use('/api/users', userRoutes);

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Game Library API is running' });
  });

  return app;
};

export default configureExpress;
