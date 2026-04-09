import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/features/auth/stores/authStore";

export function useMyPage() {
  const navigate = useNavigate();
  const {user: authUser, clearAuth} = useAuthStore();
  
  const user = authUser;

const membership = user
  ? {
      plan: "Premium",
      remainingMcp: "무제한",
      nextBillingDate: "2026-05-09",
    }
  : null;

  const isSubscribed = membership?.plan === "Premium";

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