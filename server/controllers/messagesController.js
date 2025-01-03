const Message = require("../models/message.js");

// Creating message
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = await Message.create({ chatId, senderId, text });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Getting messages
const getMessages = async (req, res) => {
  console.log(req);
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
