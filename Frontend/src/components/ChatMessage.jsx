import React, { useEffect, useState } from 'react';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message, isOwnMessage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`message-wrapper ${isOwnMessage ? 'own' : 'other'} ${isVisible ? 'visible' : ''}`}
    >
      <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
        {!isOwnMessage && (
          <div className="message-sender">
            {message.senderName}
          </div>
        )}
        
        <div className="message-content">
          <p className="message-text">{message.text}</p>
          
          <div className="message-footer">
            <span className="message-time">
              {formatTime(message.timestamp)}
            </span>
            {isOwnMessage && (
              <span className={`message-status ${message.status}`}>
                {getStatusIcon(message.status)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
