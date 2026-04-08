import {Bot, User} from "lucide-react";
import {type ChatMessage} from "@/types/chat.types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({message}: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full gap-4 p-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI 프로필 아이콘 (왼쪽) */}
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-6 w-6" />
        </div>
      )}

      {/* 말풍선 본문 */}
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
        }`}
      >
        {message.content}
      </div>

      {/* 유저 프로필 아이콘 (오른쪽) */}
      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
          <User className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
