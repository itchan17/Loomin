const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const usersController = require("../controllers/usersController.js");

// User registration route
router.post("/signup", usersController.signup);

// User authentication route
router.post("/login", usersController.login);
router.get("/check-auth", authMiddleware, usersController.checkAuth);
router.get("/logout", authMiddleware, usersController.logout);

module.exports = router;
