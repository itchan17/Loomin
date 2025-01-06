const Chat = require("../models/chat.js");

// Create Chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    // Check for self chat
    if (firstId === secondId) {
      const chat = await Chat.findOne({
        members: [firstId, secondId],
      });

      if (chat) {
        return res.status(200).json(chat);
      }

      // If chat doesn't exist, create a new one
      const newChat = await Chat.create({
        members: [firstId, secondId],
      });

      return res.status(200).json(newChat);
    } else {
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId], $size: 2 },
      });

      if (chat) {
        return res.status(200).json(chat);
      }

      // If chat doesn't exist, create a new one
      const newChat = await Chat.create({
        members: [firstId, secondId],
      });

      return res.status(200).json(newChat);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Fin user's chats
const findUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ members: { $in: [userId] } });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Find single chat
const findChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findOne({ _id: chatId });
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createChat,
  findUserChats,
  findChat,
};
