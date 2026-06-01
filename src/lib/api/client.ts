import axios from "axios";
import { env } from "@/config/env";

export const TOKEN_KEY = "amara_token";
export const GOOGLE_SESSION_KEY = "amara_google_session";

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

export const setToken = (token: string) => {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
};

export const api = axios.create({
  baseURL: `${env.apiBaseUrl}/api`,
  headers: { "Content-Type": "application/json" },
});

// (1) Attach JWT to every request automatically.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// (2) Handle expired / invalid token globally.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      clearToken();
      const path = window.location.pathname;
      if (!path.startsWith("/login") && !path.startsWith("/register")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
