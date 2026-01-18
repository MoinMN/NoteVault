import axios from "axios";
import * as SecureStore from "expo-secure-store";


const api = axios.create({
  // baseURL: "http://192.168.0.193:4518/api",
  baseURL: "https://notevault-moin-mn.vercel.app/api",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
