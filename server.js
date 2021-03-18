const dotenv = require('dotenv');
dotenv.config();

/* External Modules */
const express = require('express');
const cors = require('cors');

/* Internal Modules */
const { user } = require('./Controllers');
require('./config/database');
const { routes } = require('./routes');

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

// app.get('/helloworld', (req, res) => {
//   try {
//     res.status(200).json({
//       status: 200,
//       text: `Hello World`,
//       requestedAt: new Date().toLocaleDateString(),
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       error,
//       requestedAt: new Date().toLocaleDateString(),
//     });
//   }
// });

// app listening
app.listen(PORT, () => console.log(`listening at port ${PORT}\n`));
