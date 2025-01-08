const Chat = require("../models/chat.js");

// Create Chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    // Check for self chat
    if (firstId === secondId) {
      const chat = await Chat.findOne({
        members: [firstId, secondId],
      }).populate({
        path: "members",
        select: "first_name last_name profile_picture username",
      });

      if (chat) {
        return res.status(200).json(chat);
      }

      // If self chat doesn't exist, create a new one
      const newChat = await Chat.create({
        members: [firstId, secondId],
      });

      // Populate after the chat is created
      await newChat.populate({
        path: "members",
        select: "first_name last_name profile_picture username",
      });

      return res.status(200).json(newChat);
    } else {
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId], $size: 2 },
      }).populate({
        path: "members",
        select: "first_name last_name profile_picture username",
      });

      // If chat exist return the chat
      if (chat) {
        return res.status(200).json(chat);
      }

      // If chat doesn't exist, create a new one
      const newChat = await Chat.create({
        members: [firstId, secondId],
      });

      // Populate after the chat is created
      await newChat.populate({
        path: "members",
        select: "first_name last_name profile_picture username",
      });

      return res.status(200).json(newChat);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the chat" });
  }
};

// Fin user's chats
const findUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get all the chat of the user along the data of the member of the chat
    const chats = await Chat.find({ members: { $in: [userId] } }).populate({
      path: "members",
      select: "first_name last_name profile_picture username",
    });

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
    // Get all the chat of the user along the data of the member of the chat
    const chat = await Chat.findOne({ _id: chatId }).populate({
      path: "members",
      select: "first_name last_name profile_picture username",
    });

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
