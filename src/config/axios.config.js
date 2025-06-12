import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
     headers: {
    "Content-Type": "application/json",
    
  },
    
});
// Attach tokens automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
 
  const orgToken = localStorage.getItem("orgtoken");


  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (orgToken) {
    config.headers["x-org-token"] = orgToken;
  }

  return config;
});