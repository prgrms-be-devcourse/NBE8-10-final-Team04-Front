import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, type PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { useAuthStore } from '@/features/auth/stores/authStore';

const CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_pP2YxJ4K879D1MOyabMWVRGZwXLO';

export function usePayment(price: number) {
  const { user } = useAuthStore();
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);

  // 1. 위젯 초기화
  useEffect(() => {
    if (!user) return;

    const fetchPaymentWidget = async () => {
      try {
        // customerKey는 유저별 고유값이어야 하므로 memberId 활용
        const widget = await loadPaymentWidget(CLIENT_KEY, `user_${user.memberId}`);
        setPaymentWidget(widget);
      } catch (error) {
        console.error('결제 위젯 로드 실패:', error);
      }
    };

    fetchPaymentWidget();
  }, [user]);

  // 2. 결제 수단 렌더링
  useEffect(() => {
    if (paymentWidget == null) return;

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  return {
    paymentWidget,
    user,
  };
}