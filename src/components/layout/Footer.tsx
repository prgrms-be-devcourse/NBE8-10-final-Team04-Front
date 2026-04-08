import {PageInner} from "./PageLayout";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e5e5e5] bg-[#fafafa]">
      <PageInner className="flex flex-col items-start justify-between gap-6 py-6 md:flex-row md:items-center">
        {/* 좌측 정보 영역 */}
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-[#111]">AI Hub</div>
          <div className="text-xs text-[#888]">© 2026 AI Hub. All rights reserved.</div>
          <div className="mt-1.5 text-xs leading-relaxed text-[#888]">
            Team04 IOT 데브코스 Final Project <br />
            팀장 : 허동빈 <br />
            팀원 : 박슬기, 한민희, 김현수
          </div>
        </div>

        {/* 우측 링크 영역 */}
        <div className="flex gap-4">
          <span className="cursor-pointer text-[13px] text-[#555] transition-colors hover:text-black">이용약관</span>
          <span className="cursor-pointer text-[13px] text-[#555] transition-colors hover:text-black">
            개인정보처리방침
          </span>
          <span className="cursor-pointer text-[13px] text-[#555] transition-colors hover:text-black">고객센터</span>
        </div>
      </PageInner>
    </footer>
  );
}
