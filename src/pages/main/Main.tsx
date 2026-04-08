import {Search, Box, Sparkles, MessageSquare} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {PageInner} from "@/components/layout/PageLayout";
import {useMainSearch} from "@/hooks/useMainSearch";

export default function Main() {
  // Headless 패턴: 로직은 hook에서 가져오고 렌더링에만 집중합니다.
  const {searchQuery, setSearchQuery, handleSearch} = useMainSearch();

  return (
    <div className="flex w-full flex-col min-h-[calc(100vh-140px)]">
      {/* 1. Hero / Search Section (어두운 배경) */}
      <section className="w-full bg-[#0B1120] py-24 md:py-32 flex justify-center text-white">
        <PageInner className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">나에게 딱 맞는 AI 툴,</h1>
          <h2 className="mb-10 text-3xl font-bold text-slate-300 md:text-4xl">지금 바로 찾아보세요</h2>

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-3xl items-center gap-2 rounded-full bg-white p-2 shadow-xl"
          >
            <Search className="ml-4 h-6 w-6 shrink-0 text-slate-400" />
            <Input
              type="text"
              placeholder="어떤 AI 툴을 찾으시나요?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent px-2 text-lg text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="lg" className="rounded-full bg-slate-900 px-8 text-base hover:bg-slate-800">
              검색
            </Button>
          </form>
        </PageInner>
      </section>

      {/* 2. Features Cards Section (밝은 배경) */}
      <section className="flex-1 w-full bg-slate-50 py-20">
        <PageInner>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Box className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">AI 툴 비교</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  다양한 AI 툴의 성능과 가격을 한눈에 비교하고, 내 작업에 가장 잘 맞는 도구를 선택하세요.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">맞춤형 프롬프트</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  상황에 맞는 최적의 프롬프트를 추천받아 AI의 성능을 200% 끌어올려 보세요.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">AI 챗봇</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  궁금한 점을 AI 챗봇에게 바로 물어보세요. 실시간으로 정확한 답변을 제공합니다.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </PageInner>
      </section>
    </div>
  );
}
