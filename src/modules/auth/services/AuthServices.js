import { axiosInstance as axios } from "../../../config/axios.config";
import { useAuthStore } from "../../../store/AuthStore.js";

export const loginAPI = async (email, password) => {
 
  console.log("Logging in with:", { email, password });
  const res = await axios.post("/auth/signin", { email, password });
  
  localStorage.setItem("token", res.data.token);
  
  localStorage.setItem("orgEmail", res.data.data.orgEmail);
  localStorage.setItem("orgtoken", res.data.orgtoken);
  localStorage.setItem("orgName", res.data.data.orgName);
 
 
 
  return res.data.data;
};
export const registerAPI = async (
  email,
  password,
  firstName,
  lastName,
  phone
) => {
  // Replace with actual registration API call
  console.log("Registering with:", {
    email,
    password,
    firstName,
    lastName,
    phone,
  });
  const res = await axios.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
    phone,
  });
  return res;
};
export const ForgotPasswordAPI = async (email) => {
  // Replace with actual forgot password API call
  console.log("Forgot password with:", { email });
  const res = await axios.post("/auth/forgot", { email });
  console.log(res);
  return res;
};

export const ResetPasswordAPI = async (token, password) => {
  // Replace with actual reset password API call
  // console.log("Reset password with:", { token, password });
  const res = await axios.post("/auth/reset", { token, password });
  return res.data;
};
export const LogoutAPI = async () => {
  // Replace with actual logout API call
  console.log("Logging out");
  const res = await axios.post("/auth/logout");
  return res;
};
export const DeleteAccountAPI = async ({ id }) => {
  // Replace with actual delete account API call
  console.log("Deleting account");
  const res = await axios.post(`/auth/delete/${id}`);
  return res;
};

export const getProfileAPI = async () => {
  // Replace with actual get profile API call
  console.log("Getting profile");
  const res = await axios.get("/auth/getprofile");
  return res;
};
