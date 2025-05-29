import { create } from "zustand";
import { login as loginAPI, register as registerAPI } from "../modules/auth/services/AuthServices.js";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginAPI(email, password);
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
    }
  },

  // Register
  register: async (email, password, firstName, lastName, phone) => {
    set({ loading: true, error: null });
    try {
      const data = await registerAPI(email, password, firstName, lastName, phone);
      set({ user: data.user, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Registration failed", loading: false });
    }
  },

  // Logout
  logout: () => {
    set({ user: null });
    // Optional: also call logout API if your backend supports it
  },
}));
