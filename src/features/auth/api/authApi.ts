// src/features/auth/api/authApi.ts
import {apiClient} from "@/lib/axios";
import type {LoginResponse, RefreshResponse} from "../types/auth.types";
import type {ApiResponse} from "@/types/api.types";

export const authApi = {
  // 1. 구글 로그인
  googleLogin: async (idToken: string): Promise<LoginResponse> => {
    const {data} = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/google/login", {
      idToken,
    });
    return data.data;
  },

  // 2. 토큰 재발급 (인터셉터에서 주로 사용)
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    // 주의: 인터셉터 무한 루프 방지를 위해 apiClient 대신 axios 인스턴스를 새로 만들거나
    // 인터셉터 내부에서 직접 호출하는 것을 권장합니다. (lib/axios.ts 참고)
    const {data} = await apiClient.post<ApiResponse<RefreshResponse>>("/api/v1/auth/token/refresh", {
      refreshToken,
    });
    return data.data;
  },

  // 3. 로그아웃
  logout: async (refreshToken: string): Promise<void> => {
    await apiClient.post("/api/v1/auth/logout", {refreshToken});
  },
};
