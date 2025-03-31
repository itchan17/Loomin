const express = require("express");
const router = express.Router();
// Middleware
const authMiddleware = require("../middlewares/authMiddleware.js");
const multiUpload = require("../middlewares/uploadImagesMiddleware.js");

// Controllers
const authController = require("../controllers/authController.js");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");
const usersController = require("../controllers/usersController.js");
const chatsController = require("../controllers/chatsController.js");
const messagesController = require("../controllers/messagesController.js");
const forgotPasswordController = require("../controllers/forgotPasswordController.js");
const notificationsController = require("../controllers/notificationsController.js");

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
router.post(
  "/create-post",
  authMiddleware,
  multiUpload,
  postsController.createPost
);
router.put("/posts/:id", authMiddleware, multiUpload, postsController.editPost);
router.delete("/posts/:id", authMiddleware, postsController.deletePost);
router.get("/posts", authMiddleware, postsController.fetchPosts);
router.put("/posts/:id/archive", authMiddleware, postsController.archivePost);
router.get(
  "/posts/profile/:id",
  authMiddleware,
  postsController.fetchProfilePosts
);
router.get(
  "/posts/archived/profile/:id",
  authMiddleware,
  postsController.fetchArchivedPosts
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
router.get("/users/following", authMiddleware, usersController.fetchFollowing);
router.get("/users/followers", authMiddleware, usersController.fetchFollowers);
router.get("/users/:username", authMiddleware, usersController.fetchUser);
router.post("/users/:id/following", authMiddleware, usersController.followUser);
router.post(
  "/users/edit-profile",
  authMiddleware,
  multiUpload,
  usersController.editProfile
);
router.put(
  "/users/update-info",
  authMiddleware,
  usersController.updateUserInfo
);
router.delete(
  "/users/delete-info",
  authMiddleware,
  usersController.deleteUserInfo
);

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

// Notification routes
router.post(
  "/notifications",
  authMiddleware,
  notificationsController.makeNotification
);
router.get(
  "/notifications",
  authMiddleware,
  notificationsController.fetchNotifications
);
router.post(
  "/notifications/:notifId/read",
  authMiddleware,
  notificationsController.markAsRead
);

router.delete(
  "/notifications/:id",
  authMiddleware,
  notificationsController.clearNotification
);

router.delete(
  "/notifications",
  authMiddleware,
  notificationsController.clearAllNotifications
);

module.exports = router;
