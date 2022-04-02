const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(() => console.log('MongoDB failed to connect'));