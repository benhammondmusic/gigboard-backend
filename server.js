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
app.use(cors());

/* Routes */
app.use('/api/gigs', routes.gigs); // ALL GIG ROUTES: CRUD
app.use('/users', routes.users); // ALL USER ROUTES: login(), register()

// app listening
app.listen(PORT, () => console.log(`listening at port ${PORT}\n`));
