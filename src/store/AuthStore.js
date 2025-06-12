import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ForgotPasswordAPI,
  loginAPI,
  registerAPI,
  ResetPasswordAPI,
} from "@/modules/auth/services/AuthServices.js";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      currentOrg: null,

      setCurrentOrg: (org) => set({ currentOrg: org }),
      // Login
      login: async (email, password) => {
        set({ loading: true, error: null }); // Start loading, reset error

        try {
          const data = await loginAPI(email, password); // Call the login API

          // Store organization data
          // ✅ Set currentOrg directly here
          const org = {
            orgId: data.orgId,
            orgName: data.orgName,
          };

          set({
            user: data,
            currentOrg: org, // ✅ update currentOrg
            loading: false,
          });

          toast.success("Login successful"); // Notify user
          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Login failed", // Error state
            loading: false,
          });
          toast.error(err.response?.data?.message || "Login failed"); // Notify user
          return false;
        }
      },
      // Register
      register: async (email, password, firstName, lastName, phone) => {
        set({ loading: true, error: null });
        try {
          const res = await registerAPI(
            email,
            password,
            firstName,
            lastName,
            phone
          );
          set({ user: res.data.user, loading: false });
          toast.success("Registration successful");
        } catch (err) {
          set({
            error: err.response?.data?.message || "Registration failed",
            loading: false,
          });
          toast.error(err.response?.data?.message || "Registration failed");
        }
      },

      // Forgot Password
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const res = await ForgotPasswordAPI(email);
          toast.success(res.data.message);
        } catch (err) {
          toast.error(err.response?.data?.message || "Email send failed");
        } finally {
          set({ loading: false });
        }
      },

      // Reset Password
      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          const res = await ResetPasswordAPI(token, password);
          set({ user: res.user, loading: false });
          toast.success(res.message);
        } catch (err) {
          set({ loading: false });
          toast.error(err.response?.data?.message || "Password reset failed");
        }
      },

      // Logout
      logout: () => {
        set({ user: null, currentOrg: null });
        localStorage.removeItem("token");
        localStorage.removeItem("orgtoken");
        toast.success("Logged out");
      },
    }),
    {
      name: "auth-store", // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        currentOrg: state.currentOrg,
      }), // only persist user
    }
  )
);
