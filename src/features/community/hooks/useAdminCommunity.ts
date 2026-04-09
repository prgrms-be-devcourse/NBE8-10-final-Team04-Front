import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {adminCommunityApi} from "../api/adminCommunityApi";
import {toast} from "sonner";
import {type PostStatus} from "../types/community.types";

export function useAdminCommunity(statusFilter: PostStatus | "ALL" = "ALL", page = 0) {
  const queryClient = useQueryClient();
  const queryKey = ["admin", "community", "posts", statusFilter, page];

  const postsQuery = useQuery({
    queryKey,
    queryFn: () => adminCommunityApi.getPosts(statusFilter, page),
  });

  const generateMutation = useMutation({
    mutationFn: adminCommunityApi.generatePost,
    onSuccess: () => {
      toast.success("게시글이 성공적으로 자동 생성되었습니다.");
      queryClient.invalidateQueries({queryKey: ["admin", "community", "posts"]});
    },
  });

  // 🌟 업데이트 뮤테이션 타입 변경 (body -> sourceUrl)
  const updateMutation = useMutation({
    mutationFn: ({id, payload}: {id: number; payload: {title: string; summary: string; sourceUrl: string}}) =>
      adminCommunityApi.updatePost(id, payload),
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다.");
      queryClient.invalidateQueries({queryKey: ["admin", "community", "posts"]});
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({id, status}: {id: number; status: PostStatus}) => adminCommunityApi.changeStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`상태가 ${variables.status}로 변경되었습니다.`);
      queryClient.invalidateQueries({queryKey: ["admin", "community", "posts"]});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminCommunityApi.deletePost,
    onSuccess: () => {
      toast.success("게시글이 삭제(HIDDEN) 처리되었습니다.");
      queryClient.invalidateQueries({queryKey: ["admin", "community", "posts"]});
    },
  });

  return {
    posts: postsQuery.data,
    isLoading: postsQuery.isLoading,
    generatePost: generateMutation.mutate,
    updatePost: updateMutation.mutate,
    changeStatus: changeStatusMutation.mutate,
    deletePost: deleteMutation.mutate,
  };
}
