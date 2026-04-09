import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {communityApi} from "../api/communityApi";
import {toast} from "sonner";

export function useCommunity(postId?: number) {
  const queryClient = useQueryClient();

  // 게시글 목록 (Vendor 상세 페이지에서 해당 Vendor의 글만 필터링해야 할 경우 활용)
  const postsQuery = useQuery({
    queryKey: ["community", "posts"],
    queryFn: () => communityApi.getPosts(),
  });

  // 댓글 목록 조회
  const commentsQuery = useQuery({
    queryKey: ["community", "comments", postId],
    queryFn: () => communityApi.getComments(postId!),
    enabled: !!postId,
  });

  // 댓글 작성 Mutation
  const createCommentMutation = useMutation({
    mutationFn: (payload: {content: string; parentCommentId?: number | null}) =>
      communityApi.createComment(postId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["community", "comments", postId]});
      toast.success("댓글이 작성되었습니다.");
    },
  });

  // 댓글 삭제 Mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => communityApi.deleteComment(postId!, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["community", "comments", postId]});
      toast.info("댓글이 삭제되었습니다.");
    },
  });

  return {
    posts: postsQuery.data,
    comments: commentsQuery.data,
    isLoading: postsQuery.isLoading || commentsQuery.isLoading,
    createComment: createCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
}
