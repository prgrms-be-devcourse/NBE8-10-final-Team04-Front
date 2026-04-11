// src/features/vendors/components/FamilyListTab.tsx
import {useNavigate} from "react-router-dom";
import {Box, ChevronRight} from "lucide-react";
import type {ModelFamily} from "../types/vendor.types";

interface FamilyListTabProps {
  families: ModelFamily[];
}

export function FamilyListTab({families}: FamilyListTabProps) {
  const navigate = useNavigate(); // 🌟 네비게이션 훅 추가

  if (!families || families.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-xl">
        등록된 모델 패밀리가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {families.map((family) => (
        <div
          key={family.id}
          // 🌟 onClick 이벤트와 커서 스타일 추가
          onClick={() => navigate(`/update/family/${family.id}`)}
          className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-800 transition-colors shadow-sm flex flex-col md:flex-row md:items-start gap-4 md:gap-6 cursor-pointer group"
        >
          <div className="flex items-center gap-3 md:w-1/3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0 group-hover:bg-slate-100 transition-colors">
              <Box className="w-5 h-5 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{family.familyName}</h3>
          </div>

          <div className="flex-1 text-sm text-slate-600 leading-relaxed md:mt-2">{family.commonDescription}</div>

          {/* 🌟 화살표 아이콘을 추가하여 클릭 가능함을 시각적으로 안내 */}
          <div className="hidden md:flex items-center justify-center pt-2 text-slate-300 group-hover:text-slate-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
