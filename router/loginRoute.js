// external imports
const express = require("express");
const router = express.Router();

// internal imports
const loginHandler = require("../handler/loginHandler");

router.post("/", loginHandler);

module.exports = router;
