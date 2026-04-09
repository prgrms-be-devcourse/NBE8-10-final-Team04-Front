import {Star, ArrowRight} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {type AITool} from "@/types/tool.types";

interface ToolCardProps {
  tool: AITool;
  onClick?: (id: number) => void;
}

export default function ToolCard({tool, onClick}: ToolCardProps) {
  return (
    <Card className="flex h-full flex-col border-slate-200 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="mb-3 flex items-start justify-between">
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
            {tool.category}
          </Badge>
          {tool.pricing === "무료" ? (
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">
              무료
            </Badge>
          ) : tool.pricing === "부분 유료" ? (
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600">
              부분 유료
            </Badge>
          ) : (
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
              유료
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-1 text-xl font-bold">{tool.name}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2 h-10 text-slate-600">{tool.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-slate-900">{tool.rating}</span>
          <span className="ml-1 font-normal text-slate-400">({tool.reviewCount.toLocaleString()} 리뷰)</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full gap-2 font-medium" variant="ghost" onClick={() => onClick?.(tool.id)}>
          상세보기 <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
