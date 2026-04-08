import {Link} from "react-router-dom";
import {PageInner} from "./PageLayout";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-white">
      <PageInner className="flex h-[72px] items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-base font-semibold text-[#111] no-underline">
          서비스 이름
        </Link>

        {/* 메뉴 */}
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-sm font-medium text-[#222] hover:text-black transition-colors">
            툴비교
          </Link>
          <Link to="/search" className="text-sm font-medium text-[#222] hover:text-black transition-colors">
            검색
          </Link>
          <Link to="/prompt" className="text-sm font-medium text-[#222] hover:text-black transition-colors">
            프롬프트
          </Link>
          <Link to="/chatbot" className="text-sm font-medium text-[#222] hover:text-black transition-colors">
            AI 챗봇
          </Link>
          <Link to="/mypage" className="text-sm font-medium text-[#222] hover:text-black transition-colors">
            마이페이지
          </Link>
        </nav>

        {/* 인증 버튼 */}
        <div className="flex items-center gap-2.5">
          <button className="cursor-pointer border-none bg-transparent px-2 text-sm text-[#222] hover:text-black">
            로그인
          </button>
          <button className="cursor-pointer rounded-full border border-[#222] bg-white px-3.5 py-2 text-[13px] font-medium text-[#222] transition-colors hover:bg-gray-50">
            회원가입
          </button>
        </div>
      </PageInner>
    </header>
  );
}
