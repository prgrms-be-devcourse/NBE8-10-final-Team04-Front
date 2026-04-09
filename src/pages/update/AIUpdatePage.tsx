// src/pages/update/AIUpdatePage.tsx
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {Trophy} from "lucide-react"; // 아이콘

import {PageLayout} from "@/components/layout/PageLayout";
import {useVendors} from "@/features/vendors/hooks/useVendors";
import {VendorCard} from "@/features/vendors/components/VendorCard";
import ComingSoonCard from "@/components/shared/ComingSoonCard"; // 🌟 ComingSoonCard 임포트

export default function AIUpdatePage() {
  const {vendors} = useVendors();
  const navigate = useNavigate();

  const handleVendorClick = (vendorId: number) => {
    navigate(`/update/${vendorId}`);
  };

  return (
    <PageLayout
      title="AI 정보"
      description="글로벌 주요 AI 벤더들의 핵심 모델 라인업과 최신 업데이트 소식을 확인하세요."
    >
      <div className="flex flex-col gap-12">
        {/* 1. 벤더 리스트 */}
        <motion.section
          className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {opacity: 0},
            visible: {opacity: 1, transition: {staggerChildren: 0.1}},
          }}
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              variants={{
                hidden: {opacity: 0, y: 20},
                visible: {opacity: 1, y: 0, transition: {duration: 0.4}},
              }}
            >
              <VendorCard vendor={vendor} onClick={handleVendorClick} />
            </motion.div>
          ))}
        </motion.section>

        {/* 2. AI 성능 벤치마크 (Coming Soon) */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> 핵심 모델 벤치마크 비교
            </h2>
          </div>

          {/* 🌟 기존 하드코딩된 표 대신 ComingSoonCard 사용 */}
          <ComingSoonCard
            title="상세 성능 벤치마크 제공 예정"
            description={
              <>
                외부 API 연동을 통해 GPT-5.4 Pro, Claude 3 Opus 등<br />
                글로벌 유명 AI 모델들의 객관적이고 세세한 성능 지표를 제공할 예정입니다.
              </>
            }
            icon={<Trophy className="w-12 h-12 text-slate-300" />}
            className="h-[300px]" // 카드 높이를 넉넉하게 설정
          />
        </section>
      </div>
    </PageLayout>
  );
}
