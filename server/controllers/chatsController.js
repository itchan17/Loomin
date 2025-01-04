const Chat = require("../models/chat.js");

// Create Chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

    if (chat) return res.status(200).json(chat);

    const newChat = await Chat.create({ members: [firstId, secondId] });

    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Fin user's chats
const findUserChats = async (req, res) => {
  const userId = req.params.id;

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
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });

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
