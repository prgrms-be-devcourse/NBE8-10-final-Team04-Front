// src/types/prompt.types.ts

export interface SkillListItem {
  id: number;
  name: string;
  category: string;
  tags: string[];
  repositoryName: string;
  repositoryUrl: string;
  summary: string;
  stars: number;
  forks: number;
}

export interface SkillDetail extends SkillListItem {
  contentMd: string; // 상세 조회 시에만 반환되는 마크다운 본문
}

// Spring Boot Page<T> 공통 응답 구조
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}