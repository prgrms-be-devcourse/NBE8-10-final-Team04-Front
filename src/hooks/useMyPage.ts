import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/features/auth/stores/authStore";
import {type AITool} from "@/types/tool.types";
import {type AIPrompt} from "@/types/prompt.types";

// TODO: API 연동 시 삭제할 Mock Data
const MOCK_SAVED_TOOLS: AITool[] = [
  {
    id: 1,
    name: "ChatGPT",
    category: "대화형 AI",
    description: "가장 널리 사용되는 범용 대화형 AI 모델입니다.",
    rating: 4.9,
    reviewCount: 1250,
    pricing: "부분 유료",
  },
  {
    id: 4,
    name: "Notion AI",
    category: "생산성",
    description: "노션 워크스페이스에 완벽하게 통합되어 문서 요약, 번역을 돕습니다.",
    rating: 4.5,
    reviewCount: 920,
    pricing: "유료",
  },
];

const MOCK_SAVED_PROMPTS: AIPrompt[] = [
  {
    id: 1,
    title: "블로그 포스팅 자동 생성기",
    content: "당신은 10년 차 전문 SEO 카피라이터입니다...",
    category: "마케팅/글쓰기",
    author: "SEO마스터",
    likes: 342,
    usageCount: 1205,
    tags: ["블로그", "SEO"],
  },
];

export function useMyPage() {
  const navigate = useNavigate();
  const {user, clearAuth} = useAuthStore();

  // 실제 연동 시에는 useQuery를 통해 서버에서 찜한 목록과 결제 상태를 가져옵니다.
  const savedTools = MOCK_SAVED_TOOLS;
  const savedPrompts = MOCK_SAVED_PROMPTS;
  const isSubscribed = true; // 임시 구독 상태

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const handleSubscribeClick = () => {
    navigate("/subscribe");
  };

  return {
    user,
    savedTools,
    savedPrompts,
    isSubscribed,
    handleLogout,
    handleSubscribeClick,
  };
}
