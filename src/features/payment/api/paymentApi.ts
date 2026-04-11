// src/features/payment/api/paymentApi.ts
import {apiClient} from "@/lib/axios";
import {type SubscriptionStatusResponse, type SubscriptionCancelResponse} from "@/types/payment.types";

export const paymentApi = {
  // 1. 결제 준비
  prepare: async (planType: string) => {
    const {data} = await apiClient.post("/api/payments/prepare", {planType});
    return data;
  },

  // 2. 결제 최종 승인
  confirm: async (payload: {paymentKey: string; orderId: string; amount: number}) => {
    const {data} = await apiClient.post("/api/payments/confirm", payload);
    return data;
  },

  // 3. 구독 상태 조회
  getSubscriptionStatus: async () => {
    const {data} = await apiClient.get<SubscriptionStatusResponse>("/api/subscriptions/me");
    return data;
  },

  // 4. 남은 무료 사용량 조회
  getUsage: async () => {
    const {data} = await apiClient.get<number>("/api/subscriptions/me/usage");
    return data;
  },

  // 5. 구독 해지 (환불 또는 일반 해지)
  cancelSubscription: async () => {
    const {data} = await apiClient.post<SubscriptionCancelResponse>("/api/subscriptions/me/cancel");
    return data;
  },
};
