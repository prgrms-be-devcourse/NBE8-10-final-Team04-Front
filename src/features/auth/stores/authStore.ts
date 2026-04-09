import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {AuthUser} from "../types/auth.types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 🌟 테스트를 위해 초기값을 null 대신 가짜(Mock) 데이터로 채웁니다.
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
      user: {
        memberId: 1,
        name: "한민희(관리자)", // 사용자 이름
        email: "admin@test.com",
        role: "ADMIN", // 👈 이 값이 있어야 관리자 메뉴가 보입니다
      } as AuthUser,
      isAuthenticated: true, // 🌟 항상 로그인된 상태로 간주합니다.

      setAuth: (accessToken, refreshToken, user) => set({accessToken, refreshToken, user, isAuthenticated: true}),
      clearAuth: () => set({accessToken: null, refreshToken: null, user: null, isAuthenticated: false}),
    }),
    {
      name: "auth-storage",
    },
  ),
);
