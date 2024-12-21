const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const usersController = require("../controllers/usersController.js");
const postsController = require("../controllers/postsController.js");

// User registration route
router.post("/signup", usersController.signup);

// User authentication route
router.post("/login", usersController.login);
router.get("/check-auth", authMiddleware, usersController.checkAuth);
router.get("/logout", authMiddleware, usersController.logout);

// Post route
router.post("/create-post", authMiddleware, postsController.createPost);
router.put("/posts/:id", authMiddleware, postsController.editPost);
router.delete("/posts/:id", authMiddleware, postsController.deletePost);
router.get("/", authMiddleware, postsController.fetchPost);

module.exports = router;
