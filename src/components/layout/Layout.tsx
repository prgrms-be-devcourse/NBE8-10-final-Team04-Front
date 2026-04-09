import type {ReactNode} from "react";
import {PageInner, PageLayout} from "./PageLayout";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "../common/PageTransition";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({children}: LayoutProps) {
  return (
    <PageLayout>
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <PageInner className="flex-1">
          {/* 페이지 내용물에만 부드러운 등장 효과 적용 */}
          <PageTransition>{children}</PageTransition>
        </PageInner>
      </main>
      <Footer />
    </PageLayout>
  );
}
