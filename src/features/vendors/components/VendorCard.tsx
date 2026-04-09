// src/features/vendors/components/VendorCard.tsx
import {ArrowRight, Link as LinkIcon} from "lucide-react"; // Box 제거
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import type {Vendor} from "@/features/vendors/types/vendor.types";

interface VendorCardProps {
  vendor: Vendor;
  onClick: (id: number) => void;
}

// 이름에 따라 로컬 public 폴더의 아이콘 매핑
export const getVendorIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("openai")) return "/openai.jpg";
  if (lowerName.includes("anthropic")) return "/anthropic.webp";
  if (lowerName.includes("google")) return "/google.png";
  return "/default-icon.png";
};

export function VendorCard({vendor, onClick}: VendorCardProps) {
  return (
    <Card
      onClick={() => onClick(vendor.id)}
      className="group cursor-pointer flex flex-col h-full border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-400 hover:shadow-lg hover:-translate-y-1"
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border border-slate-100 bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
              <img src={getVendorIcon(vendor.name)} alt={vendor.name} className="w-full h-full object-contain p-1" />
            </div>
            <CardTitle className="text-2xl font-bold">{vendor.name}</CardTitle>
          </div>

          <div className="flex gap-1.5 flex-col items-end">
            {vendor.active && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none shadow-none">Active</Badge>
            )}
            {!vendor.active && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-500 shadow-none">
                Inactive
              </Badge>
            )}
            {vendor.deprecated && (
              <Badge variant="destructive" className="shadow-none">
                Deprecated
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        {vendor.officialUrl && (
          <div
            className="flex items-center text-sm text-slate-500 hover:text-blue-500 transition-colors mb-6"
            onClick={(e) => {
              e.stopPropagation();
              window.open(vendor.officialUrl, "_blank");
            }}
          >
            <LinkIcon className="h-4 w-4 mr-1.5" />
            <span className="truncate">{vendor.officialUrl}</span>
          </div>
        )}

        {/* 모델 패밀리 렌더링 영역 완전히 제거됨 */}

        <div className="mt-auto pt-4 flex items-center justify-end text-sm font-medium text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
          자세히 보기 <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
