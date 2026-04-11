// src/features/chatbot/stores/chatStore.ts
import {create} from "zustand";
import {type ChatMessage} from "@/types/chat.types";

interface ChatStore {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  setMessages: (updater) =>
    set((state) => ({
      messages: typeof updater === "function" ? updater(state.messages) : updater,
    })),

  clearMessages: () => set({messages: []}),
}));
