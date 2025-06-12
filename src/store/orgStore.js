import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getOrganizationByIdAPI,
  getUserOrganizationsAPI,
  switchOrganizationAPI,
  createInviteAPI
} from "@/modules/organisation/services/OrgServices.js";
import toast from "react-hot-toast";

const useOrgStore = create(
  persist(
    (set, get) => ({
      // STATE

      userOrgs: [],
      orgUsers: [],
      orgInvites: [],
      loading: false,
      error: null,

      // ACTIONS

      fetchUserOrgs: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getUserOrganizationsAPI();
          console.log(data, "at orgstore");
          set({ userOrgs: data.organizations });
          toast.success("Organizations fetched successfully");
        } catch (err) {
          set({ error: err.message });
          toast.error(err.message);
        } finally {
          set({ loading: false });
        }
      },

      switchOrg: async (orgId) => {
        set({ loading: true });
        const currentOrg = JSON.parse(localStorage.getItem("currentOrg"));
        if (currentOrg?.orgId === orgId) {
          console.log("Already on this organization. Skipping switch.");
          return;
        }

        try {
          const data = await switchOrganizationAPI(orgId);

          localStorage.setItem("orgtoken", data.orgtoken);
          set({ currentOrg: data });
          return true;
        } catch (err) {
          set({ error: err.message });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      fetchCurrentOrgDetails: async (orgId) => {
        try {
          const org = await getOrganizationByIdAPI(orgId);
         
          toast.success("Organization details fetched successfully");
          return org
        } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch organization details");
        }
      },

      fetchOrgUsers: async () => {
        try {
          const users = await getAllUsersInOrgAPI();
          set({ orgUsers: users });
        } catch (err) {
          set({ error: err.message });
        }
      },

      updateOrgUser: async (userId, data) => {
        try {
          await updateOrganizationUserAPI(userId, data);
          await get().fetchOrgUsers();
        } catch (err) {
          set({ error: err.message });
        }
      },

      createInvite: async (inviteData) => {
        console.log("inviteData at store", inviteData);
        set({loading: true, error: null});
        try {

       const res =   await createInviteAPI(inviteData);
       console.log(res);
          toast.success("Invite send successfully");
          await get().fetchOrgInvites();
          set({loading: false});
        } catch (err) {
          set({ error: err.message });
          toast.error(err.response?.data?.message || "Invite send failed");
        }
      },

      acceptInvite: async (token) => {
        try {
          await acceptInviteAPI(token);
        } catch (err) {
          set({ error: err.message });
        }
      },

      declineInvite: async (token) => {
        try {
          await declineInviteAPI(token);
        } catch (err) {
          set({ error: err.message });
        }
      },

      fetchOrgInvites: async () => {
        try {
          const invites = await getAllOrganizationInvitesAPI();
          set({ orgInvites: invites });
        } catch (err) {
          set({ error: err.message });
        }
      },

      createOrganization: async (orgData) => {
        try {
          const res = await createOrganizationAPI(orgData);
          await get().fetchUserOrgs();
          return res;
        } catch (err) {
          set({ error: err.message });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "org-store", // 🧠 localStorage key — ensure this is a string
      partialize: (state) => ({
        userOrgs: state.userOrgs,
        orgUsers: state.orgUsers,
        orgInvites: state.orgInvites,
      }),
    }
  )
);

export default useOrgStore;
