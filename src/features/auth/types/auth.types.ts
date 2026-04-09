// src/features/auth/types/auth.types.ts

export interface AuthUser {
  memberId: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  memberId: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
