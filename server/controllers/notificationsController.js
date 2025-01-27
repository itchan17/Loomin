const Notification = require("../models/notification.js");

const makeNotification = async (req, res) => {
  const { senderId, recipientId, content, type, postId, commentId } = req.body;

  try {
    const res = await Notification.create({
      senderId,
      recipientId,
      content,
      type,
      postId,
      commentId,
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  makeNotification,
};
