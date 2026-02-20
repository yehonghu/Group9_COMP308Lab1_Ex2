// Authentication Middleware
// Verifies JWT token from HTTPOnly cookies
// Protects private routes by ensuring user is authenticated

import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authMiddleware = (req, res, next) => {
  try {
    // Get token from HTTPOnly cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
