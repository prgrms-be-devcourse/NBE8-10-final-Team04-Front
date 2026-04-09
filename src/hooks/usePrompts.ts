// src/hooks/usePrompts.ts
import {useState, useEffect} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {apiClient} from "@/lib/axios";
import {type PageResponse, type SkillListItem} from "@/types/prompt.types";

// src/hooks/usePrompts.ts
export const PROMPT_CATEGORIES = [
  "전체", 
  "프론트엔드", 
  "백엔드", 
  "데이터/AI", 
  "데브옵스", 
  "인프라", 
  "보안", 
  "QA"
];

const CATEGORY_ENUM_MAP: Record<string, string> = {
  "프론트엔드": "FRONTEND",
  "백엔드": "BACKEND",
  "데이터/AI": "DATA_AI",
  "데브옵스": "DEVOPS",
  "인프라": "INFRA",
  "보안": "SECURITY",
  "QA": "TESTING_QA",
};

export function usePrompts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  // 디바운스: 타자 치는 동안 API 호출 대기 (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 🌟 무한 스크롤 쿼리 (useInfiniteQuery)
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery({
    queryKey: ["prompts", debouncedQuery, activeCategory],
    initialPageParam: 0, // 첫 페이지 번호
    queryFn: async ({pageParam = 0}) => {
      if (debouncedQuery.trim()) {
        // 검색 API 호출
        const {data} = await apiClient.get<PageResponse<SkillListItem>>("/api/v1/prompts/skills/search", {
          params: {query: debouncedQuery, page: pageParam, size: 10},
        });
        return data;
      } else {
        // 일반 목록/카테고리 API 호출
        const params: any = {page: pageParam, size: 10};
        if (activeCategory !== "전체") {
          params.category = CATEGORY_ENUM_MAP[activeCategory];
        }
        const {data} = await apiClient.get<PageResponse<SkillListItem>>("/api/v1/prompts/skills", {
          params,
        });
        return data;
      }
    },
    // 다음 페이지가 있는지 판단 (현재 페이지 번호가 총 페이지-1 보다 작으면 다음 페이지 존재)
    getNextPageParam: (lastPage) => {
      return lastPage.number < lastPage.totalPages - 1 ? lastPage.number + 1 : undefined;
    },
  });

  // 🌟 여러 페이지의 데이터 배열을 하나의 1차원 배열로 평탄화(Flatten)
  const filteredPrompts = data?.pages.flatMap((page) => page.content) || [];
  const totalElements = data?.pages[0]?.totalElements || 0;

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredPrompts,
    totalElements,
    categories: PROMPT_CATEGORIES,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
