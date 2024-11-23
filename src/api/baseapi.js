import axios from "axios";


// const API = axios.create({ baseURL: "https://csuite-production.up.railway.app" });
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
 
// user
// export const check = (userdata) => API.post("/api/user");

export const check = (userdata) =>
  API.get("/user/check", {
    params: { email: userdata.email },
  }); 

export const loginCheck = (userdata) => API.post("/user/login", userdata);

export const signupCheck = (userdata, config) =>
  API.post("/user/signup", userdata, config);

export const fetchela = () => API.get("/user/fetchela");

export const fetchUserData = (id) => API.get(`/user/user/${id}`);

export const Elacompleted = (userId, data) =>
  API.put(`/user/${userId}/ela`, data);

export const elaTestScore = (userId, data) =>
  API.put(`/user/updateElaScore/${userId}`, data);


