import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthStore} from "@/features/auth/stores/authStore";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    // (이후 로그인 성공 시 원래 가려던 곳으로 돌아오게 하기 위해 state 전달)
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // 인증된 경우 하위 라우트 렌더링
  return <Outlet />;
}
