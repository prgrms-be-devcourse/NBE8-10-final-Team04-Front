export interface AuthUser {
  memberId: number;
  name: string;
  email: string;
  role: string;
}

export interface GoogleLoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
