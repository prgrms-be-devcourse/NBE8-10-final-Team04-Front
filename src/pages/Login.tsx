import {useNavigate, useLocation} from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {authApi} from "@/features/auth/api/authApi";
import {useAuthStore} from "@/features/auth/stores/authStore";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const from = location.state?.from?.pathname || "/";

  // 구글 팝업 로그인 훅
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 구글에서 받은 idToken 대신, access_token을 사용하여 백엔드로 전송하거나,
        // 현재 @react-oauth/google의 기본 흐름은 access_token 반환입니다.
        // 백엔드 명세가 idToken을 요구하므로 암시적 흐름(implicit flow)이 아닌
        // OIDC 흐름으로 id_token을 받아와야 할 수 있습니다.
        // (단, 라이브러리 기본값으로 access_token이 넘어오면 백엔드 수정 혹은 구글 설정 확인 필요)
        // 여기서는 명세서대로 idToken(구글 access 토큰 임시 사용)을 보냅니다.
        const res = await authApi.googleLogin(tokenResponse.access_token);

        setAuth(res.accessToken, res.refreshToken, {
          memberId: res.memberId,
          name: res.name,
          email: res.email,
          role: res.role,
        });

        toast.success(`${res.name}님 환영합니다!`);
        navigate(from, {replace: true});
      } catch (error) {
        toast.error("로그인에 실패했습니다. 관리자에게 문의하세요.");
      }
    },
    onError: () => {
      toast.error("구글 로그인 팝업이 닫혔거나 오류가 발생했습니다.");
    },
  });

  return (
    <div className="container mx-auto flex h-[calc(100vh-200px)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">RefHub 시작하기</CardTitle>
          <CardDescription>구글 계정으로 간편하게 로그인하고 모든 AI 툴을 탐색하세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8 pt-4">
          <Button variant="outline" className="w-full h-12 text-base font-medium" onClick={() => login()}>
            {/* SVG 구글 로고 */}
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 계속하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
