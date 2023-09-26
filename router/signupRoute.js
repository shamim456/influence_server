// external importes
const express = require("express");
const router = express.Router();

// internal importes
const UserController = require("../handler/signupHandler");

// Register a new user
router.post("/", UserController);

module.exports = router;
