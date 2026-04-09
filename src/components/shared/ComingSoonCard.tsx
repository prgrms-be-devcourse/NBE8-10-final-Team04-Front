// src/components/shared/ComingSoonCard.tsx
import {type ReactNode} from "react";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

interface ComingSoonCardProps {
  title: string;
  description: ReactNode; // 줄바꿈(<br/>) 등을 포함할 수 있도록 ReactNode 사용
  icon: ReactNode; // Lucide 아이콘을 받기 위함
  className?: string; // 외부에서 높이나 여백을 조절할 수 있도록 열어둠
}

export default function ComingSoonCard({title, description, icon, className}: ComingSoonCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 bg-slate-50/50 text-center relative overflow-hidden group",
        className, // 기본 스타일 외에 덮어쓸 스타일이 있다면 적용
      )}
    >
      {/* 블러 처리되는 오버레이 배경 */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] group-hover:bg-transparent transition-all z-10" />

      {/* 내용물 (z-index 0으로 두어 블러 뒤에 위치하게 함) */}
      <div className="text-slate-300 mb-4 z-0">{icon}</div>
      <h4 className="text-lg font-bold text-slate-700 mb-2 z-0">{title}</h4>
      <p className="text-sm text-slate-500 z-0">{description}</p>

      <Badge variant="outline" className="mt-6 bg-white z-0 text-slate-400 border-slate-200">
        Coming Soon
      </Badge>
    </Card>
  );
}
