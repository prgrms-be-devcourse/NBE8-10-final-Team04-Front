// src/features/vendors/components/ModelFamilyCard.tsx
import {Cpu} from "lucide-react";
import type {ModelFamily} from "../types/vendor.types";

export function ModelFamilyCard({families}: {families: ModelFamily[]}) {
  return (
    <div className="flex flex-col">
      {/* 상단 안내 박스 */}
      <div className="bg-slate-100/70 p-6 rounded-2xl mb-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">모델 라인업</h3>
        <p className="text-slate-600 mt-1 text-sm">해당 벤더에서 제공 중인 주요 모델 패밀리 정보입니다.</p>
      </div>

      {/* 패밀리 리스트 렌더링 (그리드 형태) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {families.map((family) => (
          <div
            key={family.id}
            className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all"
          >
            {/* 아이콘과 패밀리 이름 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{family.familyName}</h4>
            </div>

            {/* 패밀리 설명 */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">{family.commonDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
