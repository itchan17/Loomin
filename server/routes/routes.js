const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");
const usersController = require("../controllers/usersController.js");
const chatsController = require("../controllers/chatsController.js");
const messagesController = require("../controllers/messagesController.js");

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
router.get("/posts", authMiddleware, postsController.fetchPosts);
router.put("/posts/:id/archive", authMiddleware, postsController.archivePost);

// Like / Unlike post route
router.post("/posts/:id/like", authMiddleware, postsController.likeUnlikePost);

// Comment routes
router.post(
  "/posts/:id/comments",
  authMiddleware,
  commentsController.createComment
);
router.get(
  "/posts/:id/comments",
  authMiddleware,
  commentsController.fetchPostComments
);
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.editComment
);
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.deleteComment
);

// User routes
router.get("/users", authMiddleware, usersController.fetchLoggedInUser);
router.get("/users/:id", authMiddleware, usersController.fetchUser);
router.post("/users/:id/following", authMiddleware, usersController.followUser);

// Chat routes
router.post("/chats", authMiddleware, chatsController.createChat);
router.get("/chats/:id", authMiddleware, chatsController.findUserChats);
router.get(
  "/chats/:firstId/:secondId",
  authMiddleware,
  chatsController.findChat
);

// Message routes
router.post("/messages", authMiddleware, messagesController.createMessage);
router.get("/messages/:chatId", authMiddleware, messagesController.getMessages);

module.exports = router;
