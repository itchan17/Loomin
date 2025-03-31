const Notification = require("../models/notification.js");

const makeNotification = async (req, res) => {
  const { senderId, recipientId, content, type, postId, commentId } = req.body;

  try {
    const newNotification = await Notification.create({
      senderId,
      recipientId,
      content,
      type,
      postId,
      commentId,
    });
    const notification = await Notification.findById(
      newNotification._id
    ).populate("senderId", "first_name last_name profile_picture");

    res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const fetchNotifications = async (req, res) => {
  const recipient = req.user._id;

  try {
    const notification = await Notification.find({
      recipientId: recipient,
      isRead: false,
    })
      .populate("senderId", "first_name last_name profile_picture") // Populate specific fields
      .sort({ createdAt: -1 });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
};

const markAsRead = async (req, res) => {
  const { notifId } = req.params;

  try {
    // Correct usage: Pass only the notifId, not an object
    const notif = await Notification.findById(notifId);

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notif.isRead = true;
    await notif.save(); // Ensure to await save for proper async handling
    res.status(200).json(notif);
  } catch (error) {
    console.error(error); // It's good to log the error for debugging
    res.status(500).json({
      message: "An error occurred while marking the notification as read",
      error,
    });
  }
};

const clearNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotif = await Notification.findByIdAndDelete(id);

    if (!deletedNotif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

// Clear all notifications for a user
const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ recipientId: userId });

    res.status(200).json({ message: "All notifications cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing notifications", error });
  }
};

module.exports = {
  makeNotification,
  fetchNotifications,
  markAsRead,
  clearNotification,
  clearAllNotifications,
};
