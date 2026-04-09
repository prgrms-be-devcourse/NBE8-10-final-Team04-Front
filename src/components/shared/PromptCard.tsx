// src/components/shared/PromptCard.tsx
import {Star, GitFork} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {type SkillListItem} from "@/types/prompt.types";

interface PromptCardProps {
  prompt: SkillListItem;
}

export default function PromptCard({prompt}: PromptCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      // 🌟 카드 전체에 커서 포인터 추가 및 클릭 시 상세 페이지 이동
      className="flex h-full flex-col border-slate-200 shadow-sm transition-all hover:border-primary/50 hover:shadow-md cursor-pointer"
      onClick={() => navigate(`/prompt/${prompt.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="mb-3 flex items-start justify-between">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            {prompt.category}
          </Badge>
          <div className="text-xs font-medium text-slate-500">
            by <span className="text-slate-700">{prompt.repositoryName}</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold line-clamp-1">{prompt.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* 요약(summary) 내용 미리보기 */}
        <div className="relative mb-4 h-24 overflow-hidden rounded-md bg-slate-900 p-3 text-sm text-slate-300">
          <div className="line-clamp-4">{prompt.summary}</div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-500">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-slate-100 pt-4">
        {/* 🌟 Heart/Play 대신 Star와 Fork 아이콘으로 변경 */}
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
            <Star className="h-4 w-4" />
            <span className="font-medium">{prompt.stars}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
            <GitFork className="h-4 w-4" />
            <span className="font-medium">{prompt.forks}</span>
          </div>
        </div>
        {/* 🌟 복사하기 버튼 삭제됨 */}
      </CardFooter>
    </Card>
  );
}
