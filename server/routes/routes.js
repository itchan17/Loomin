const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");
const usersController = require("../controllers/usersController.js");

// User registration routes
router.post("/signup", authController.signup);

// User authentication routes
router.post("/login", authController.login);
router.get("/check-auth", authMiddleware, authController.checkAuth);
router.get("/logout", authMiddleware, authController.logout);

// Post routes
router.post("/create-post", authMiddleware, postsController.createPost);
router.put("/posts/:id", authMiddleware, postsController.editPost);
router.delete("/posts/:id", authMiddleware, postsController.deletePost);
router.get("/posts", authMiddleware, postsController.fetchPost);

// Comment routes
router.post(
  "/posts/:id/comments",
  authMiddleware,
  commentsController.createComment
);

router.get(
  "/posts/:id/comments",
  authMiddleware,
  commentsController.fetchPostComment
);

// User routes
router.get("/users", authMiddleware, usersController.fetchUser);

module.exports = router;
