import {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom"; // 🌟 NavLink 추가
import {Menu as MenuIcon} from "lucide-react";
import {PageInner} from "./PageLayout";
import {useAuthStore} from "@/features/auth/stores/authStore";
import {Sheet, SheetContent, SheetTrigger, SheetTitle} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

export default function Navbar() {
  const {user, clearAuth} = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    setIsOpen(false);
    navigate("/");
  };

  // 🌟 일반 메뉴용 조건부 스타일링 함수
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-sm transition-colors ${
      isActive
        ? "font-bold text-slate-900" // 현재 페이지: 진한 텍스트 & 볼드
        : "font-medium text-slate-500 hover:text-slate-900" // 다른 페이지: 적당한 회색 & 마우스 올리면 진해짐
    }`;
  };

  // 🌟 관리자 메뉴용 조건부 스타일링 함수
  const getAdminLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `text-sm transition-colors md:ml-4 ${
      isActive
        ? "font-bold text-amber-700" 
        : "font-bold text-amber-500 hover:text-amber-700"
    }`;
  };

  const NavLinks = () => (
    <>
      <NavLink to="/" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        메인
      </NavLink>
      <NavLink to="/update" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        AI 정보
      </NavLink>
      <NavLink to="/prompt" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        프롬프트
      </NavLink>
      <NavLink to="/mcp" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        스킬 매칭
      </NavLink>
      <NavLink to="/chatbot" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        AI 챗봇
      </NavLink>
      <NavLink to="/mypage" onClick={() => setIsOpen(false)} className={getNavLinkClass}>
        마이페이지
      </NavLink>
      {user?.role === "ADMIN" && (
        <NavLink to="/admin" onClick={() => setIsOpen(false)} className={getAdminLinkClass}>
          관리자 콘솔
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-white">
      <PageInner className="flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 모바일 햄버거 메뉴 */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] pt-12 bg-white">
                <SheetTitle className="text-left mb-8 font-bold">start-ai-io</SheetTitle>
                <nav className="flex flex-col gap-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="text-base font-semibold text-[#111] no-underline">
            start-ai-io
          </Link>
        </div>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex gap-8">
          <NavLinks />
        </nav>

        {/* 인증 및 유저 정보 */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <>
              <span className="hidden text-sm font-medium text-[#555] sm:inline-block mr-2">{user.name}님</span>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-sm text-[#222] hover:text-black bg-transparent border-none"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-[#222] px-3.5 py-1.5 text-[13px] font-medium text-[#222] no-underline hover:bg-gray-50"
              >
                로그인/회원가입
              </Link>
            </>
          )}
        </div>
      </PageInner>
    </header>
  );
}