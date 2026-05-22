import { create } from "zustand";
import {
  authApi,
  getStoredAuthToken,
  getStoredAuthUser,
  getStoredAuthUsers,
} from "../services/api";

const storedToken = getStoredAuthToken();
const storedUser = getStoredAuthUser();
const storedUsers = (getStoredAuthUsers() || []).map((user) => ({
  ...user,
  id: user.id || user._id,
}));
const storedAuthView = sessionStorage.getItem("auth_view") || "login";

export const useAuthStore = create((set) => ({
  isAuthenticated: Boolean(storedToken),
  user: storedUser,
  users: storedUsers,
  authView: storedAuthView,
  token: storedToken,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const { token, user, users } = await authApi.login(credentials);
      set({
        isAuthenticated: true,
        user,
        token,
        users: (users || []).map((userItem) => ({
          ...userItem,
          id: userItem.id || userItem._id,
        })),
        loading: false,
      });
      return user;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  register: async (credentials) => {
    set({ loading: true });
    try {
      const { token, user, users } = await authApi.register(credentials);
      set({
        isAuthenticated: true,
        user,
        token,
        users: (users || []).map((userItem) => ({
          ...userItem,
          id: userItem.id || userItem._id,
        })),
        authView: "login",
        loading: false,
      });
      return user;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    authApi.logout();
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      authView: "login",
      loading: false,
    });
  },

  setAuthView: (view) => {
    try {
      sessionStorage.setItem("auth_view", view);
    } catch (e) {}
    set({ authView: view });
  },

  updateProfile: (updatedData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedData,
      },
    })),

  setUserStatus: (status) =>
    set((state) => ({
      user: {
        ...state.user,
        status,
        lastSeen: new Date(),
      },
    })),

  setLoading: (loading) => set({ loading }),
}));
