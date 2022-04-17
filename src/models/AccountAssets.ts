import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(<string>process.env.MONGO_DB_URI)
  .then(():void => console.log('MongoDB connected'))
  .catch(():void => console.log('MongoDB failed to connect'));

const possessionSchema = new mongoose.Schema({
  mora: {
    type: Number,
    default: 0,
  },
  wishes: {
    amount: {
      type: Number,
      default: 2
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  main: {
    type: String,
    default: 'traveler-anemo',
  },
  characters_owned: [String]
});

export const Possession = mongoose.model('possession', possessionSchema);