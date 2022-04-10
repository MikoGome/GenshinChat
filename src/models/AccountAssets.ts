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
      default: 0
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
  characters_owned: [{
    name: {
      type: String,
      required: true,
      _id: false
    }
  }]
});

export const Possession = mongoose.model('possession', possessionSchema);

const chatSchema = new mongoose.Schema({
  chats: {
    room: {
      participants: [{
        user_id: {
          type: Number,
          required: true
        },
        user_name: {
          type:String,
          required: true
        },
        main: String
      }],
    },
    chat: [{
      user_name: String,
      main: String,
      message: String
    }]
  }
});

export const Chat = mongoose.model('chat', chatSchema);