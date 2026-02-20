// Main server entry point
// Initializes the database connection and starts the Express server

import config from './config/config.js';
import connectDB from './config/mongoose.js';
import configureExpress from './config/express.js';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Configure Express application
    const app = configureExpress();

    // Start listening on the configured port
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`API available at http://localhost:${config.port}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
