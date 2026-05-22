const express = require("express");
const User = require("../model/userModel");
const route = express.Router();

// Get current authenticated user profile
route.get("/profile", async (req, res) => {
  return res.json(req.user);
});

// Get all users except the current user
route.get("/", async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "name email pic",
    );
    return res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Failed to load users" });
  }
});

module.exports = route;
