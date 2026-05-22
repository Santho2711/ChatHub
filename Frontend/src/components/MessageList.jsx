import React from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import ChatMessage from "./ChatMessage";
import "../styles/MessageList.css";

const MessageList = ({ contact }) => {
  const user = useAuthStore((state) => state.user);

  // Select messages and typing users directly from the store to avoid
  // unstable function references in dependency arrays and re-render loops.
  const messages = useChatStore((state) => state.messages[contact.id] || []);
  const typingUsers = useChatStore(
    (state) => state.typingUsers[contact.id] || [],
  );

  if (messages.length === 0 && typingUsers.length === 0) {
    return (
      <div className="messages-empty">
        <div className="empty-icon">
          <img src={contact.avatar} alt={contact.name} />
        </div>
        <h3>{contact.name}</h3>
        <p>Start your conversation</p>
        <small>Messages are end-to-end encrypted</small>
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.length === 0 && <div className="day-divider">Today</div>}

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isOwnMessage={message.senderId === user?.id}
        />
      ))}

      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <div className="typing-avatar">
            <img src={contact.avatar} alt={contact.name} />
          </div>
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
