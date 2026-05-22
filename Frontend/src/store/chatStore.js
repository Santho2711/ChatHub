import { create } from "zustand";
import { chatApi, messageApi, getStoredAuthUser } from "../services/api";
import { joinChatRoom } from "../services/socket";

const currentUser = () =>
  getStoredAuthUser() || { id: "me", name: "You", email: "", pic: "" };

const formatChatName = (chat, user) => {
  if (chat.chatName) return chat.chatName;

  const userId = user?.id?.toString();
  const otherUsers = (chat.users || []).filter(
    (member) => member._id?.toString() !== userId,
  );
  if (otherUsers.length === 1) return otherUsers[0].name;
  if (otherUsers.length > 1)
    return otherUsers.map((member) => member.name).join(", ");
  return "Unknown Chat";
};

const transformApiChat = (chat, user) => {
  const isGroup = Boolean(chat.isGroupChat);
  const name = formatChatName(chat, user);
  const lastMessage =
    chat.latestMessage?.content ||
    (isGroup
      ? `${chat.users?.length || 0} members`
      : chat.users
          ?.filter((member) => member._id !== user.id)
          .map((member) => member.name)
          .join(", "));

  return {
    id: chat._id,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    status: "online",
    lastMessage: lastMessage || "No messages yet",
    timestamp: chat.latestMessage?.createdAt || chat.updatedAt || new Date(),
    unreadCount: 0,
    type: isGroup ? "group" : "individual",
    members: chat.users?.map((user) => user.name) || [],
    users: chat.users || [],
  };
};

const transformApiMessage = (message, user) => ({
  id: message.id || message._id,
  chatId: message.chatId || message.chat?._id || message.chat,
  text: message.text || message.content || "",
  content: message.content || message.text || "",
  senderId: message.senderId || message.sender?._id || message.sender,
  senderName: message.senderName || message.sender?.name || "Unknown",
  senderPic: message.senderPic || message.sender?.pic || "",
  timestamp:
    message.timestamp || message.createdAt || message.updatedAt || new Date(),
  status: message.status || "sent",
});

