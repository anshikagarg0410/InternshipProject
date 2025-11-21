// File: backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Reads MONGO_URI from the .env file, or uses a local fallback URI
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mindfulSpace"; 
    
    // Connect to the database
    await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected successfully!`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;