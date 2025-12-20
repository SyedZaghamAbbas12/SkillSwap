import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const chat = new Chat({ sender: req.user.id, receiver, message });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id },
      ],
    }).sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
