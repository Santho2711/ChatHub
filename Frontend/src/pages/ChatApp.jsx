import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import UserProfile from "../components/UserProfile";
import ThemeSettings from "../components/ThemeSettings";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { initSocket, disconnectSocket } from "../services/socket";
import "../styles/ChatApp.css";

const ChatApp = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const fetchContacts = useChatStore((state) => state.fetchContacts);
  const receiveMessage = useChatStore((state) => state.receiveMessage);
  const setTypingIndicator = useChatStore((state) => state.setTypingIndicator);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (!user) return;

    const socket = initSocket();
    socket.emit("setup", { userId: user.id });

    const handleConnect = () => {};
    const handleDisconnect = () => {};

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    const handleIncomingMessage = (message) => {
      receiveMessage(message);
    };

    const handleTyping = ({ chatId, senderId, isTyping }) => {
      setTypingIndicator(chatId, senderId, isTyping);
    };

    socket.on("message-received", handleIncomingMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("message-received", handleIncomingMessage);
      socket.off("typing", handleTyping);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      disconnectSocket();
    };
  }, [user, receiveMessage, setTypingIndicator]);

  return (
    <div className="chat-app">
      <Sidebar
        onProfileClick={() => setShowProfile(true)}
        onThemeClick={() => setShowThemeSettings(true)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <ChatWindow sidebarOpen={sidebarOpen} />

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}

      {showThemeSettings && (
        <ThemeSettings onClose={() => setShowThemeSettings(false)} />
      )}
    </div>
  );
};

export default ChatApp;
