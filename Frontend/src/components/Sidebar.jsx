import React, { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import ContactList from "./ContactList";
import NewGroupModal from "./NewGroupModal";
import "../styles/Sidebar.css";

const Sidebar = ({
  onProfileClick,
  onThemeClick,
  sidebarOpen,
  onToggleSidebar,
}) => {
  const { setSearchQuery, getFilteredContacts } = useChatStore();
  const { user, users } = useAuthStore();
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    setSearchQuery(value);
  };

  const filteredContacts = getFilteredContacts();

  const filteredUsers = (
    searchValue
      ? users.filter((u) =>
          [u.name, u.email]
            .join(" ")
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        )
      : []
  ).map((userItem) => ({
    id: userItem._id,
    name: userItem.name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      userItem.name,
    )}`,
    lastMessage: userItem.email,
    timestamp: new Date(),
    unreadCount: 0,
    status: "online",
    type: "user",
  }));

  const contactsToDisplay = searchValue
    ? [...filteredContacts, ...filteredUsers]
    : filteredContacts;

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="header-content">
            <h1>ChatHub</h1>
            <div className="header-actions">
              <button
                className="icon-button"
                onClick={() => setShowNewGroupModal(true)}
                title="New group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="icon-button"
                onClick={onThemeClick}
                title="Theme settings"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </button>
              <button
                className="icon-button"
                onClick={onProfileClick}
                title="View profile"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search or start a new chat"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            {searchValue && (
              <button className="clear-button" onClick={() => handleSearch("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Contacts List */}
        <ContactList contacts={contactsToDisplay} />
      </div>

      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* New Group Modal */}
      {showNewGroupModal && (
        <NewGroupModal onClose={() => setShowNewGroupModal(false)} />
      )}
    </>
  );
};

export default Sidebar;
