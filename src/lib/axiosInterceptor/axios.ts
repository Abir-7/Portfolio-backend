import config from "@/config/config";
import { logout } from "@/service/auth";

import axios from "axios";
import { cookies } from "next/headers";

// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: config.backendApi,
});

// Request interceptor to attach Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies().get("accessToken")?.value;
    if (accessToken) {
      config.headers = config.headers || {}; // Ensure headers object exists
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Forward request errors
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return response if successful
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await logout(); // Perform logout on 401 Unauthorized
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
    }
    return Promise.reject(error); // Forward error for further handling
  }
);

export default axiosInstance;
