import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { sendTyping } from "../services/socket";
import EmojiPicker from "./EmojiPicker";
import "../styles/ChatInput.css";

const ChatInput = ({ contact }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const updateContactLastMessage = useChatStore(
    (state) => state.updateContactLastMessage,
  );
  const setTypingIndicator = useChatStore((state) => state.setTypingIndicator);
  const activeConversationId = useChatStore(
    (state) => state.activeConversationId,
  );
  const user = useAuthStore((state) => state.user);
  const typingTimeoutRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (!activeConversationId) return;

    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
      setTypingIndicator(activeConversationId, user?.id || "me", true);
      sendTyping(activeConversationId, user?.id || "me", true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        setTypingIndicator(activeConversationId, user?.id || "me", false);
        sendTyping(activeConversationId, user?.id || "me", false);
      }
    }, 3000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, isTyping, activeConversationId, setTypingIndicator, user]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversationId) return;

    const content = message.trim();
    setMessage("");
    setIsTyping(false);
    setShowEmojiPicker(false);
    setTypingIndicator(activeConversationId, user?.id || "me", false);
    sendTyping(activeConversationId, user?.id || "me", false);

    await sendMessage(activeConversationId, content);
    updateContactLastMessage(activeConversationId, content);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((current) => current + emoji);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="chat-input-container">
      <div className="input-actions">
        <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
          <button
            className={`action-button ${showEmojiPicker ? "active" : ""}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji picker"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <circle cx="9" cy="9" r="1.5" />
              <circle cx="15" cy="9" r="1.5" />
              <path d="M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" />
            </svg>
          </button>

          {showEmojiPicker && <EmojiPicker onEmojiSelect={handleEmojiSelect} />}
        </div>
      </div>

      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        rows="1"
      />

      <button
        className={`send-button ${message.trim() ? "active" : ""}`}
        onClick={handleSendMessage}
        disabled={!message.trim()}
        title="Send message"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346273 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.03521743,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
