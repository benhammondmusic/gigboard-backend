/* External Modules */
const express = require("express");
const cors = require("cors");

/* Port */
const PORT = 3001;

/* App */
const app = express();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.send("Hello World");
});

// app listening
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
