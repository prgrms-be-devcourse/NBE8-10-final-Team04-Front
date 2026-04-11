// src/hooks/useChatbot.ts
import {useState, useRef, useEffect, type FormEvent} from "react";
import {type ChatMessage} from "@/types/chat.types";
import {apiClient} from "@/lib/axios";
import {useChatStore} from "@/features/chatbot/stores/chatStore"; // 🌟 스토어 임포트

export function useChatbot() {
  // 🌟 useState 대신 전역 스토어에서 messages와 setMessages를 가져옵니다.
  const {messages, setMessages} = useChatStore();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 페이지 진입 시 Welcome 메시지 호출
  useEffect(() => {
    async function fetchWelcome() {
      // 🌟 중요: 이미 대화 내역이 있다면(페이지를 이동했다가 돌아왔다면) Welcome API를 다시 호출하지 않음!
      if (messages.length > 0) return;

      try {
        const {data} = await apiClient.get("/api/chatbot/welcome", {
          timeout: 30000,
        });
        if (data && data.message) {
          setMessages([
            {
              id: "welcome-api",
              role: "assistant",
              content: data.message,
              cards: data.cards,
              topPick: data.topPick,
              nextActions: data.nextActions,
              outOfScope: data.outOfScope,
              createdAt: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error("Welcome API 호출 실패", error);
        // 실패 시 기본 메시지
        setMessages([
          {
            id: "init-1",
            role: "assistant",
            content: "안녕하세요! 어떤 도움이 필요하신가요?",
            createdAt: new Date(),
          },
        ]);
      }
    }

    fetchWelcome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  const handleSendMessage = async (e?: FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();

    // 사용자가 입력한 텍스트 또는 '다음 질문(nextActions)' 버튼을 클릭한 텍스트
    const userText = textOverride || input.trim();
    if (!userText || isTyping) return;

    setInput("");

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const {data} = await apiClient.post("/api/chatbot", {question: userText}, {timeout: 30000});

      const aiResponseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "",
        cards: data.cards,
        topPick: data.topPick,
        nextActions: data.nextActions,
        outOfScope: data.outOfScope,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, aiResponseMsg]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "죄송합니다. 서버와 통신 중 오류가 발생했습니다.",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    scrollRef,
    handleSendMessage,
  };
}
