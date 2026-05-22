import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AUTH_TOKEN_KEY = "chatapp_auth_token";
const AUTH_USER_KEY = "chatapp_auth_user";
const AUTH_USERS_KEY = "chatapp_auth_users";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const saveSession = (token, user, users = []) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
};

const clearSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_USERS_KEY);
};

export const getStoredAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getStoredAuthUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const getStoredAuthUsers = () => {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const authApi = {
  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password,
    });
    const { token, user, users, chats } = response.data;
    saveSession(token, user, users || []);
    return { token, user, users: users || [], chats: chats || [] };
  },
  register: async ({ name, email, password }) => {
    const response = await api.post("/auth/register", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    const { token, user, users, chats } = response.data;
    saveSession(token, user, users || []);
    return { token, user, users: users || [], chats: chats || [] };
  },
  logout: () => {
    clearSession();
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get("/api/users/profile");
    return response.data;
  },
  getContacts: async () => {
    const response = await api.get("/api/users");
    return response.data;
  },
};

export const chatApi = {
  getChats: async () => {
    const response = await api.get("/api/chats");

    return response.data;
  },
  getChatById: async (id) => {
    const response = await api.get(`/api/chats/${id}`);
    return response.data;
  },
  createChat: async (payload) => {
    const response = await api.post("/api/chats", payload);

    return response.data;
  },
};

export const messageApi = {
  getMessages: async (chatId) => {
    const response = await api.get("/api/messages", {
      params: { chatId },
    });
    return response.data;
  },
  sendMessage: async ({ chatId, content }) => {
    try {
      const response = await api.post("/api/messages", { chatId, content });
      return response.data;
    } catch (error) {
      console.error(
        "messageApi.sendMessage error:",
        error.response?.data || error.message || error,
      );
      throw error;
    }
  },
};
