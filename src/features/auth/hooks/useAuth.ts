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

  // 1. 로그인 (구글 idToken 받아서 백엔드로 전송)
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

  // 2. 로그아웃 (백엔드 세션 종료 및 프론트 상태 초기화)
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      // 성공이든 실패든 클라이언트의 상태와 캐시는 무조건 날림
      clearAuth();
      queryClient.clear();
      toast.info("로그아웃 되었습니다.");
      navigate("/");
    },
  });

  return {
    loginWithGoogle: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
