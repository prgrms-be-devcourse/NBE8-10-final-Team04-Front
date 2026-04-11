// src/features/community/hooks/useCommunity.ts
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {communityApi} from "../api/communityApi";
import {toast} from "sonner";

export function useCommunity(postId?: number) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["community", "posts"],
    queryFn: () => communityApi.getPosts(),
  });

  const commentsQuery = useQuery({
    queryKey: ["community", "comments", postId],
    queryFn: () => communityApi.getComments(postId!),
    enabled: !!postId,
  });

  const createCommentMutation = useMutation({
    mutationFn: (payload: {content: string; parentCommentId?: number | null}) =>
      communityApi.createComment(postId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["community", "comments", postId]});
      toast.success("댓글이 작성되었습니다.");
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({commentId, content}: {commentId: number; content: string}) =>
      communityApi.updateComment(postId!, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["community", "comments", postId]});
      toast.success("댓글이 수정되었습니다.");
    },
  });

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
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
}
