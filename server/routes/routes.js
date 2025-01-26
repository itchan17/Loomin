const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");
const usersController = require("../controllers/usersController.js");
const chatsController = require("../controllers/chatsController.js");
const messagesController = require("../controllers/messagesController.js");
const forgotPasswordController = require("../controllers/forgotPasswordController.js");

// User authentication routes
router.post("/signup", authController.signup);
router.get("/users/:id/verify/:token", authController.verifyEmail);
router.post(
  "/users/:id/resend-verification",
  authController.resendVerification
);
router.post("/login", authController.login);
router.get("/check-auth", authMiddleware, authController.checkAuth);
router.get("/logout", authMiddleware, authController.logout);

// Forgot password routes
router.post("/forgot-password", forgotPasswordController.forgotPassword);
router.post("/reset-password/:token", forgotPasswordController.resetPassword);

// Post routes
router.post("/create-post", authMiddleware, postsController.createPost);
router.put("/posts/:id", authMiddleware, postsController.editPost);
router.delete("/posts/:id", authMiddleware, postsController.deletePost);
router.get("/posts", authMiddleware, postsController.fetchPosts);
router.put("/posts/:id/archive", authMiddleware, postsController.archivePost);
router.get(
  "/posts/profile/:id",
  authMiddleware,
  postsController.fetchProfilePosts
);

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
router.get("/users/search", authMiddleware, usersController.searchUser);
router.get("/users/:username", authMiddleware, usersController.fetchUser);
router.post("/users/:id/following", authMiddleware, usersController.followUser);

// Chat routes
router.post("/chats/create", authMiddleware, chatsController.createChat);
router.get(
  "/chats/user/:userId",
  authMiddleware,
  chatsController.findUserChats
);
router.get("/chats/:chatId", authMiddleware, chatsController.findChat);

// Message routes
router.post("/messages", authMiddleware, messagesController.createMessage);
router.get("/messages", authMiddleware, messagesController.getUnreadMessages);
router.get("/messages/:chatId", authMiddleware, messagesController.getMessages);
router.put(
  "/messages/mark-as-read",
  authMiddleware,
  messagesController.getAndUpdateMessageStatus
);

module.exports = router;
