import React from 'react';
import { useChatStore } from '../store/chatStore';
import '../styles/ContactItem.css';

const ContactItem = ({ contact, onClick }) => {
  const { activeConversationId } = useChatStore();
  const isActive = activeConversationId === contact.id;

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const lastMessagePreview = contact.lastMessage?.substring(0, 30) || 'No messages yet';

  return (
    <div
      className={`contact-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="contact-avatar">
        <img src={contact.avatar} alt={contact.name} />
        <div className={`status-indicator ${contact.status}`}></div>
      </div>

      <div className="contact-content">
        <div className="contact-header">
          <h3 className="contact-name">{contact.name}</h3>
          <span className="contact-time">
            {formatTime(contact.timestamp)}
          </span>
        </div>

        <div className="contact-message">
          <p className={`last-message ${contact.unreadCount > 0 ? 'unread' : ''}`}>
            {contact.type === 'group' && (
              <span className="group-prefix">
                {contact.members?.length || 0} members • 
              </span>
            )}
            {lastMessagePreview}
          </p>
          
          {contact.unreadCount > 0 && (
            <span className="unread-badge">
              {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
