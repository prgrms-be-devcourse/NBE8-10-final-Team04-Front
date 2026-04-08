import {useState, useRef, useEffect, type FormEvent} from "react";
import {type ChatMessage} from "@/types/chat.types";

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        "안녕하세요! start-ai-io AI 챗봇입니다. AI 툴 추천, 프롬프트 작성법, 혹은 개발 관련 질문 등 무엇이든 물어보세요.",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 자동 스크롤을 위한 참조 객체
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때마다 맨 아래로 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput(""); // 입력창 초기화

    // 1. 유저 메시지 화면에 추가
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    // TODO: 실제 AI API(OpenAI, Claude 등) 연동 자리
    // 현재는 테스트를 위해 1.5초 뒤에 가짜 응답이 오도록 구현했습니다.
    setTimeout(() => {
      const aiResponseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `'${userText}'에 대한 답변입니다. 실제 API를 연동하면 이곳에 AI의 답변이 스트리밍되어 표시됩니다. 추가로 궁금한 점이 있으신가요?`,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiResponseMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    handleSendMessage,
  };
}
