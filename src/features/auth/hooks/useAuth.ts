// src/features/auth/hooks/useAuth.ts
import {useMutation} from "@tanstack/react-query";
import {useNavigate, useLocation} from "react-router-dom";
import {toast} from "sonner";
import {authApi} from "../api/authApi";
import {useAuthStore} from "../stores/authStore";
import {queryClient} from "@/lib/queryClient";

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const {setAuth, clearAuth, refreshToken} = useAuthStore();

  const from = location.state?.from?.pathname || "/";

  // 1. 로그인
  const loginMutation = useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: (data) => {
      const {accessToken, refreshToken, memberId, name, email, role} = data;
      const user = {memberId, name, email, role};

      setAuth(accessToken, refreshToken, user);

      toast.success(`${name}님 환영합니다!`);
      navigate(from, {replace: true});
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "로그인에 실패했습니다. 관리자에게 문의하세요.";
      toast.error(errorMessage);
    },
  });

  // 2. 로그아웃
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      // 성공이든 실패든 프론트엔드 상태와 캐시는 무조건 초기화
      clearAuth();
      queryClient.clear();
      toast.info("로그아웃 되었습니다.");
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    },
  });

  return {
    loginWithGoogle: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
