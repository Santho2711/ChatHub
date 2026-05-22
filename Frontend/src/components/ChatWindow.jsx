import React, { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { joinChatRoom, leaveChatRoom } from "../services/socket";
import "../styles/ChatWindow.css";

const ChatWindow = ({ sidebarOpen }) => {
  const { activeConversationId, getActiveContact } = useChatStore();
  const messagesEndRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const activeContact = getActiveContact();
  const messages = useChatStore(
    (state) => state.messages[state.activeConversationId] || [],
  );

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [activeConversationId, isInitialLoad]);

  // Scroll when new messages arrive in the active conversation
  useEffect(() => {
    if (!activeConversationId) return;
    scrollToBottom();
  }, [messages.length, activeConversationId]);

  useEffect(() => {
    if (!activeConversationId) return;
    joinChatRoom(activeConversationId);
    return () => {
      leaveChatRoom(activeConversationId);
    };
  }, [activeConversationId]);

  if (!activeContact) {
    return (
      <div className="chat-window empty-state">
        <div className="empty-illustration">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h2>Welcome to ChatApp</h2>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-window ${!sidebarOpen ? "full-width" : ""}`}>
      <ChatHeader contact={activeContact} />

      <div className="messages-container">
        <MessageList contact={activeContact} />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput contact={activeContact} />
    </div>
  );
};

export default ChatWindow;
