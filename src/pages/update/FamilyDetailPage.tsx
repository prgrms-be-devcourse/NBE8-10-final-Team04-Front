// src/pages/update/FamilyDetailPage.tsx
import {useParams, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ChevronLeft, Box, ArrowDownUp, Layers} from "lucide-react";
import {vendorApi} from "@/features/vendors/api/vendorApi";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";

export default function FamilyDetailPage() {
  const {familyId} = useParams<{familyId: string}>();
  const navigate = useNavigate();

  // API 데이터 페칭
  const {data: family, isLoading} = useQuery({
    queryKey: ["family", familyId],
    queryFn: () => vendorApi.getFamilyDetail(Number(familyId)),
    enabled: !!familyId,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <PageInner className="py-20 text-center text-slate-400 animate-pulse">
          모델 패밀리 정보를 불러오는 중입니다...
        </PageInner>
      </PageLayout>
    );
  }

  if (!family) {
    return (
      <PageLayout>
        <PageInner className="py-20 text-center text-slate-400">데이터를 찾을 수 없습니다.</PageInner>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="bg-slate-50 min-h-screen pb-20">
      {/* 상단 헤더 배경 */}
      <div className="bg-slate-900 pt-8 pb-12 border-b border-slate-800">
        <PageInner>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 mb-6 -ml-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 목록으로 돌아가기
          </Button>

          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner">
              <Box className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 font-medium mb-1">{family.vendorName}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">{family.familyName}</h1>
            </div>
          </div>
        </PageInner>
      </div>

      {/* 본문 영역 */}
      <PageInner className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🌟 수정 부분: bg-white 클래스 추가하여 배경색을 흰색으로 고정 */}
          {/* 메인 상세 정보 (좌측 넓은 영역) */}
          <Card className="md:col-span-2 p-8 shadow-sm border-slate-200 bg-white">
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">모델 개요</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{family.commonDescription}</p>
          </Card>

          {/* 메타 정보 (우측 좁은 영역) */}
          <div className="space-y-6">
            {/* 🌟 수정 부분: bg-white 클래스 추가하여 배경색을 흰색으로 고정 */}
            <Card className="p-6 shadow-sm border-slate-200 bg-white">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <ArrowDownUp className="w-5 h-5 text-slate-400" /> 입출력 지원 타입
              </h4>

              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Input Types</p>
                <div className="flex flex-wrap gap-2">
                  {family.inputTypes?.map((type, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-mono"
                    >
                      {type}
                    </Badge>
                  )) || <span className="text-sm text-slate-400">정보 없음</span>}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Output Types</p>
                <div className="flex flex-wrap gap-2">
                  {family.outputTypes?.map((type, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-mono"
                    >
                      {type}
                    </Badge>
                  )) || <span className="text-sm text-slate-400">정보 없음</span>}
                </div>
              </div>
            </Card>

            {/* 모델 정보 영역은 대비를 위해 기존의 어두운 배경 유지 */}
            <Card className="p-6 shadow-sm border-slate-200 bg-slate-900 text-white">
              <h4 className="font-bold flex items-center gap-2 mb-4 text-slate-200">
                <Layers className="w-5 h-5 text-slate-400" /> 모델 정보
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">제조사</span>
                  <span className="font-medium">{family.vendorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">등록일</span>
                  <span className="font-medium text-slate-300">{new Date(family.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">최근 업데이트</span>
                  <span className="font-medium text-slate-300">{new Date(family.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageInner>
    </PageLayout>
  );
}
