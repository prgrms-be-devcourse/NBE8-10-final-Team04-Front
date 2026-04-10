// src/pages/prompt/Prompt.tsx
import {useEffect, useRef} from "react";
import {Search as SearchIcon, FileText, Loader2} from "lucide-react";
import {PageLayout} from "@/components/layout/PageLayout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import PromptCard from "@/components/shared/PromptCard";
import EmptyState from "@/components/shared/EmptyState";
import {usePrompts} from "@/hooks/usePrompts";
import {motion} from "framer-motion";

export default function Prompt() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredPrompts,
    totalElements,
    categories,
    isLoading,
    // 🌟 무한 스크롤을 위한 함수와 상태 가져오기
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePrompts();

  // 🌟 스크롤 감지 센서 역할을 할 텅 빈 요소를 참조하기 위한 ref
  const observerElem = useRef<HTMLDivElement>(null);

  // 🌟 화면에 observerElem 요소가 보이면 다음 페이지를 요청하는 로직
  useEffect(() => {
    const element = observerElem.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 나타났고(isIntersecting), 다음 페이지가 존재하며, 현재 불러오는 중이 아닐 때 요청!
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 0.5}, // 요소가 50% 정도 화면에 보이면 작동
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageLayout
      title="프롬프트 갤러리"
      description="상황에 맞는 최적의 프롬프트를 발견하고 복사하여 AI의 성능을 200% 끌어올려 보세요."
    >
      <div className="flex flex-col gap-8">
        {/* 검색 및 필터 영역 */}
        <section className="space-y-6 rounded-2xl bg-slate-50 p-6 border border-slate-100">
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="프롬프트 제목이나 #태그를 검색해 보세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-full border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full bg-white"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* 결과 카운트 */}
        <div className="text-sm font-medium text-slate-500">
          총 <span className="font-bold text-primary">{totalElements}</span>개의 프롬프트가 있습니다.
        </div>

        {/* 첫 데이터 로딩 중 표시 */}
        {isLoading && filteredPrompts.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* 프롬프트 카드 그리드 */}
            <motion.section
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {opacity: 0},
                visible: {
                  opacity: 1,
                  transition: {staggerChildren: 0.05},
                },
              }}
            >
              {filteredPrompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  variants={{
                    hidden: {opacity: 0, y: 20},
                    visible: {opacity: 1, y: 0, transition: {duration: 0.4}},
                  }}
                >
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))}

              {/* 결과가 없을 경우 */}
              {filteredPrompts.length === 0 && (
                <div className="col-span-1 md:col-span-2">
                  <EmptyState
                    icon={FileText}
                    title="프롬프트를 찾을 수 없습니다"
                    description="검색 조건에 맞는 프롬프트가 없습니다. 다른 키워드로 검색해 보세요."
                    action={
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("전체");
                        }}
                      >
                        초기화
                      </Button>
                    }
                  />
                </div>
              )}
            </motion.section>

            {/* 🌟 무한 스크롤 감지 센서 & 다음 페이지 로딩 인디케이터 */}
            <div ref={observerElem} className="py-8 flex justify-center h-20">
              {isFetchingNextPage && <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
