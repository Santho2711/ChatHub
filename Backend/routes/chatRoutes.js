const express = require("express");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");
const route = express.Router();

// Get all chats for the authenticated user
route.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id })
      .populate("users", "name email pic")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      })
      .sort({ updatedAt: -1 });

    return res.json(chats);
  } catch (error) {
    console.error("Get chats error:", error);
    return res.status(500).json({ message: "Failed to load chats" });
  }
});

// Create or get one-on-one chat
route.post("/", async (req, res) => {
  try {
    const { userId, isGroupChat, chatName, users } = req.body;

    if (isGroupChat) {
      if (!chatName || !Array.isArray(users) || users.length < 1) {
        return res
          .status(400)
          .json({ message: "Group chat requires a name and at least 2 users" });
      }

      const groupChat = await Chat.create({
        chatName: chatName.trim(),
        isGroupChat: true,
        users: [req.user._id, ...users],
        groupAdmin: req.user._id,
      });

      const fullGroupChat = await Chat.findById(groupChat._id)
        .populate("users", "name email pic")
        .populate("groupAdmin", "name email pic");

      return res.status(201).json(fullGroupChat);
    }

    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId is required for one-on-one chat" });
    }

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "name email pic")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      });

    if (chat) {
      return res.json(chat);
    }

    const chatData = {
      chatName: "",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    chat = await Chat.create(chatData);
    chat = await Chat.findById(chat._id)
      .populate("users", "name email pic")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      });

    return res.status(201).json(chat);
  } catch (error) {
    console.error("Create chat error:", error);
    return res.status(500).json({ message: "Failed to create chat" });
  }
});

// Get a specific chat by ID
route.get("/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("users", "name email pic")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.users.some((user) => user._id.equals(req.user._id))) {
      return res.status(403).json({ message: "You are not part of this chat" });
    }

    return res.json(chat);
  } catch (error) {
    console.error("Get chat error:", error);
    return res.status(500).json({ message: "Failed to load chat" });
  }
});

module.exports = route;
