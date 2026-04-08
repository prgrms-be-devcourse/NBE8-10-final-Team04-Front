import axios from "axios";
import {useAuthStore} from "@/features/auth/stores/authStore";
import {authApi} from "@/features/auth/api/authApi";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {"Content-Type": "application/json"},
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 토큰 재발급 무한 루프 방지를 위한 플래그
let isRefreshing = false;
let failedQueue: Array<{resolve: (value?: unknown) => void; reject: (reason?: any) => void}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const {refreshToken, clearAuth, setTokens} = useAuthStore.getState();

    // 401 에러이고, 재시도한 적이 없으며, 리프레시 토큰이 있는 경우
    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await authApi.refreshToken(refreshToken);
        setTokens(data.accessToken, data.refreshToken);

        originalRequest.headers.Authorization = "Bearer " + data.accessToken;
        processQueue(null, data.accessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
