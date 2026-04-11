// src/types/payment.types.ts
export type PlanType = "MONTHLY_990" | "MONTHLY_PRO";
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "CANCELED";

export interface PaymentPrepareRequest {
  planType: PlanType;
}

export interface PaymentPrepareResponse {
  orderId: string;
  orderName: string;
  amount: number;
}

export interface SubscriptionStatusResponse {
  status: SubscriptionStatus;
  message: string;
}

export interface SubscriptionCancelResponse {
  message: string;
  nextBillingAt: string | null;
  status: string;
  isRefunded: boolean;
}