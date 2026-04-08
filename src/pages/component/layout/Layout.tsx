import type { ReactNode } from "react";
import { PageInner, PageLayout } from "./PageLayout";
import Navbar from "../Navbar";
import Footer from "../Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <PageLayout>
      <Navbar />
      <PageInner>{children}</PageInner>
      <Footer />
    </PageLayout>
  );
}
