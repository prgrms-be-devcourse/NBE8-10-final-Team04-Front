import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {mcpApi} from "../api/mcpApi";
import {toast} from "sonner";

export function useMcpTokens() {
  const queryClient = useQueryClient();
  const queryKey = ["mcp", "tokens"];

  const tokensQuery = useQuery({
    queryKey,
    queryFn: mcpApi.getTokens,
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
