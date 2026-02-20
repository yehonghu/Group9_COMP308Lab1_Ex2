// User Model
// Defines the schema for user documents in MongoDB
// Includes password hashing and reference to Game model

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    // Reference to Game model - array of game ObjectIds
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Game',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password before storing
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
