import React, { useState } from "react";
import "../styles/ChatHeader.css";

const ChatHeader = ({ contact }) => {
  const [showInfo, setShowInfo] = useState(false);

  const getStatusText = () => {
    if (contact.type === "group") {
      return `${contact.members?.length || 0} members`;
    }
    return contact.status === "online" ? "Active now" : "Offline";
  };

  const getLastSeenText = () => {
    if (contact.type === "group") {
      return null;
    }
    if (contact.status === "online") {
      return "Active now";
    }
    const lastSeen = new Date(contact.lastMessage?.timestamp || Date.now());
    const diffMins = Math.floor((Date.now() - lastSeen) / 60000);
    if (diffMins < 60) return `Last seen ${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Last seen ${diffHours}h ago`;
    return `Last seen ${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="chat-header">
      <div className="header-left">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="header-avatar"
        />
        <div className="header-info">
          <h2 className="header-name">{contact.name}</h2>
          <p className="header-status">{getStatusText()}</p>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="icon-button"
          onClick={() => setShowInfo(!showInfo)}
          title="Contact info"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
      </div>

      {showInfo && (
        <div className="contact-info-popup">
          <div className="info-header">
            <h3>Contact Info</h3>
            <button onClick={() => setShowInfo(false)}>✕</button>
          </div>
          <div className="info-content">
            <div className="info-avatar">
              <img src={contact.avatar} alt={contact.name} />
            </div>
            <h2>{contact.name}</h2>
            <p className={`status ${contact.status}`}>
              {getLastSeenText() || `Active now`}
            </p>
            {contact.type === "group" && (
              <div className="members-list">
                <h4>Members</h4>
                {contact.members?.map((member) => (
                  <div key={member} className="member-item">
                    {member}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
