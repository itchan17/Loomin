const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const usersController = require("../controllers/usersController.js");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");

// User registration routes
router.post("/signup", usersController.signup);

// User authentication routes
router.post("/login", usersController.login);
router.get("/check-auth", authMiddleware, usersController.checkAuth);
router.get("/logout", authMiddleware, usersController.logout);

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

module.exports = router;
