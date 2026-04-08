import {Copy, Heart, PlayCircle} from "lucide-react";
import {toast} from "sonner";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {type AIPrompt} from "@/types/prompt.types";

interface PromptCardProps {
  prompt: AIPrompt;
}

export default function PromptCard({prompt}: PromptCardProps) {
  // 클립보드 복사 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success("프롬프트가 클립보드에 복사되었습니다!", {
        description: "원하는 AI 툴에 붙여넣기 하여 사용해 보세요.",
      });
    } catch (error) {
      toast.error("복사에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Card className="flex h-full flex-col border-slate-200 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-3 flex items-start justify-between">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
            {prompt.category}
          </Badge>
          <div className="text-xs font-medium text-slate-500">
            by <span className="text-slate-700">{prompt.author}</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold line-clamp-1">{prompt.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* 프롬프트 내용 미리보기 (어두운 배경으로 코드/명령어 느낌 강조) */}
        <div className="relative mb-4 h-24 overflow-hidden rounded-md bg-slate-900 p-3 text-sm text-slate-300">
          <div className="line-clamp-4">{prompt.content}</div>
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
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1 hover:text-rose-500 cursor-pointer transition-colors">
            <Heart className="h-4 w-4" />
            <span>{prompt.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="h-4 w-4" />
            <span>{prompt.usageCount}</span>
          </div>
        </div>
        <Button size="sm" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> 복사하기
        </Button>
      </CardFooter>
    </Card>
  );
}
