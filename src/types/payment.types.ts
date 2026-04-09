export type PlanType = "MONTHLY_990" | "MONTHLY_PRO";

export interface PaymentPrepareRequest {
  planType: PlanType;
}

export interface PaymentPrepareResponse {
  orderId: string;
  orderName: string;
  amount: number;
}
