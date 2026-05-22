const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");
const { generateToken } = require("../config/generateToken");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
    };

    const users = await User.find({ _id: { $ne: user._id } }).select(
      "name email pic",
    );

    const chats = await Chat.find({ users: user._id })
      .populate("users", "name email pic")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      })
      .sort({ updatedAt: -1 });

    return res.json({
      token,
      user: safeUser,
      users,
      chats,
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

route.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    const token = generateToken(user._id);
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
    };

    const users = await User.find({ _id: { $ne: user._id } }).select(
      "name email pic",
    );

    return res.status(201).json({
      token,
      user: safeUser,
      users,
      chats: [],
    });
  } catch (error) {
    console.error("Registration error", error);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

module.exports = route;
