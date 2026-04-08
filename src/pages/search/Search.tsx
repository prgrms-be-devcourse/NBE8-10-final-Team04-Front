import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

import EmptyState from "@/components/shared/EmptyState";
import ToolCard from "@/components/shared/ToolCard";
import { useSearchTools } from "@/hooks/useSearchTools";
import { motion } from "framer-motion";
import SearchFilterBar from "./components/SearchFilterBar";

export default function Search() {
  const {searchQuery, handleSearchChange, activeCategory, setActiveCategory, filteredTools, categories} =
    useSearchTools();

  return (
    <PageLayout
      title="AI 툴 검색"
      description="전 세계의 다양한 AI 서비스들을 카테고리별로 비교하고 나에게 맞는 툴을 찾아보세요."
    >
      <div className="flex flex-col gap-8">
        {/* 1. 필터 바 컴포넌트 */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* 2. 결과 카운트 */}
        <div className="text-sm font-medium text-slate-500">
          총 <span className="font-bold text-primary">{filteredTools.length}</span>개의 AI 툴이 검색되었습니다.
        </div>

        {/* 3. 그리드 리스트 & 빈 화면 처리 */}
        <motion.section
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {opacity: 0},
            visible: {
              opacity: 1,
              transition: {staggerChildren: 0.05}, // 0.05초 간격으로 자식 요소 등장
            },
          }}
        >
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={{
                hidden: {opacity: 0, y: 20},
                visible: {opacity: 1, y: 0, transition: {duration: 0.4}},
              }}
            >
              <ToolCard tool={tool} onClick={(id) => console.log(`${id}번 상세페이지 이동`)} />
            </motion.div>
          ))}

          {/* 빈 화면(EmptyState)도 유지 */}
          {filteredTools.length === 0 && (
            <EmptyState
              icon={SearchIcon}
              title="검색 결과가 없습니다"
              description={
                <p>
                  입력하신 키워드({searchQuery})와 일치하는 AI 툴을 찾지 못했습니다.
                  <br />
                  다른 검색어나 카테고리를 선택해 보세요.
                </p>
              }
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSearchChange("");
                    setActiveCategory("전체");
                  }}
                >
                  검색 초기화
                </Button>
              }
            />
          )}
        </motion.section>
      </div>
    </PageLayout>
  );
}
