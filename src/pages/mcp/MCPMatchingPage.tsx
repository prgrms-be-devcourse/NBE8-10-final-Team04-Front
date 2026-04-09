import {useNavigate} from "react-router-dom";
import {Zap, Target, Layers, ArrowRight, CheckCircle2, Sparkles} from "lucide-react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

export default function MCPMatchingPage() {
  const navigate = useNavigate();

  return (
    <PageLayout className="bg-white">
      {/* 1. Hero Section (강렬한 도입부) */}
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>

        <PageInner className="relative flex flex-col items-center text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm">
            Premium Feature
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl leading-tight">
            당신의 비즈니스에 완벽하게 맞춰진 AI, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              MCP로 완성하세요.
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed">
            단순한 프롬프트를 넘어, Model Context Protocol을 통해
            <br className="hidden md:block" />
            가장 최적화된 AI 모델과 스킬셋을 당신의 작업 환경에 자동으로 세팅합니다.
          </p>
          <Button
            size="lg"
            className="h-14 rounded-full bg-blue-600 px-8 text-base font-bold text-white hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/25"
            onClick={() => navigate("/subscribe")}
          >
            무제한 멤버십 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </PageInner>
      </section>

      {/* 2. Value Proposition (왜 써야 하는가?) */}
      <section className="py-24 bg-slate-50">
        <PageInner>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">왜 MCP 스킬 매칭인가요?</h2>
            <p className="mt-4 text-slate-600">일반적인 AI 사용 경험과 확연히 다른 결과를 제공합니다.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">초개인화된 컨텍스트</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  (설명 영역) 프로젝트의 배경, 목표, 제약사항 등을 깊이 있게 분석하여 마치 사내 전문가처럼 당신의 맥락을
                  100% 이해하는 AI를 구성합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Layers className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">최적의 모델 자동 큐레이션</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  (설명 영역) OpenAI, Anthropic, Google 등 수많은 모델 중 현재 작업에 가장 뛰어난 성능을 낼 수 있는
                  모델과 스킬을 자동으로 매칭합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">압도적인 시간 절약</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  (설명 영역) 어떤 AI를 어떻게 써야 할지 고민할 필요가 없습니다. 클릭 몇 번으로 즉시 실무에 투입 가능한
                  전문가급 AI 워크플로우를 얻으세요.
                </p>
              </CardContent>
            </Card>
          </div>
        </PageInner>
      </section>

      {/* 3. How it Works (진행 방식) */}
      <section className="py-24 bg-white">
        <PageInner className="max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">이렇게 진행됩니다</h2>
            <p className="mt-4 text-slate-600">단 3단계만으로 완벽한 AI 파트너를 만날 수 있습니다.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-2">작업 상황 및 목표 입력</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  [여기에 설명을 작성하세요] 예: 해결하고자 하는 문제나 필요한 산출물의 형태를 자유롭게 입력합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-2">MCP 기반 스킬 매칭 및 분석</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  [여기에 설명을 작성하세요] 예: 입력된 정보를 바탕으로 시스템이 최적의 모델과 플러그인(스킬) 조합을
                  분석합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-bold z-10">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-2">실무 적용 및 지속적인 보정</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  [여기에 설명을 작성하세요] 예: 매칭된 솔루션을 즉시 사용하며, 피드백을 통해 AI의 컨텍스트를 더욱
                  고도화합니다.
                </p>
              </div>
            </div>
          </div>
        </PageInner>
      </section>

      {/* 4. Bottom CTA (결제 유도 배너) */}
      <section className="py-24 bg-white">
        <PageInner>
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">지금 바로 프리미엄을 경험하세요</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" /> 무제한 MCP 스킬 매칭
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" /> 상위 1% 프라이빗 프롬프트 열람
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" /> 광고 없는 쾌적한 AI 챗봇 환경
                </li>
              </ul>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto h-16 px-8 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-transform hover:scale-105"
                onClick={() => navigate("/subscribe")}
              >
                무제한 멤버십 구독하기
              </Button>
              <p className="text-center text-slate-400 text-sm mt-4">언제든 해지 가능합니다.</p>
            </div>
          </div>
        </PageInner>
      </section>
    </PageLayout>
  );
}
