import {Send, Sparkles} from "lucide-react";
import {PageLayout} from "@/components/layout/PageLayout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

import ChatBubble from "./components/ChatBubble";
import {useChatbot} from "@/hooks/useChatbot";

export default function Chatbot() {
  const {messages, input, setInput, isTyping, messagesEndRef, handleSendMessage} = useChatbot();

  return (
    <PageLayout title="AI 챗봇" description="RefHub 전용 AI 어시스턴트와 대화하며 최적의 도구와 해결책을 찾아보세요.">
      {/* 채팅창 컨테이너 (고정 높이 700px, 내부 스크롤) */}
      <Card className="flex flex-col h-[700px] overflow-hidden border-slate-200 shadow-md">
        {/* 1. 대화 내역 영역 */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 scrollbar-hide">
          <div className="mx-auto flex max-w-4xl flex-col space-y-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {/* AI 타이핑 로딩 인디케이터 */}
            {isTyping && (
              <div className="flex w-full justify-start p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></div>
                </div>
              </div>
            )}

            {/* 자동 스크롤을 위한 더미 요소 */}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* 2. 입력창 영역 */}
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSendMessage} className="mx-auto flex max-w-4xl items-center gap-2">
            <Input
              type="text"
              placeholder="AI에게 무엇이든 물어보세요... (Enter로 전송)"
              className="h-14 flex-1 rounded-full border-slate-300 bg-slate-50 px-6 text-base focus-visible:ring-primary shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="h-14 w-14 rounded-full shadow-md transition-transform active:scale-95"
            >
              <Send className="h-5 w-5 ml-1" />
            </Button>
          </form>
        </div>
      </Card>
    </PageLayout>
  );
}
