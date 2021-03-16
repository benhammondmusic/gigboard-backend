/* External Modules */
const express = require("express");
const cors = require("cors");

/* Internal Modules */
const { user } = require("./Controllers");

/* Port */
const PORT = process.env.PORT || 5000;

/* App */
const app = express();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:3000",
  "https://jc-gig-frontend.herokuapp.com/",
  "https://sergio-gig-board.herokuapp.com",
];
var corsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

/* Routes */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/helloworld", (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      text: `Hello World`,
      requestedAt: new Date().toLocaleDateString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error,
      requestedAt: new Date().toLocaleDateString(),
    });
  }
});

app.post("/register", user.register);

// app listening
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
