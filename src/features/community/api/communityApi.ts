import {apiClient} from "@/lib/axios";
import {type ApiResponse} from "@/types/api.types";
import {type CommunityPost, type Comment, type PostListResponse} from "../types/community.types";

export const communityApi = {
  // 게시글 목록 조회
  getPosts: async (page = 0, size = 10) => {
    const {data} = await apiClient.get<ApiResponse<PostListResponse>>("/api/v1/community/posts", {
      params: {page, size, sort: "publishedAt,desc"},
    });
    return data.data;
  },

  // 게시글 상세 조회
  getPostDetail: async (postId: number) => {
    const {data} = await apiClient.get<ApiResponse<CommunityPost>>(`/api/v1/community/posts/${postId}`);
    return data.data;
  },

  // 댓글 목록 조회
  getComments: async (postId: number) => {
    const {data} = await apiClient.get<ApiResponse<Comment[]>>(`/api/v1/community/posts/${postId}/comments`);
    return data.data;
  },

  // 댓글 작성
  createComment: async (postId: number, payload: {content: string; parentCommentId?: number | null}) => {
    const {data} = await apiClient.post<ApiResponse<any>>(`/api/v1/community/posts/${postId}/comments`, payload);
    return data.data;
  },

  // 댓글 수정
  updateComment: async (postId: number, commentId: number, content: string) => {
    const {data} = await apiClient.put(`/api/v1/community/posts/${postId}/comments/${commentId}`, {content});
    return data.data;
  },

  // 댓글 삭제
  deleteComment: async (postId: number, commentId: number) => {
    await apiClient.delete(`/api/v1/community/posts/${postId}/comments/${commentId}`);
  },
};
