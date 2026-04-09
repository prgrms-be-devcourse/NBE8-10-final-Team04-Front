export interface AITool {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricing: "무료" | "유료" | "부분 유료";
}
