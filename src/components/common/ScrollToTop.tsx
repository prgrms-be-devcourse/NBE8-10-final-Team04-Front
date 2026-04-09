import {useState, useEffect} from "react";
import {ArrowUp} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      // 화면을 300px 이상 내렸을 때만 버튼이 보이게 합니다.
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg z-50 bg-slate-900 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-slate-800"
      aria-label="맨 위로 가기"
    >
      <ArrowUp className="h-6 w-6 stroke-[2.5px]" />
    </Button>
  );
}
