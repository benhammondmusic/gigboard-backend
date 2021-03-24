const express = require("express");
const router = express.Router();

const userCtrl = require("../Controllers/user");

// routes start with /users/
router.post("/register", userCtrl.register);
router.post("/oauth", userCtrl.registerGoogleUser);
router.post("/login", userCtrl.login);

module.exports = router;
