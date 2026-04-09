// src/pages/update/AIUpdatePage.tsx
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {PageLayout} from "@/components/layout/PageLayout";
import {useVendors} from "@/features/vendors/hooks/useVendors";
import {VendorCard} from "@/features/vendors/components/VendorCard";

export default function AIUpdatePage() {
  const {vendors} = useVendors();
  const navigate = useNavigate();

  // 🌟 string에서 number로 변경
  const handleVendorClick = (vendorId: number) => {
    navigate(`/update/${vendorId}`);
  };

  return (
    <PageLayout
      title="AI 정보"
      description="글로벌 주요 AI 벤더들의 핵심 모델 라인업과 최신 업데이트 소식을 확인하세요."
    >
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
    </PageLayout>
  );
}
