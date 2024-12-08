const mongoose = require('mongoose');

const connectDB = async () => {
  MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/FitTrack'
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
