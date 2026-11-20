import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Reuse one refresh request when multiple API requests expire simultaneously.
let refreshPromise = null;

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      request.headers = request.headers || {};
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const shouldRefresh = status === 401 || status === 403;

    if (!shouldRefresh || !originalRequest || originalRequest._retry) {
      return Promise.reject(error?.response?.data ?? error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = getNewTokens().finally(() => {
          refreshPromise = null;
        });
      }

      const refreshResponse = await refreshPromise;
      const accessToken = refreshResponse?.data?.accessToken;

      if (refreshResponse?.status !== 200 || !accessToken) {
        return Promise.reject(error?.response?.data ?? error);
      }

      setCookie("accessToken", accessToken, 30);
      return api(originalRequest);
    } catch {
      return Promise.reject(error?.response?.data ?? error);
    }
  }
);

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");

  if (!refreshToken) return null;

  try {
    // Use base Axios so a refresh failure cannot trigger this interceptor again.
    return await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });
  } catch {
    return null;
  }
};

export default api;
