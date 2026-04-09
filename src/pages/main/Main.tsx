import {Layers, Zap, CreditCard, Sparkles, MessageSquare} from "lucide-react";
import {useNavigate} from "react-router-dom";

// ✅ 우리가 기존에 세팅해둔 shadcn/ui 컴포넌트들을 정확히 가져옵니다.
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {PageInner} from "@/components/layout/PageLayout";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col min-h-[calc(100vh-140px)]">
      {/* 1. Hero Section */}
      <section className="w-full bg-[#0B1120] py-24 md:py-32 flex justify-center text-white">
        <PageInner className="flex flex-col items-center text-center">
          {/* ✅ 임시 뱃지가 아닌 UI 폴더의 진짜 Badge 컴포넌트 사용 */}
          <Badge
            variant="outline"
            className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm font-medium"
          >
            Next-Gen AI Hub
          </Badge>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl leading-tight">
            나에게 딱 맞는 AI 모델,
            <br />
            <span className="text-blue-400">start-ai-io</span>에서 찾으세요
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">
            복잡한 AI 생태계에서 당신의 비즈니스와 작업 환경에 최적화된 스킬을 <br className="hidden md:block" />
            MCP(Model Context Protocol) 기술로 정교하게 매칭해 드립니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="h-14 rounded-full bg-blue-600 px-8 text-base font-bold hover:bg-blue-700"
              onClick={() => navigate("/mcp")}
            >
              지금 시작하기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white px-8 text-base"
              onClick={() => navigate("/prompt")}
            >
              프롬프트 갤러리
            </Button>
          </div>
        </PageInner>
      </section>

      {/* 2. Key Features Section */}
      <section className="flex-1 w-full bg-slate-50 py-24">
        <PageInner>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">핵심 기능 소개</h2>
            <p className="mt-4 text-slate-600">더 스마트한 AI 활용을 위한 start-ai-io만의 차별점입니다.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* ✅ ToolCard/PromptCard와 완벽하게 동일한 스타일(border-slate-200, hover:border-primary/50 등) 적용 */}
            <Card className="flex flex-col h-full border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Layers className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">벤더별 라인업 탐색</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-[15px] leading-relaxed text-slate-600">
                  OpenAI, Google, Anthropic 등 글로벌 리더들의 모델을 벤더별 패밀리 단위로 한눈에 확인하세요.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">MCP 최적 스킬 매칭</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-[15px] leading-relaxed text-slate-600">
                  MCP를 활용해 내 상황에 딱 맞는 스킬을 찾고, 실제 환경에 맞게 매칭 결과를 세밀하게 보정합니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <CreditCard className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">부담 없는 멤버십</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-[15px] leading-relaxed text-slate-600">
                  한 달 3회 무료 매칭 서비스를 제공하며, 멤버십으로 모든 프리미엄 기능을 무제한으로 누리세요.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* ✅ 하단 추가 섹션도 Card 컴포넌트를 사용하여 전체적인 통일감 부여 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-row items-start gap-5 p-6 border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <Sparkles className="h-8 w-8 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1.5">맞춤형 프롬프트</h4>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  최적화된 프롬프트를 추천받아 AI의 성능을 200% 더 효율적으로 활용해 보세요.
                </p>
              </div>
            </Card>

            <Card className="flex flex-row items-start gap-5 p-6 border border-slate-200 bg-white shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <MessageSquare className="h-8 w-8 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1.5">AI 챗봇 가이드</h4>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  궁금한 모델이나 스킬 활용법은 전용 AI 챗봇에게 실시간으로 질문하고 해결하세요.
                </p>
              </div>
            </Card>
          </div>
        </PageInner>
      </section>
    </div>
  );
}
