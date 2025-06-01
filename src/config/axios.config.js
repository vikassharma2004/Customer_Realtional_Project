import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://crm-backend-khaki.vercel.app/api",
    withCredentials: true,
     headers: {
    "Content-Type": "application/json",
    
  },
    
});