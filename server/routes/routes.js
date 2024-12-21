const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");

// User registration route
router.post("/signup", usersController.signup);

module.exports = router;
