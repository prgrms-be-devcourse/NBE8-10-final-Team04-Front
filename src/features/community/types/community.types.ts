export type PostStatus = "PENDING_REVIEW" | "PUBLISHED" | "HIDDEN" | "REJECTED";
export type PostType = "MODEL_INFO" | "GENERAL"; // 명세서 예시 기준

export interface CommunityPost {
  id: number;
  type: PostType;
  title: string;
  summary: string;
  sourceUrl: string;
  status: PostStatus;
  targetDate: string;
  vendorId: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  authorName: string;
  parentId: number | null;
  depth: number;
  content: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostListResponse {
  contents: CommunityPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
