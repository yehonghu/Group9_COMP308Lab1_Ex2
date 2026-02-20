// Mongoose configuration file
// Establishes connection to MongoDB database

import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
