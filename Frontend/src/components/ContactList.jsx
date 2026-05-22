import React from "react";
import { useChatStore } from "../store/chatStore";
import ContactItem from "./ContactItem";
import "../styles/ContactList.css";

const ContactList = ({ contacts }) => {
  const { setActiveConversation, markAsRead, createOrOpenChat } =
    useChatStore();

  const handleSelectContact = async (contact) => {
    if (contact.type === "user") {
      await createOrOpenChat(contact.id);
      return;
    }

    setActiveConversation(contact.id);
    markAsRead(contact.id);
  };

  if (contacts.length === 0) {
    return (
      <div className="contacts-empty">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <p>No conversations found</p>
      </div>
    );
  }

  return (
    <div className="contacts-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={() => handleSelectContact(contact)}
        />
      ))}
    </div>
  );
};

export default ContactList;
