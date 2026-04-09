// src/pages/update/VendorDetailPage.tsx
import {useState, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {ChevronLeft, Link as LinkIcon} from "lucide-react"; // Bookmark, Hexagon 제거
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {useVendors} from "@/features/vendors/hooks/useVendors";
import {useVendorDetail} from "@/features/vendors/hooks/useVendorDetail";

import {FamilyListTab} from "@/features/vendors/components/FamilyListTab";
import {UpdateCommunityTab} from "@/features/vendors/components/UpdateCommunityTab";
import {getVendorIcon} from "@/features/vendors/components/VendorCard"; // 🌟 아이콘 헬퍼 함수 임포트

type TabType = "detail" | "update" | "review";

export default function VendorDetailPage() {
  const {vendorId} = useParams();
  const navigate = useNavigate();

  const {vendors} = useVendors();
  const currentVendor = useMemo(() => {
    return vendors.find((v) => v.id === Number(vendorId));
  }, [vendors, vendorId]);

  const {families, isLoading} = useVendorDetail(vendorId);
  const [activeTab, setActiveTab] = useState<TabType>("detail");

  if (isLoading && !currentVendor) {
    return <div className="p-20 text-center animate-pulse text-slate-500">정보를 불러오는 중입니다...</div>;
  }

  if (!currentVendor) {
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">벤더 정보를 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate("/update")}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <PageLayout className="bg-[#FAFAFA] pt-10 pb-20">
      <PageInner className="max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/update")} className="mb-6 -ml-4 text-slate-500">
          <ChevronLeft className="h-4 w-4 mr-1" /> 목록으로
        </Button>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[800px]">
          {/* 헤더 영역 */}
          <div className="p-8 md:p-10 border-b border-slate-100">
            {/* 🌟 Bookmark 영역 완전히 제거됨 */}
            <div className="flex gap-5 items-center">
              {/* 🌟 둥근 네모 형태의 벤더 아이콘 적용 */}
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm p-1">
                <img
                  src={getVendorIcon(currentVendor.name)}
                  alt={currentVendor.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{currentVendor.name}</h1>
                  {currentVendor.active && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none shadow-none">
                      Active
                    </Badge>
                  )}
                  {currentVendor.deprecated && (
                    <Badge variant="destructive" className="shadow-none">
                      Deprecated
                    </Badge>
                  )}
                </div>

                {currentVendor.officialUrl && (
                  <a
                    href={currentVendor.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 mt-2 transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5 mr-1" />
                    {currentVendor.officialUrl}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="px-8 md:px-10 border-b border-slate-200 flex gap-8">
            <button
              onClick={() => setActiveTab("detail")}
              className={cn(
                "pb-4 text-[15px] font-semibold transition-colors relative",
                activeTab === "detail" ? "text-slate-900" : "text-slate-400 hover:text-slate-600",
              )}
            >
              상세정보
              {activeTab === "detail" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />}
            </button>
            <button
              onClick={() => setActiveTab("update")}
              className={cn(
                "pb-4 text-[15px] font-semibold transition-colors relative",
                activeTab === "update" ? "text-slate-900" : "text-slate-400 hover:text-slate-600",
              )}
            >
              토론
              {activeTab === "update" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />}
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={cn(
                "pb-4 text-[15px] font-semibold transition-colors relative",
                activeTab === "review" ? "text-slate-900" : "text-slate-400 hover:text-slate-600",
              )}
            >
              리뷰
              {activeTab === "review" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />}
            </button>
          </div>

          {/* 탭 콘텐츠 영역 */}
          <div className="p-8 md:p-10 bg-slate-50/50 min-h-[500px]">
            {activeTab === "detail" && <FamilyListTab families={families} />}
            {activeTab === "update" && <UpdateCommunityTab vendorId={vendorId!} />}
            {activeTab === "review" && (
              <div className="py-32 flex flex-col items-center text-slate-400">
                <span className="text-4xl mb-4">💬</span>
                <p>리뷰 기능은 준비 중입니다.</p>
              </div>
            )}
          </div>
        </Card>
      </PageInner>
    </PageLayout>
  );
}
