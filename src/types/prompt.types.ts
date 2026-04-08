export interface AIPrompt {
  id: number;
  title: string;
  content: string; // 실제 복사할 프롬프트 내용
  category: string;
  author: string;
  likes: number;
  usageCount: number;
  tags: string[];
}
