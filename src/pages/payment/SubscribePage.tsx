// src/pages/payment/SubscribePage.tsx
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Sparkles, CheckCircle2} from "lucide-react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useMyPage} from "@/hooks/useMyPage"; // 🌟 마이페이지에서 만든 훅 재사용

export default function SubscribePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("MONTHLY_990");
  const {isSubscribed, isLoading} = useMyPage(); // 🌟 구독 상태 가져오기

  const handleSubscribe = () => {
    navigate("/checkout", {
      state: {planType: selectedPlan, price: 990},
    });
  };

  return (
    <PageLayout className="bg-slate-50 pt-20 pb-32 min-h-[calc(100vh-72px)]">
      <PageInner className="max-w-3xl flex flex-col items-center">
        {/* 🌟 이미 구독 중일 때 보여줄 화면 */}
        {isLoading ? (
          <div className="py-20 text-slate-500">구독 정보를 확인 중입니다...</div>
        ) : isSubscribed ? (
          <Card className="w-full max-w-md p-10 text-center border-slate-200 shadow-md">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">이미 멤버십 이용 중입니다</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              고객님은 현재 Premium 멤버십 혜택을 받고 계십니다.
              <br />
              멤버십 관리 및 해지는 마이페이지에서 가능합니다.
            </p>
            <Button
              size="lg"
              className="w-full h-12 font-bold text-white bg-slate-900 hover:bg-slate-800"
              onClick={() => navigate("/mypage")}
            >
              마이페이지로 이동하기
            </Button>
          </Card>
        ) : (
          /* 🌟 기존 결제 선택 화면 (구독 중이 아닐 때만 노출) */
          <>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">Premium</Badge>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">무제한 멤버십으로 업그레이드</h2>
              <p className="text-slate-600">MCP 맞춤 매칭부터 고급 프롬프트까지, 모든 기능을 제한 없이 누리세요.</p>
            </div>

            <Card
              className={cn(
                "w-full max-w-md p-8 border-2 transition-all cursor-pointer bg-white relative overflow-hidden",
                selectedPlan === "MONTHLY_990" ? "border-blue-500 shadow-lg shadow-blue-500/10" : "border-slate-200",
              )}
              onClick={() => setSelectedPlan("MONTHLY_990")}
            >
              {selectedPlan === "MONTHLY_990" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  BEST
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" /> PRO 플랜
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">월 정기구독</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900">₩990</span>
                  <span className="text-sm text-slate-500"> / 월</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" /> 무제한 MCP 스킬 매칭
                </li>
              </ul>

              <Button
                size="lg"
                className="w-full h-14 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleSubscribe}
              >
                결제 진행하기
              </Button>
            </Card>
          </>
        )}
      </PageInner>
    </PageLayout>
  );
}

// 뱃지용 임시 헬퍼
function Badge({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}
