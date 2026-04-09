import {apiClient} from "@/lib/axios";
import {type ApiResponse} from "@/types/api.types";
import {type CommunityPost, type PostListResponse, type PostStatus} from "../types/community.types";

export const adminCommunityApi = {
  // 관리자 게시글 목록 조회
  getPosts: async (status?: PostStatus | "ALL", page = 0, size = 20) => {
    const params: any = {page, size, sort: "createdAt,desc"};
    if (status && status !== "ALL") params.status = status;

    const {data} = await apiClient.get<ApiResponse<PostListResponse>>("/api/v1/admin/community/posts", {params});
    return data.data;
  },

  // 게시글 자동 생성
  generatePost: async (payload: {type: string; targetDate: string; vendorId?: number}) => {
    const {data} = await apiClient.post<ApiResponse<CommunityPost>>("/api/v1/admin/community/posts/generate", payload);
    return data.data;
  },

  // 🌟 게시글 수정 (body -> sourceUrl)
  updatePost: async (postId: number, payload: {title: string; summary: string; sourceUrl: string}) => {
    const {data} = await apiClient.put<ApiResponse<CommunityPost>>(`/api/v1/admin/community/posts/${postId}`, payload);
    return data.data;
  },

  // 게시글 상태 변경
  changeStatus: async (postId: number, status: PostStatus) => {
    const {data} = await apiClient.patch<ApiResponse<CommunityPost>>(`/api/v1/admin/community/posts/${postId}/status`, {
      status,
    });
    return data.data;
  },

  // 게시글 삭제 (HIDDEN 처리)
  deletePost: async (postId: number) => {
    await apiClient.delete(`/api/v1/admin/community/posts/${postId}`);
  },
};
