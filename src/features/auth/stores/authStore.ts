import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {AuthUser} from "../types/auth.types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setAuth: (accessToken, refreshToken, user) => set({accessToken, refreshToken, user, isAuthenticated: true}),
      setTokens: (accessToken, refreshToken) => set({accessToken, refreshToken}),
      clearAuth: () => set({accessToken: null, refreshToken: null, user: null, isAuthenticated: false}),
    }),
    {
      name: "auth-storage",
      // 보안상 로컬스토리지에는 최소한의 정보만 저장 (실무에서는 토큰은 쿠키로 빼는 것을 권장)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