export const useChatStore = create((set, get) => ({
  contacts: [],
  activeConversationId: null,
  messages: {},
  searchQuery: "",
  loading: false,
  error: null,
  typingUsers: {},

  fetchContacts: async () => {
    set({ loading: true, error: null });
    try {
      const user = currentUser();
      const chats = await chatApi.getChats();
      const contacts = chats.map((chat) => transformApiChat(chat, user));

      set({
        contacts,
        activeConversationId: contacts[0]?.id || null,
        loading: false,
      });

      if (contacts[0]?.id) {
        await get().loadChatList(contacts[0].id);
      }
    } catch (error) {
      set({ loading: false, error: "Failed to load chats. Please try again." });
    }
  },

  loadChatList: async (conversationId) => {
    set({ loading: true, error: null });
    try {
      const user = currentUser();
      const messages = await messageApi.getMessages(conversationId);
      const normalized = messages.map((message) =>
        transformApiMessage(message, user),
      );
      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: normalized,
        },
        activeConversationId: conversationId,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: "Failed to load conversation. Please try again.",
      });
    }
  },

  setActiveConversation: async (conversationId) => {
    set({ activeConversationId: conversationId });
    await get().loadChatList(conversationId);
  },

  createOrOpenChat: async (userId) => {
    if (!userId) return;
    set({ loading: true, error: null });

    try {
      const user = currentUser();
      const chat = await chatApi.createChat({ userId });
      const contact = transformApiChat(chat, user);

      set((state) => ({
        contacts: state.contacts.some((item) => item.id === contact.id)
          ? state.contacts.map((item) =>
              item.id === contact.id ? contact : item,
            )
          : [contact, ...state.contacts],
        loading: false,
      }));

      set({ activeConversationId: contact.id });
      try {
        joinChatRoom(contact.id);
      } catch (e) {}
      await get().loadChatList(contact.id);
      return contact;
    } catch (error) {
      set({ loading: false, error: "Failed to start chat. Please try again." });
    }
  },

  sendMessage: async (conversationId, text) => {
    if (!text?.trim()) return;
    set({ loading: true, error: null });

    try {
      const user = currentUser();
      const message = await messageApi.sendMessage({
        chatId: conversationId,
        content: text.trim(),
      });
      const normalized = transformApiMessage(message, user);

      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: [
            ...(state.messages[conversationId] || []).filter(
              (msg) => msg.id !== normalized.id,
            ),
            normalized,
          ],
        },
        contacts: state.contacts.map((contact) =>
          contact.id === conversationId
            ? {
                ...contact,
                lastMessage: normalized.text,
                timestamp: normalized.timestamp,
              }
            : contact,
        ),
        loading: false,
      }));
    } catch (error) {
      console.error(
        "chatStore.sendMessage error:",
        error.response?.data || error.message || error,
      );
      set({
        loading: false,
        error: "Failed to send message. Please try again.",
      });
    }
  },

  receiveMessage: (message) => {
    const user = currentUser();
    const normalized = transformApiMessage(message, user);

    set((state) => {
      const existingMessages = state.messages[normalized.chatId] || [];
      if (existingMessages.some((msg) => msg.id === normalized.id)) {
        return {};
      }

      const updatedContacts = state.contacts.map((contact) => {
        if (contact.id !== normalized.chatId) {
          return contact;
        }

        const isActive = contact.id === state.activeConversationId;
        return {
          ...contact,
          lastMessage: normalized.text,
          timestamp: normalized.timestamp,
          unreadCount: isActive ? 0 : contact.unreadCount + 1,
        };
      });

      return {
        contacts: updatedContacts,
        messages: {
          ...state.messages,
          [normalized.chatId]: [...existingMessages, normalized],
        },
      };
    });
  },

  updateMessageStatus: (conversationId, messageId, status) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: state.messages[conversationId]?.map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg,
        ),
      },
    })),

  getActiveMessages: () => {
    const state = get();
    return state.messages[state.activeConversationId] || [];
  },

  getActiveContact: () => {
    const state = get();
    return state.contacts.find((c) => c.id === state.activeConversationId);
  },

  setTypingIndicator: (conversationId, userId, isTyping) =>
    set((state) => {
      const users = state.typingUsers?.[conversationId] || [];
      const updatedUsers = isTyping
        ? [...new Set([...users, userId])]
        : users.filter((id) => id !== userId);

      return {
        typingUsers: {
          ...state.typingUsers,
          [conversationId]: updatedUsers,
        },
      };
    }),

  getTypingUsers: (conversationId) => {
    const state = get();
    return state.typingUsers?.[conversationId] || [];
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredContacts: () => {
    const state = get();
    if (!state.searchQuery) return state.contacts;
    return state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        contact.lastMessage
          ?.toLowerCase()
          .includes(state.searchQuery.toLowerCase()),
    );
  },

  updateContactLastMessage: (conversationId, message) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === conversationId
          ? {
              ...contact,
              lastMessage: message,
              timestamp: new Date(),
              unreadCount: 0,
            }
          : contact,
      ),
    })),

  markAsRead: (conversationId) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === conversationId
          ? { ...contact, unreadCount: 0 }
          : contact,
      ),
    })),

  createGroup: async (groupName, members) => {
    set({ loading: true, error: null });
    try {
      const user = currentUser();
      const chat = await chatApi.createChat({
        isGroupChat: true,
        chatName: groupName,
        users: members,
      });

      const contact = transformApiChat(chat, user);

      set((state) => ({
        contacts: state.contacts.some((item) => item.id === contact.id)
          ? state.contacts.map((item) =>
              item.id === contact.id ? contact : item,
            )
          : [contact, ...state.contacts],
        messages: {
          ...state.messages,
          [contact.id]: state.messages[contact.id] || [],
        },
        loading: false,
      }));

      try {
        joinChatRoom(contact.id);
      } catch (e) {}

      await get().loadChatList(contact.id);
      return contact;
    } catch (error) {
      console.error(
        "createGroup error:",
        error?.response?.data || error.message || error,
      );
      set({
        loading: false,
        error: "Failed to create group. Please try again.",
      });
    }
  },
}));
