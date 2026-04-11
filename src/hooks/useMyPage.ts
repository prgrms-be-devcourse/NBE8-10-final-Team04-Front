// src/hooks/useMyPage.ts
import {useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuthStore} from "@/features/auth/stores/authStore";
import {paymentApi} from "@/features/payment/api/paymentApi";
import {toast} from "sonner";

export function useMyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {user, clearAuth} = useAuthStore();

  // 구독 상태 조회 API 호출
  const {data: subInfo, isLoading: isSubLoading} = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: paymentApi.getSubscriptionStatus,
    enabled: !!user, // 로그인한 유저만 호출
  });

  // 남은 사용량 조회 API 호출
  const {data: usageCount, isLoading: isUsageLoading} = useQuery({
    queryKey: ["subscriptionUsage"],
    queryFn: paymentApi.getUsage,
    enabled: !!user,
  });

  // 구독 해지 기능
  const cancelMutation = useMutation({
    mutationFn: paymentApi.cancelSubscription,
    onSuccess: (res) => {
      // 서버에서 보내준 알림 메시지 (예: 환불 성공 or 예약 해지)
      toast.success(res.message);
      // 상태 최신화를 위해 다시 조회
      queryClient.invalidateQueries({queryKey: ["subscriptionStatus"]});
      queryClient.invalidateQueries({queryKey: ["subscriptionUsage"]});
    },
    onError: () => {
      toast.error("멤버십 해지 처리 중 오류가 발생했습니다.");
    },
  });

  const isSubscribed = subInfo?.status === "ACTIVE";
  // 구독 중이면 "무제한", 아니면 서버에서 받은 남은 횟수 (기본 0)
  const remainingMcp = isSubscribed ? "무제한" : (usageCount ?? 0);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const handleSubscribeClick = () => {
    navigate("/subscribe");
  };

  return {
    user,
    isSubscribed,
    remainingMcp,
    isLoading: isSubLoading || isUsageLoading,
    isCanceling: cancelMutation.isPending,
    cancelSubscription: cancelMutation.mutate,
    handleLogout,
    handleSubscribeClick,
  };
}
