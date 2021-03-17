require('dotenv').config();
const mongoose = require('mongoose');

console.log('database.js')
// CONNECT TO REMOTE MONGODB ATLAS
mongoose.connect('mongodb://127.0.0.1:27017/gigboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
