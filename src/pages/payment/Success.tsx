import {useState, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {CheckCircle} from "lucide-react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {paymentApi} from "@/features/payment/api/paymentApi"; // 🌟 API 임포트

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 백엔드 응답을 저장할 상태 (PaymentConfirmResponse 기준)
  const [responseData, setResponseData] = useState<{
    orderId: string;
    amount: number;
    status: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const requestData = {
      paymentKey: searchParams.get("paymentKey") || "",
      orderId: searchParams.get("orderId") || "",
      amount: Number(searchParams.get("amount")),
    };

    // 파라미터가 없으면 실행 안 함
    if (!requestData.paymentKey || !requestData.orderId) return;

    async function confirmPayment() {
      try {
        // 🌟 커스텀 API를 통해 백엔드에 최종 승인 요청 (토큰 자동 포함)
        const data = await paymentApi.confirm(requestData);
        setResponseData(data);
      } catch (error: any) {
        // 백엔드에서 400 Bad Request 등을 던졌을 때의 에러 핸들링
        const errorMessage = error.response?.data?.message || "결제 승인 중 오류가 발생했습니다.";
        const errorCode = error.response?.data?.code || "CONFIRM_FAILED";
        navigate(`/fail?code=${errorCode}&message=${errorMessage}`);
      }
    }

    confirmPayment();
  }, [searchParams, navigate]);

  return (
    <PageLayout className="bg-slate-50 py-20">
      <PageInner className="max-w-lg">
        <Card className="p-8 md:p-12 text-center border-slate-200 shadow-sm bg-white">
          <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">결제가 완료되었습니다</h2>
          <p className="text-slate-500 mb-10">start-ai-io의 프리미엄 기능을 지금 바로 즐겨보세요!</p>

          <div className="bg-slate-50 p-6 rounded-xl text-left space-y-4 mb-10 border border-slate-100">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-slate-500 font-medium">결제 금액</span>
              <span className="text-lg font-bold text-blue-600">
                {responseData
                  ? responseData.amount.toLocaleString()
                  : Number(searchParams.get("amount")).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">주문 번호</span>
              <span className="text-slate-900 font-medium">
                {responseData ? responseData.orderId : searchParams.get("orderId")}
              </span>
            </div>
            {/* 백엔드에서 보내준 메시지가 있다면 표시 */}
            {responseData && (
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-slate-500">상태</span>
                <span className="text-green-600 font-medium">{responseData.message}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12" onClick={() => navigate("/")}>
              메인으로
            </Button>
            <Button
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/mypage")}
            >
              마이페이지
            </Button>
          </div>
        </Card>
      </PageInner>
    </PageLayout>
  );
}
