// src/lib/axios.ts
import axios, {type InternalAxiosRequestConfig} from "axios";
import {useAuthStore} from "@/features/auth/stores/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {"Content-Type": "application/json"},
});

// 재시도 여부 플래그를 위한 커스텀 타입
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Request Interceptor: 헤더에 토큰 주입
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: 401 에러 시 토큰 재발급
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러이고, 재시도한 적이 없는 요청일 경우
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const {refreshToken, user, setAuth, clearAuth} = useAuthStore.getState();

      if (refreshToken && user) {
        try {
          // 🌟 무한 루프 방지를 위해 apiClient 대신 axios 사용
          const response = await axios.post(`${apiClient.defaults.baseURL}/api/v1/auth/token/refresh`, {
            refreshToken,
          });

          // 🌟 백엔드 ApiResponse 구조에 맞춰 data.data에서 토큰 추출
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          // Zustand 스토어 업데이트
          setAuth(newAccessToken, newRefreshToken, user);

          // 실패했던 기존 요청의 헤더를 새 토큰으로 교체 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // 리프레시 토큰 갱신마저 실패하면 강제 로그아웃
          clearAuth();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // 리프레시 토큰이 아예 없는 경우
        clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
