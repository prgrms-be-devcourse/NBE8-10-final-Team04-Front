// src/pages/chatbot/components/ChatBubble.tsx
import {Bot, User, AlertCircle, CheckCircle2} from "lucide-react"; // 🌟 사용하지 않는 아이콘(Star, ThumbsUp) 제거
import {useNavigate} from "react-router-dom"; // 🌟 네비게이션 훅 추가
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {type ChatMessage} from "@/types/chat.types";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({message}: ChatBubbleProps) {
  const isUser = message.role === "user";
  const navigate = useNavigate(); // 🌟 네비게이션 인스턴스 생성

  return (
    <div className={`flex w-full gap-4 p-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI 프로필 */}
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Bot className="h-6 w-6" />
        </div>
      )}

      <div className={`flex flex-col gap-3 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        {/* 기본 메시지 영역 (마크다운 적용) */}
        {message.content && (
          <div
            className={`rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-sm ${
              isUser
                ? "bg-slate-900 text-white rounded-tr-sm"
                : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
            }`}
          >
            {isUser ? (
              // 사용자가 보낸 메시지는 마크다운 처리 없이 줄바꿈만 적용
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              // AI가 보낸 메시지는 마크다운으로 렌더링
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // 마크다운 요소들을 Tailwind CSS로 예쁘게 스타일링
                  p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-3 mt-4 text-slate-900" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2 mt-4 text-slate-900" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-md font-bold mb-2 mt-3 text-slate-900" {...props} />,
                  a: ({node, ...props}) => (
                    <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  code: ({node, inline, className, children, ...props}: any) => {
                    return inline ? (
                      // 인라인 코드
                      <code
                        className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      // 블록 코드
                      <pre className="bg-slate-800 text-slate-50 p-4 rounded-xl overflow-x-auto text-sm my-4 font-mono shadow-inner">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                  blockquote: ({node, ...props}) => (
                    <blockquote
                      className="border-l-4 border-slate-300 pl-4 py-1 my-3 text-slate-500 italic bg-slate-50 rounded-r-lg"
                      {...props}
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}

        {/* Out of Scope 안내 */}
        {message.outOfScope && (
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
            <AlertCircle className="w-4 h-4" />
            질문하신 내용은 현재 제가 답변하기 어려운 주제입니다.
          </div>
        )}

        {/* Top Pick 렌더링 */}
        {message.topPick && (
          <Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600 text-white border-none">Top Pick</Badge>
              <h4 className="font-bold text-slate-900 text-lg">{message.topPick.title}</h4>
            </div>
            <p className="text-sm text-slate-600 mb-3">{message.topPick.description}</p>
            <div className="bg-white/60 p-3 rounded-lg text-sm mb-3 border border-blue-100/50">
              <span className="font-semibold text-blue-800">추천 이유:</span> {message.topPick.reason}
            </div>
            <div className="text-sm text-slate-700 flex gap-2 items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{message.topPick.howToUse}</span>
            </div>
          </Card>
        )}

        {/* 추천 카드 리스트 렌더링 */}
        {message.cards && message.cards.length > 0 && (
          <div className="flex flex-col gap-3 w-full max-w-md mt-2">
            <p className="text-sm font-semibold text-slate-500 px-1">관련 추천 항목</p>
            {message.cards.map((card) => (
              <Card
                key={card.id}
                // 🌟 클릭 시 Family 상세 페이지로 이동 & hover 시 스타일 변경되도록 수정
                onClick={() => navigate(`/update/family/${card.id}`)}
                className="p-4 bg-white border-slate-200 shadow-sm cursor-pointer hover:border-slate-800 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">{card.title}</h4>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{card.description}</p>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  {/* 빈 여백 유지용 div */}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 유저 프로필 */}
      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
          <User className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
