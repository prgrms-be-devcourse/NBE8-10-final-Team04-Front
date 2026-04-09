import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Sparkles, CheckCircle2} from "lucide-react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

export default function SubscribePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("MONTHLY_990");

  const handleSubscribe = () => {
    navigate("/checkout", {
      state: {planType: selectedPlan, price: 990},
    });
  };

  return (
    <PageLayout className="bg-slate-50 pt-20 pb-32">
      <PageInner className="max-w-3xl flex flex-col items-center">
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
            // ✅ text-white 클래스 추가
            className="w-full h-14 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleSubscribe}
          >
            결제 진행하기
          </Button>
        </Card>
      </PageInner>
    </PageLayout>
  );
}

// 뱃지용 임시 헬퍼 (import Badge가 안 되어 있을 경우 대비)
function Badge({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}
