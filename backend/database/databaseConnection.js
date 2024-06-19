const mongoose = require('mongoose');
const databaseConfig = require('../config/database');

const connectDB = async () => {
  try {
    await mongoose.connect(databaseConfig.mongoURI, databaseConfig.options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
