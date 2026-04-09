import {User, CreditCard, Settings, LogOut, Clock, FileText} from "lucide-react";
import {motion} from "framer-motion";

import {PageLayout} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

import {useMyPage} from "@/hooks/useMyPage";
import ComingSoonCard from "@/components/shared/ComingSoonCard";

export default function MyPage() {
  const {user, membership, isSubscribed, handleLogout, handleSubscribeClick} = useMyPage();

  if (!user) {
    return (
      <PageLayout title="마이페이지">
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">로그인이 필요합니다</h2>
          <p className="mb-8 text-slate-500">내 프로필과 활동 내역을 보려면 로그인을 진행해 주세요.</p>
          <Button
            onClick={() => (window.location.href = "/login")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            로그인하러 가기
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="마이페이지" description="내 프로필 정보와 활동 내역을 한곳에서 관리하세요.">
      <motion.div
        className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 mt-6 items-stretch"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {opacity: 0},
          visible: {opacity: 1, transition: {staggerChildren: 0.1}},
        }}
      >
        {/* 좌측: 내 정보 및 멤버십 섹션 */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          variants={{
            hidden: {opacity: 0, y: 20},
            visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
          }}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <User className="h-5 w-5 text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900">내 정보</h3>
          </div>

          <Card className="p-6 border-slate-200 shadow-sm bg-white text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <User className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{user.email}</p>
            <div className="mt-6 flex w-full gap-2">
              <Button variant="outline" className="flex-1 gap-2 text-xs border-slate-200">
                <Settings className="h-4 w-4" /> 정보 수정
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex-1 gap-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> 로그아웃
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-slate-200 shadow-sm bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <CreditCard className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <Badge
                  className={
                    isSubscribed
                      ? "bg-amber-400 text-slate-900 hover:bg-amber-400"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {isSubscribed ? "Premium" : "Free Plan"}
                </Badge>
                {isSubscribed && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    다음 결제: {membership?.nextBillingDate}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <p className="text-xs text-slate-400 mb-1">MCP 매칭 잔여 횟수</p>
                <p className="text-2xl font-black text-white">{membership?.remainingMcp}</p>
              </div>
              <Button
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold"
                onClick={handleSubscribeClick}
              >
                {isSubscribed ? "멤버십 관리" : "무제한 멤버십 구독하기"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* 우측: 활동 내역 섹션 (세로 길이를 좌측 카드 묶음에 맞춤) */}
        <motion.div
          className="lg:col-span-7 flex flex-col"
          variants={{
            hidden: {opacity: 0, y: 20},
            visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
          }}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <Clock className="h-5 w-5 text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900">활동 내역</h3>
          </div>

          <div className="flex-1 flex flex-col pt-6">
            <ComingSoonCard
              className="flex-1"
              title="저장한 프롬프트"
              icon={<FileText className="h-12 w-12" />}
              description={
                <>
                  유용한 프롬프트를 스크랩하고
                  <br />
                  언제든 꺼내 쓸 수 있는 기능이 준비 중입니다.
                </>
              }
            />
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}
