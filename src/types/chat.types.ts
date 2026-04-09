// src/types/chat.types.ts
export interface CardData {
  id: number;
  title: string;
  owner: string;
  star: number;
  description: string;
  uploadedAt: string;
  like: number;
  reason: string;
  score: number;
  type: string;
}

export interface TopPickData {
  id: number;
  title: string;
  description: string;
  reason: string;
  score: number;
  howToUse: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string; // 백엔드의 'message' 필드
  createdAt: Date;

  // 백엔드 API 응답용 추가 필드
  cards?: CardData[];
  topPick?: TopPickData;
  nextActions?: string[];
  outOfScope?: boolean;
}
