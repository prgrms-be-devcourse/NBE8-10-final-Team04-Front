// src/features/auth/stores/authStore.ts
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
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (accessToken, refreshToken, user) => set({accessToken, refreshToken, user, isAuthenticated: true}),

      clearAuth: () => set({accessToken: null, refreshToken: null, user: null, isAuthenticated: false}),
    }),
    {
      name: "auth-storage",
    },
  ),
);
