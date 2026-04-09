// src/lib/axios.ts
import axios, {type InternalAxiosRequestConfig} from "axios";
import {useAuthStore} from "@/features/auth/stores/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {"Content-Type": "application/json"},
});

// 인터셉터용 커스텀 타입 (재시도 여부 플래그)
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Request: 매 요청마다 Zustand에서 Access Token을 꺼내 헤더에 주입
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: 401(Unauthorized) 에러 발생 시 리프레시 로직 수행
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러이고, 아직 재시도를 안 한 요청이라면
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const {refreshToken, user, setAuth, clearAuth} = useAuthStore.getState();

      if (refreshToken && user) {
        try {
          // ⚠️ 무한 루프 방지를 위해 apiClient 대신 기본 axios를 사용하여 리프레시 요청
          const {data} = await axios.post(`${apiClient.defaults.baseURL}/api/v1/auth/token/refresh`, {
            refreshToken,
          });

          const newAccessToken = data.data.accessToken;
          const newRefreshToken = data.data.refreshToken;

          // Zustand 스토어 업데이트
          setAuth(newAccessToken, newRefreshToken, user);

          // 원래 실패했던 요청의 헤더에 새 토큰을 꽂고 다시 요청 (사용자는 에러를 눈치채지 못함)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // 리프레시 토큰마저 만료/유효하지 않다면 강제 로그아웃
          clearAuth();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // 리프레시 토큰이 없으면 그냥 로그아웃
        clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
