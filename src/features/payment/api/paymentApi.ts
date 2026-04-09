import {apiClient} from "@/lib/axios";

export const paymentApi = {
  // 1. 결제 준비 (서버에서 orderId, orderName 발급)
  prepare: async (planType: string) => {
    // 백엔드가 ApiResponse 래퍼를 쓰지 않고 DTO를 바로 반환하므로 data를 그대로 반환합니다.
    const {data} = await apiClient.post("/api/payments/prepare", {planType});
    return data;
  },

  // 2. 결제 최종 승인
  confirm: async (payload: {paymentKey: string; orderId: string; amount: number}) => {
    const {data} = await apiClient.post("/api/payments/confirm", payload);
    return data;
  },
};
