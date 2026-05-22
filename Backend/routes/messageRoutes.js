const express = require("express");
const Message = require("../model/messageModel");
const Chat = require("../model/chatModel");
const route = express.Router();

const transformMessage = (message) => ({
  id: message._id,
  chatId: message.chat?._id || message.chat,
  content: message.content,
  text: message.content,
  senderId: message.sender?._id || message.sender,
  senderName: message.sender?.name || "Unknown",
  senderPic: message.sender?.pic || "",
  timestamp: message.createdAt || message.updatedAt || new Date(),
  status: "sent",
  readBy: message.readBy || [],
});

// Get all messages for a chat
route.get("/", async (req, res) => {
  try {
    const { chatId } = req.query;
    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email pic")
      .populate("chat");

    return res.json(messages.map(transformMessage));
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({ message: "Failed to load messages" });
  }
});

// Send a message in a chat
route.post("/", async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res
        .status(400)
        .json({ message: "content and chatId are required" });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      content: content.trim(),
      chat: chatId,
      readBy: [req.user._id],
    });

    // populate sequentially — document.populate returns a Promise, so chaining
    // .populate().populate() can call populate on a Promise and fail.
    await newMessage.populate("sender", "name email pic");
    await newMessage.populate({
      path: "chat",
      populate: { path: "users", select: "name email pic" },
    });
    const populatedMessage = newMessage;

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage._id,
    });

    const messageData = transformMessage(populatedMessage);
    const io = req.app.get("io");
    if (io) {
      // Emit to the chat room (for clients currently in the room)
      io.to(chatId).emit("message-received", messageData);

      // Also emit to each participant's personal room (their user id)
      // so they receive the message even if they haven't joined the chat room.
      try {
        const participantIds = (populatedMessage.chat?.users || []).map((u) =>
          u?._id ? u._id.toString() : u.toString(),
        );
        participantIds.forEach((pid) => {
          io.to(pid).emit("message-received", messageData);
        });
      } catch (e) {
        console.error("Error emitting to participant rooms:", e);
      }
    }

    return res.status(201).json(messageData);
  } catch (error) {
    console.error("Send message error:", error.stack || error.message || error);
    const message =
      (error.response && error.response.data) ||
      error.message ||
      "Failed to send message";
    return res.status(500).json({ message });
  }
});

module.exports = route;
