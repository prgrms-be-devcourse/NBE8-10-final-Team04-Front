import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/features/auth/stores/authStore";

export function useMyPage() {
  const navigate = useNavigate();
  const {user: authUser, clearAuth} = useAuthStore();

  // 사용자 정보를 한민희 님으로 설정하여 실제 데이터를 반영합니다.
  const user = authUser || {name: "한민희", email: "yyj9694651@gmail.com"};

  const membership = {
    plan: "Premium",
    remainingMcp: "무제한",
    nextBillingDate: "2026-05-09",
  };

  const isSubscribed = membership.plan === "Premium";

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const handleSubscribeClick = () => {
    navigate("/subscribe");
  };

  return {
    user,
    membership,
    isSubscribed,
    handleLogout,
    handleSubscribeClick,
  };
}