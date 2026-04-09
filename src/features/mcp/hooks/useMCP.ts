// src/features/mcp/hooks/useMCP.ts
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

export interface MCPResult {
  id: string;
  title: string;
  vendor: string;
  model: string;
  description: string;
  skills: string[];
  matchRate: number;
}

export function useMCP() {
  const [task, setTask] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [result, setResult] = useState<MCPResult | null>(null);

  // 임시 상태: 실제로는 전역 유저 스토어(authStore)나 DB에서 가져와야 합니다.
  const [freeQuota, setFreeQuota] = useState(3);
  const [isPremium] = useState(false); // 프리미엄 유저 여부

  const navigate = useNavigate();

  const handleMatch = () => {
    if (!task.trim()) {
      toast.error("어떤 작업이 필요한지 상황을 입력해주세요.");
      return;
    }

    if (!isPremium && freeQuota <= 0) {
      toast.error("무료 매칭 횟수를 모두 소진했습니다. 무제한 멤버십으로 업그레이드하세요!");
      navigate("/subscribe"); // 결제 안내 페이지로 이동
      return;
    }

    setIsMatching(true);
    setResult(null);

    // AI 매칭 딜레이 시뮬레이션
    setTimeout(() => {
      if (!isPremium) {
        setFreeQuota((prev) => prev - 1);
      }

      setResult({
        id: "mcp-1",
        title: "대규모 데이터 심층 분석 및 시각화 에이전트",
        vendor: "Anthropic",
        model: "Claude 3.5 Sonnet",
        description:
          "입력하신 상황을 분석한 결과, 복잡한 문서 파싱과 맥락 이해에 가장 탁월한 Claude 3.5 기반의 데이터 분석 스킬이 98%의 적합도를 보입니다.",
        skills: ["PDF 파싱", "데이터 클렌징", "차트 생성 프롬프팅"],
        matchRate: 98,
      });

      setIsMatching(false);
      toast.success("최적의 스킬 매칭이 완료되었습니다!");
    }, 2000);
  };

  const handleRefine = () => {
    if (!isPremium && freeQuota <= 0) {
      toast.error("보정 작업에도 횟수가 차감됩니다. 멤버십으로 업그레이드하세요!");
      navigate("/subscribe");
      return;
    }
    toast.info("결과를 더 세밀하게 보정합니다...");
    handleMatch(); // 임시로 매칭 재실행
  };

  return {
    task,
    setTask,
    isMatching,
    result,
    freeQuota,
    isPremium,
    handleMatch,
    handleRefine,
  };
}
