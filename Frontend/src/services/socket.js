import { io } from "socket.io-client";
import { getStoredAuthToken } from "./api";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
let socket = null;

export const initSocket = () => {
  if (socket) {
    return socket;
  }

  const token = getStoredAuthToken();
  socket = io(API_URL, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });

  socket.on("connect", () => {});

  socket.on("disconnect", () => {});

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message || error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinChatRoom = (chatId) => {
  if (!socket || !chatId) return;
  socket.emit("join-chat", { chatId });
};

export const leaveChatRoom = (chatId) => {
  if (!socket || !chatId) return;
  socket.emit("leave-chat", { chatId });
};

export const sendTyping = (chatId, senderId, isTyping) => {
  if (!socket || !chatId) return;
  socket.emit("typing", { chatId, senderId, isTyping });
};
