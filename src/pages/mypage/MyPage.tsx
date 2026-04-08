import {User, CreditCard, LogOut, Bookmark, FileText} from "lucide-react";
import {PageLayout} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

import ToolCard from "@/components/shared/ToolCard";
import PromptCard from "@/components/shared/PromptCard";
import EmptyState from "@/components/shared/EmptyState";
import {useMyPage} from "@/hooks/useMyPage";
import { motion } from "framer-motion";

export default function MyPage() {
  const {user, savedTools, savedPrompts, isSubscribed, handleLogout, handleSubscribeClick} = useMyPage();

  // 보호된 라우트(ProtectedRoute)를 통과했지만, 만약의 경우를 대비한 방어 코드
  if (!user) return null;

  return (
    <PageLayout
      title="마이페이지"
      description="내 프로필 정보와 찜한 AI 툴, 프롬프트를 한곳에서 관리하세요."
    >
      {/* 전체 레이아웃 스태거 적용 (0.1초 간격) */}
      <motion.div 
        className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        
        {/* 좌측: 유저 프로필 & 결제 정보 */}
        <motion.div 
          className="flex flex-col gap-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          {/* ... (기존 프로필 Card, 멤버십 Card, 로그아웃 Button 코드 그대로 유지) ... */}
        </motion.div>

        {/* 우측: 찜한 목록 영역 */}
        <div className="flex flex-col gap-10 md:col-span-2">
          
          {/* 찜한 AI 툴 */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Bookmark className="h-5 w-5 text-amber-500" />
                찜한 AI 툴 <span className="text-primary">{savedTools.length}</span>
              </h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
            >
              {savedTools.map((tool) => (
                <motion.div key={tool.id} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}>
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
              {/* ... EmptyState 유지 ... */}
            </motion.div>
          </motion.section>

          {/* 저장한 프롬프트 */}
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <FileText className="h-5 w-5 text-blue-500" />
                저장한 프롬프트 <span className="text-primary">{savedPrompts.length}</span>
              </h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
            >
              {savedPrompts.map((prompt) => (
                <motion.div key={prompt.id} variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}>
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))}
              {/* ... EmptyState 유지 ... */}
            </motion.div>
          </motion.section>

        </div>
      </motion.div>
    </PageLayout>
  );
}