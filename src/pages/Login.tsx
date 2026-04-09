// src/pages/Login.tsx
import {GoogleLogin} from "@react-oauth/google";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {toast} from "sonner";

export default function Login() {
  const {loginWithGoogle, isLoggingIn} = useAuth();

  return (
    <div className="container mx-auto flex h-[calc(100vh-200px)] items-center justify-center px-4">
      <Card className="w-full max-w-md border-slate-200 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">start-ai-io 시작하기</CardTitle>
          <CardDescription className="text-slate-500">
            구글 계정으로 간편하게 로그인하고 모든 AI 툴을 탐색하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center pb-8 pt-4">
          <div className="w-full flex justify-center h-12">
            {/* 공식 구글 로그인 버튼: credential이 바로 백엔드가 원하는 JWT idToken 입니다. */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  loginWithGoogle(credentialResponse.credential);
                }
              }}
              onError={() => {
                toast.error("로그인에 실패했습니다. 관리자에게 문의하세요.");
              }}
              useOneTap={false}
              auto_select={false}
              theme="outline"
              size="large"
              width="320"
              shape="pill"
            />
          </div>

          {isLoggingIn && (
            <p className="mt-6 text-sm font-medium text-slate-500 animate-pulse">로그인 처리 중입니다...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
