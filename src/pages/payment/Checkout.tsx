// src/pages/payment/Checkout.tsx
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom"; // 🌟 useNavigate 추가
import {loadPaymentWidget} from "@tosspayments/payment-widget-sdk";
import {useQuery} from "@tanstack/react-query";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useAuthStore} from "@/features/auth/stores/authStore";
import {paymentApi} from "@/features/payment/api/paymentApi";
import {useMyPage} from "@/hooks/useMyPage"; // 🌟 구독 훅 추가

const selector = "#payment-widget";
const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate(); // 🌟
  const {user} = useAuthStore();
  const {isSubscribed, isLoading: isSubLoading} = useMyPage(); // 🌟

  // 값을 명시적으로 숫자로 변환하여 안전성 확보
  const selectedPrice = Number(location.state?.price ?? 990);
  const planType = location.state?.planType ?? "MONTHLY_990";

  const [customerKey] = useState(() => {
    if (user?.memberId) return `user_${user.memberId}`;
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    return `anon_${randomSuffix}`;
  });

  const {data: paymentWidget} = usePaymentWidget(clientKey, customerKey);

  const paymentMethodsWidgetRef = useRef<any>(null);
  const isWidgetRendered = useRef(false);

  const [price] = useState(selectedPrice);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

  // 🌟 강제 접근 방지
  useEffect(() => {
    if (!isSubLoading && isSubscribed) {
      alert("이미 구독 중인 회원입니다. 마이페이지로 이동합니다.");
      navigate("/mypage", {replace: true});
    }
  }, [isSubscribed, isSubLoading, navigate]);

  // 1. 위젯 렌더링
  useEffect(() => {
    if (paymentWidget == null || isSubscribed) return; // 🌟 구독 중이면 위젯 렌더링 안 함

    if (isWidgetRendered.current) return;

    try {
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        {value: price},
        {variantKey: "DEFAULT"},
      );

      paymentWidget.renderAgreement("#agreement", {variantKey: "AGREEMENT"});

      paymentMethodsWidget.on("ready", () => {
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
        isPaymentMethodsWidgetReady(true);
      });

      isWidgetRendered.current = true;
    } catch (error) {
      console.error("위젯 초기화 실패:", error);
    }
  }, [paymentWidget, isSubscribed, price]);

  // 2. 금액 업데이트 로직
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) return;

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePayment = async () => {
    try {
      const prepareData = await paymentApi.prepare(planType);

      await paymentWidget?.requestPayment({
        orderId: prepareData.orderId,
        orderName: prepareData.orderName,
        customerName: user?.name || "익명고객",
        customerEmail: user?.email || "",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
      alert("결제 요청 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중이거나 구독 상태면 화면 숨김
  if (isSubLoading || isSubscribed) {
    return (
      <PageLayout className="bg-slate-50 min-h-screen">
        <div /> {/* 빈 요소를 넣어 children 필수 타입 에러 해결 */}
      </PageLayout>
    );
  }

  return (
    <PageLayout className="bg-slate-50 py-12">
      <PageInner className="max-w-2xl">
        <Card className="p-6 md:p-10 border-slate-200 shadow-sm bg-white">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold text-slate-900">결제하기</h2>
            <p className="text-slate-500 mt-2">
              선택한 상품: <strong className="text-blue-600 font-bold">월 {price.toLocaleString()}원</strong> 구독
            </p>
          </div>

          <div id="payment-widget" className="w-full min-h-[200px]" />
          <div id="agreement" className="w-full mt-4" />

          <Button
            size="lg"
            className="w-full mt-8 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!paymentMethodsWidgetReady}
            onClick={handlePayment}
          >
            {price.toLocaleString()}원 결제하기
          </Button>
        </Card>
      </PageInner>
    </PageLayout>
  );
}

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => loadPaymentWidget(clientKey, customerKey),
    staleTime: Infinity,
  });
}
