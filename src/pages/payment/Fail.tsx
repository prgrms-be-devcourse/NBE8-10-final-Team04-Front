import {useSearchParams, useNavigate} from "react-router-dom";
import {AlertCircle} from "lucide-react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function FailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <PageLayout className="bg-slate-50 py-20">
      <PageInner className="max-w-lg">
        <Card className="p-8 md:p-12 text-center border-slate-200 shadow-sm bg-white">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">결제에 실패했습니다</h2>
          <p className="text-slate-500 mb-10">아래 오류 내용을 확인해 주세요.</p>

          <div className="bg-red-50 p-6 rounded-xl text-left space-y-4 mb-10 border border-red-100">
            <div className="flex flex-col gap-1 pb-4 border-b border-red-200/50">
              <span className="text-red-800/60 font-medium text-sm">에러 메시지</span>
              <span className="text-red-900 font-bold">
                {searchParams.get("message") || "알 수 없는 오류가 발생했습니다."}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-red-800/60 font-medium text-sm">에러 코드</span>
              <span className="text-red-900 text-sm">{searchParams.get("code") || "UNKNOWN_ERROR"}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12" onClick={() => navigate(-1)}>
              이전으로
            </Button>
            {/* 🌟 text-white 추가 */}
            <Button
              className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white"
              onClick={() => navigate("/subscribe")}
            >
              다시 결제하기
            </Button>
          </div>
        </Card>
      </PageInner>
    </PageLayout>
  );
}
