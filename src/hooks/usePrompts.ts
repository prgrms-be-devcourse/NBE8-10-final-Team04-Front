import {useState, useMemo} from "react";
import {type AIPrompt} from "@/types/prompt.types";

// TODO: API 연동 시 제거될 Mock 데이터
const MOCK_PROMPTS: AIPrompt[] = [
  {
    id: 1,
    title: "블로그 포스팅 자동 생성기",
    content:
      "당신은 10년 차 전문 SEO 카피라이터입니다. 다음 [주제]에 대해 검색 엔진에 최적화된 블로그 포스팅을 작성해 주세요. 서론, 본론(3가지 소주제), 결론의 구조를 갖추고, 친근한 ~해요 체를 사용하세요. [주제]: ",
    category: "마케팅/글쓰기",
    author: "SEO마스터",
    likes: 342,
    usageCount: 1205,
    tags: ["블로그", "SEO", "카피라이팅"],
  },
  {
    id: 2,
    title: "주니어 개발자를 위한 코드 리뷰어",
    content:
      "당신은 구글의 시니어 소프트웨어 엔지니어입니다. 아래 작성된 코드를 리뷰해 주세요. 1) 보안 취약점 2) 성능 개선 여지 3) 클린 코드 관점에서의 아키텍처 개선점을 리스트업하고, 개선된 코드 예시를 함께 제공해 주세요. [코드]: ",
    category: "개발/코딩",
    author: "테크리드",
    likes: 890,
    usageCount: 3400,
    tags: ["코드리뷰", "리팩터링", "개발"],
  },
  {
    id: 3,
    title: "영어 회화 롤플레잉 파트너",
    content:
      "지금부터 우리는 뉴욕의 한 카페에서 만난 친구 상황극을 할 것입니다. 당신은 원어민 친구 역할을 맡아 저에게 먼저 영어로 말을 걸어주세요. 제 대답에 문법적 오류가 있다면 대화를 이어가기 전에 부드럽게 교정해 주고 다음 대화를 진행하세요.",
    category: "학습/교육",
    author: "EnglishTutor",
    likes: 512,
    usageCount: 2100,
    tags: ["영어회화", "롤플레잉", "어학"],
  },
  {
    id: 4,
    title: "미드저니 극사실주의 인물 사진",
    content:
      "Portrait photo of a young woman standing in neon-lit tokyo street, cyberpunk aesthetic, rainy night, reflections on wet pavement, shot on 85mm lens, f/1.4, highly detailed, 8k resolution, cinematic lighting --ar 16:9 --v 6.0",
    category: "이미지 생성",
    author: "AI포토그래퍼",
    likes: 1250,
    usageCount: 8900,
    tags: ["미드저니", "사진", "사이버펑크"],
  },
];

export const PROMPT_CATEGORIES = ["전체", "마케팅/글쓰기", "개발/코딩", "학습/교육", "이미지 생성", "업무 자동화"];

export function usePrompts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  // 필터링 로직 메모이제이션
  const filteredPrompts = useMemo(() => {
    return MOCK_PROMPTS.filter((prompt) => {
      const matchQuery =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = activeCategory === "전체" || prompt.category === activeCategory;

      return matchQuery && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredPrompts,
    categories: PROMPT_CATEGORIES,
  };
}
