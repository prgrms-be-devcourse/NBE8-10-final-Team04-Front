// src/features/mcp/hooks/useMcpTokens.ts
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {mcpApi} from "../api/mcpApi";
import {toast} from "sonner";
import {useAuth} from "@/features/auth/hooks/useAuth"; // 🌟 인증 훅 불러오기

export function useMcpTokens() {
  const queryClient = useQueryClient();
  const queryKey = ["mcp", "tokens"];
  const {isAuthenticated} = useAuth(); // 🌟 로그인 상태 확인 (user 객체가 있다면 !!user 로 체크)

  const tokensQuery = useQuery({
    queryKey,
    queryFn: mcpApi.getTokens,
    enabled: !!isAuthenticated, // 🌟 로그인 상태일 때만 자동 조회 실행!
  });

  const createMutation = useMutation({
    mutationFn: mcpApi.createToken,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey});
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "토큰 발급에 실패했습니다.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: mcpApi.deleteToken,
    onSuccess: () => {
      toast.success("토큰이 폐기되었습니다.");
      queryClient.invalidateQueries({queryKey});
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "토큰 폐기에 실패했습니다.");
    },
  });

  return {
    tokens: tokensQuery.data?.tokens || [],
    isLoading: tokensQuery.isLoading,
    createToken: createMutation.mutateAsync,
    deleteToken: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
