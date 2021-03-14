require('dotenv').config();
const mongoose = require('mongoose');

// CONNECT TO REMOTE MONGODB ATLAS
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
