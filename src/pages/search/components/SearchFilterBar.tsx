import {Search as SearchIcon, Filter} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}: SearchFilterBarProps) {
  return (
    <section className="space-y-6">
      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="찾고 싶은 AI 툴의 이름이나 키워드를 입력하세요... (예: Claude)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-14 rounded-full border-slate-200 pl-12 pr-4 text-base shadow-sm focus-visible:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="mr-2 flex items-center gap-2 border-r pr-4 text-slate-500">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">카테고리</span>
        </div>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="whitespace-nowrap rounded-full"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
}
