// Game Model
// Defines the schema for game documents in MongoDB

import mongoose from 'mongoose';
const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Game title is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
    },
    developer: {
      type: String,
      required: [true, 'Developer is required'],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [10, 'Rating cannot exceed 10'],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
