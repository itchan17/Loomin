const Message = require("../models/message.js");

// Creating message
const createMessage = async (req, res) => {
  const { chatId, senderId, receiverId, text } = req.body;

  try {
    const message = await Message.create({
      chatId,
      receiverId,
      senderId,
      text,
    });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get messages based on the chatId
const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get count of unread messages
const getUnreadMessages = async (req, res) => {
  const userId = req.user._id; // Assume user is authenticated

  try {
    const unreadMessages = await Message.find({
      receiverId: userId,
      read: false,
    });

    res.status(200).json({
      unreadCount: unreadMessages.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Updata the messages status and return the updated messages to the client
const getAndUpdateMessageStatus = async (req, res) => {
  const { chatId, userId, messageId } = req.body;
  console.log(req.body);
  try {
    if (messageId) {
      // Update a single message
      const message = await Message.findOne({ _id: messageId, chatId });
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      if (message.receiverId.toString() === userId && message.read === false) {
        message.read = true;
        await message.save();
      }

      return res.status(200).json({ message, updated: true });
    } else {
      const messages = await Message.find({ chatId });

      // Update the 'read' status for messages
      const updatedMessages = await Promise.all(
        messages.map(async (message) => {
          if (message.receiverId.toString() === userId) {
            if (message.read === false) {
              message.read = true;
              await message.save(); // Save the individual message
            }
          }
          return message; // Return the modified message
        })
      );

      // This will return the count of all unread messages
      const unreadMessages = await Message.find({
        receiverId: userId,
        read: false,
      });

      res.status(200).json({
        updatedMessages,
        updated: true,
        unreadCount: unreadMessages.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  getAndUpdateMessageStatus,
  getUnreadMessages,
};
