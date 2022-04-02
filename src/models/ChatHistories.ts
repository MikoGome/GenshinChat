import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(<string>process.env.MONGO_DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(() => console.log('MongoDB failed to connect'));