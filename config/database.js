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

/* FROM MONGODB ATLAS SETUP INSTRUCTIONS

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gigboard-admin:taco@gigboard-db.gqkwa.mongodb.net/gigboard-data?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
