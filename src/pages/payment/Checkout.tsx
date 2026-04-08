import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {loadPaymentWidget} from "@tosspayments/payment-widget-sdk";
import {useQuery} from "@tanstack/react-query";

const selector = "#payment-widget";

const clientKey = "test_ck_pP2YxJ4K879D1MOyabMWVRGZwXLO";
const customerKey = "heo_dong_bin_test_123";

// ✅ export default 추가
export default function CheckoutPage() {
  const location = useLocation();

  const selectedPrice = location.state?.price ?? 990;
  const planType = location.state?.planType ?? "MONTHLY_990";

  const {data: paymentWidget} = usePaymentWidget(clientKey, customerKey);

  const paymentMethodsWidgetRef = useRef<any>(null);

  const [price, setPrice] = useState(selectedPrice);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, {value: price}, {variantKey: "DEFAULT"});

    paymentWidget.renderAgreement("#agreement", {variantKey: "AGREEMENT"});

    paymentMethodsWidget.on("ready", () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <h2 style={{marginBottom: "16px"}}>결제하기</h2>
        <p style={{marginBottom: "20px"}}>선택한 상품: 월 {price}원 구독</p>

        <div id="payment-widget" />
        <div id="agreement" />

        <button
          className="button"
          style={{marginTop: "30px"}}
          disabled={!paymentMethodsWidgetReady}
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:8080/api/payments/prepare", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({planType}),
              });

              const prepareData = await response.json();

              await paymentWidget?.requestPayment({
                orderId: prepareData.orderId,
                orderName: prepareData.orderName,
                customerName: "허동빈",
                customerEmail: "mailsky9687@gmail.com",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          월 {price}원 구독 시작하기
        </button>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
