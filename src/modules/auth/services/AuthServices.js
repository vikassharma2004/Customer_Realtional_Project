import { axiosInstance as axios } from "../../../config/axios.config";

export const login = async (email, password) => {
    console.log("Logging in with:", { email, password }); 
const res=await axios.post("/auth/signin", { email, password });
return res.data
    // Replace with actual login API call
};
export const register = async (email, password, firstName, lastName, phone) => {
    // Replace with actual registration API call
    console.log("Registering with:", { email, password , firstName, lastName, phone}); 
const res=await axios.post("/auth/signup", { email, password , firstName, lastName, phone});
return res.data
};