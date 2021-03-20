const dotenv = require('dotenv');
dotenv.config();

/* External Modules */
const express = require('express');
const cors = require('cors');

/* Internal Modules */
const { user } = require('./Controllers');
require('./config/database');
const routes = require('./routes');

/* Port */
const PORT = process.env.PORT || 5000;

/* App */
const app = express();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REMOVED WHITELIST - ALLOW ALL FOR NOW
app.use(cors());

/* Routes */
app.get('/', (req, res) => {
  res.send('Gigboard Backend API');
});

/* 
// ROUTES
app.use('/', routes.index); // contains OAUTH routes
app.use('/users', routes.users); // ALL USER ROUTES
app.use('/places', routes.places); // ALL PLACE ROUTES, ADD REPORT CARD
app.use('/reportcards', routes.reportcards); // VIEW ALL, DELETE, EDIT REPORT CARDS */

// ROUTES
app.use('/api/gigs', routes.gigs);

// app listening
app.listen(PORT, () => console.log(`listening at port ${PORT}\n`));
