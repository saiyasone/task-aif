import { setSession } from "@/hook/useSession";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:3000";
const accessToken = localStorage.getItem("accessToken");
const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // Always get the latest token from localStorage
    const latestToken = localStorage.getItem("accessToken");
    if (latestToken) {
      config.headers["Authorization"] = `Bearer ${latestToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 403 &&
      originalRequest &&
      !(originalRequest as any)._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      (originalRequest as any)._retry = true;
      try {
        const refreshRes = await httpClient.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = await refreshRes.data.data;
        setSession(newAccessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpClient.request(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh failed, redirect to login");
        // Clear session and redirect to login to break the loop
        setSession("");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
