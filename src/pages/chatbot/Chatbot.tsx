// src/pages/chatbot/Chatbot.tsx
import {Sparkles, ArrowUp} from "lucide-react";
import {PageLayout} from "@/components/layout/PageLayout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

import ChatBubble from "./components/ChatBubble";
import {useChatbot} from "@/hooks/useChatbot";

export default function Chatbot() {
  const {messages, input, setInput, isTyping, scrollRef, handleSendMessage} = useChatbot();

  return (
    <PageLayout
      title="AI 챗봇"
      description="start-ai-io 전용 AI 어시스턴트와 대화하며 최적의 도구와 해결책을 찾아보세요."
    >
      <Card className="flex flex-col h-[700px] overflow-hidden border-slate-200 shadow-md mt-6">
        {/* 대화 내역 영역 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50/50 p-4 scrollbar-hide">
          <div className="mx-auto flex max-w-4xl flex-col space-y-4">
            {messages.map((msg, idx) => (
              <div key={msg.id} className="flex flex-col">
                <ChatBubble message={msg} />

                {/* AI 응답에 nextActions가 있으면 추천 질문 버튼 띄우기 (마지막 메시지일 때만) */}
                {msg.role === "assistant" &&
                  msg.nextActions &&
                  msg.nextActions.length > 0 &&
                  idx === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-14">
                      {msg.nextActions.map((action, actionIdx) => (
                        <button
                          key={actionIdx}
                          onClick={() => handleSendMessage(undefined, action)}
                          className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow-sm"
                          disabled={isTyping}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {isTyping && (
              <div className="flex w-full justify-start p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-300"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 입력창 영역 */}
        <div className="border-t border-slate-200 bg-white p-4 flex flex-col gap-3">
          {/* 폼 영역 */}
          <form onSubmit={handleSendMessage} className="mx-auto flex w-full max-w-4xl items-center gap-2">
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
              className={`h-14 w-14 rounded-full transition-all duration-200 ${
                input.trim() && !isTyping
                  ? "bg-slate-900 text-white shadow-md hover:bg-slate-800 active:scale-95"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="h-6 w-6 stroke-[2.5px]" />
            </Button>
          </form>
        </div>
      </Card>
    </PageLayout>
  );
}
