// services/orgService.js
import { axiosInstance as axios } from "../../../config/axios.config";

// Create Organization
export const createOrganizationAPI = async (orgData) => {
  const res = await axios.post("/org", orgData);
  return res.data;
};

// Get Organization By ID (admin only)
export const getOrganizationByIdAPI = async (id) => {
  const res = await axios.get(`/organization/${id}`);
 
  return res.data;
};

// Get All Organizations of User
export const getUserOrganizationsAPI = async () => {
  const res = await axios.get("/organization/user/all");

  return res.data;
};

// Switch Organization (returns new org token)
export const switchOrganizationAPI = async (orgId) => {
  const oldOrgToken = localStorage.getItem("orgtoken");
  const res = await axios.post("/organization/switch", { orgId });
  // console.log("org return from api", res.data.orgtoken);
  localStorage.setItem("orgtoken", res.data.orgtoken);
  const newOrgToken = localStorage.getItem("orgtoken", res.data.orgtoken);

  if (oldOrgToken && oldOrgToken === newOrgToken) {
    console.log("Same organization token");
  } else {
    console.log("Switched to a new organization");
  }
  return res.data;
};

// Get All Users in Organization (admin only)
export const getAllOrgUsersAPI = async () => {
  const res = await axios.get("/org/org/users");
  return res.data;
};

// Update a User in Organization (admin only)
export const updateOrgUserAPI = async (id, updatedUserData) => {
  const res = await axios.put(`/org/updateuser/${id}`, updatedUserData);
  return res.data;
};

// Delete a User from Organization (admin only)
export const deleteOrgUserAPI = async (id) => {
  const res = await axios.delete(`/org/deleteuser/${id}`);
  return res.data;
};

// Create an Invite (admin/manager only)
export const createInviteAPI = async (inviteData) => {
  const res = await axios.post("/organization/createInvite", inviteData);
  return res.data;
};

// Accept Invite
export const acceptInviteAPI = async (token) => {
  const res = await axios.post(`/org/acceptInvite/${token}`);
  return res.data;
};

// Decline Invite
export const declineInviteAPI = async (token) => {
  const res = await axios.post(`/org/declineInvite/${token}`);
  return res.data;
};

// Get All Invites in Organization (admin only)
export const getAllOrganizationInvitesAPI = async () => {
  const res = await axios.get("/org/all/Invite");
  return res.data;
};
