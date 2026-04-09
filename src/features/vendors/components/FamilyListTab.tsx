// src/features/vendors/components/FamilyListTab.tsx
import {Box} from "lucide-react";
import type {ModelFamily} from "../types/vendor.types";

interface FamilyListTabProps {
  families: ModelFamily[];
}

export function FamilyListTab({families}: FamilyListTabProps) {
  if (!families || families.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-xl">
        등록된 모델 패밀리가 없습니다.
      </div>
    );
  }

  return (
    // 🌟 grid 대신 1단 리스트(flex-col) 형식으로 변경
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {families.map((family) => (
        <div
          key={family.id}
          className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm flex flex-col md:flex-row md:items-start gap-4 md:gap-6"
        >
          <div className="flex items-center gap-3 md:w-1/3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
              <Box className="w-5 h-5 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{family.familyName}</h3>
          </div>

          <div className="flex-1 text-sm text-slate-600 leading-relaxed md:mt-2">{family.commonDescription}</div>
        </div>
      ))}
    </div>
  );
}
