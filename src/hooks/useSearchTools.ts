import {useState, useMemo, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

// TODO: API 명세서가 나오면 api.types.ts로 이동할 타입입니다.
export interface AITool {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricing: "무료" | "유료" | "부분 유료";
}

// 화면을 그리기 위한 가짜(Mock) 데이터
const MOCK_TOOLS: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    category: "대화형 AI",
    description:
      "가장 널리 사용되는 범용 대화형 AI 모델입니다. 문서 작성, 코딩, 아이디어 기획 등 다양한 작업에 활용할 수 있습니다.",
    rating: 4.9,
    reviewCount: 1250,
    pricing: "부분 유료",
  },
  {
    id: 2,
    name: "Midjourney",
    category: "이미지 생성",
    description: "디스코드 기반으로 동작하며, 텍스트를 입력하면 극사실적이고 예술적인 고품질 이미지를 생성합니다.",
    rating: 4.8,
    reviewCount: 840,
    pricing: "유료",
  },
  {
    id: 3,
    name: "Claude 3",
    category: "대화형 AI",
    description: "뛰어난 문맥 파악 능력과 자연스러운 한국어 구사력, 코딩 능력을 갖춘 Anthropic의 최신 AI입니다.",
    rating: 4.9,
    reviewCount: 560,
    pricing: "부분 유료",
  },
  {
    id: 4,
    name: "Notion AI",
    category: "생산성",
    description: "노션 워크스페이스에 완벽하게 통합되어 문서 요약, 번역, 초안 작성을 돕는 생산성 보조 도구입니다.",
    rating: 4.5,
    reviewCount: 920,
    pricing: "유료",
  },
  {
    id: 5,
    name: "Suno AI",
    category: "오디오/음악",
    description: "원하는 장르와 분위기, 가사를 프롬프트로 입력하면 전문가 수준의 보컬과 음악을 생성합니다.",
    rating: 4.7,
    reviewCount: 340,
    pricing: "부분 유료",
  },
  {
    id: 6,
    name: "GitHub Copilot",
    category: "개발/코딩",
    description: "개발자의 코딩 컨텍스트를 분석하여 코드를 자동 완성해주고 버그를 찾아주는 AI 페어 프로그래머입니다.",
    rating: 4.8,
    reviewCount: 2100,
    pricing: "유료",
  },
];

export const CATEGORIES = ["전체", "대화형 AI", "이미지 생성", "생산성", "오디오/음악", "개발/코딩"];

export function useSearchTools() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 메인 페이지 등에서 URL 쿼리스트링(?q=키워드)으로 넘어온 값을 초기값으로 사용
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("전체");

  // URL 파라미터가 변경되면 검색어 상태 동기화 (뒤로가기 등 지원)
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // 검색어 입력 핸들러
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // 검색 시 URL 파라미터도 함께 업데이트하여 공유 가능한 링크 생성
    if (value) {
      setSearchParams({q: value});
    } else {
      setSearchParams({});
    }
  };

  // 필터링 로직 (메모이제이션으로 성능 최적화)
  const filteredTools = useMemo(() => {
    return MOCK_TOOLS.filter((tool) => {
      const matchQuery =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = activeCategory === "전체" || tool.category === activeCategory;

      return matchQuery && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return {
    searchQuery,
    handleSearchChange,
    activeCategory,
    setActiveCategory,
    filteredTools,
    categories: CATEGORIES,
  };
}
