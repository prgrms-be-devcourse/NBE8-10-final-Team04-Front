import {apiClient} from "@/lib/axios";
import type {GoogleLoginResponse, TokenRefreshResponse} from "../types/auth.types";
import type {ApiResponse} from "@/types/api.types";

export const authApi = {
  // 1. 구글 로그인
  googleLogin: async (idToken: string) => {
    const {data} = await apiClient.post<ApiResponse<GoogleLoginResponse>>("/api/v1/auth/google/login", {idToken});
    return data.data;
  },

  // 2. 로그아웃
  logout: async (refreshToken: string) => {
    const {data} = await apiClient.post<ApiResponse<null>>("/api/v1/auth/logout", {refreshToken});
    return data.data;
  },

  // 3. 토큰 재발급 (인터셉터에서 주로 사용)
  refreshToken: async (refreshToken: string) => {
    const {data} = await apiClient.post<ApiResponse<TokenRefreshResponse>>("/api/v1/auth/token/refresh", {
      refreshToken,
    });
    return data.data;
  },
};
