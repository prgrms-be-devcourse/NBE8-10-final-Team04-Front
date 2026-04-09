// src/App.tsx
import {lazy, Suspense, useEffect} from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

import {queryClient} from "@/lib/queryClient";
import Layout from "@/components/layout/Layout";
import PageSkeleton from "@/components/common/PageSkeleton";
// 🌟 우리가 만든 우측 하단 플로팅 버튼
import ScrollToTop from "@/components/common/ScrollToTop";

// 기존 및 신규 페이지들 모두 lazy import 처리 (성능 최적화)
const Main = lazy(() => import("@/pages/main/Main"));

// AI 업데이트 및 상세 페이지
const AIUpdatePage = lazy(() => import("@/pages/update/AIUpdatePage"));
const VendorDetailPage = lazy(() => import("@/pages/update/VendorDetailPage"));

// MCP 맞춤 스킬 매칭 페이지
const MCPMatchingPage = lazy(() => import("@/pages/mcp/MCPMatchingPage"));

const Prompt = lazy(() => import("@/pages/prompt/Prompt"));
const Chatbot = lazy(() => import("@/pages/chatbot/Chatbot"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const Login = lazy(() => import("@/pages/Login"));
const AdminCommunityPage = lazy(() => import("@/pages/admin/AdminCommunityPage"));
const PromptDetail = lazy(() => import("@/pages/prompt/PromptDetail"));

// 결제 관련 페이지
const SubscribePage = lazy(() => import("@/pages/payment/SubscribePage"));
const CheckoutPage = lazy(() => import("@/pages/payment/Checkout"));
const SuccessPage = lazy(() => import("@/pages/payment/Success"));
const FailPage = lazy(() => import("@/pages/payment/Fail"));

// 🌟 충돌 해결: 컴포넌트 이름을 ScrollRestoration으로 변경합니다.
// (페이지 이동 시 스크롤을 자동으로 최상단으로 올려주는 기능)
function ScrollRestoration() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* 🌟 1. 페이지 이동 시 자동으로 맨 위로 올려주는 기능 */}
        <ScrollRestoration />

        {/* 🌟 2. 화면 우측 하단에 항상 떠 있는 버튼 */}
        <ScrollToTop />

        <Layout>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* 메인 라우트 */}
              <Route path="/" element={<Main />} />

              {/* 기능 라우트 */}
              <Route path="/update" element={<AIUpdatePage />} />
              <Route path="/update/:vendorId" element={<VendorDetailPage />} />
              <Route path="/mcp" element={<MCPMatchingPage />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/prompt/:id" element={<PromptDetail />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminCommunityPage />} />

              {/* 결제 라우트 */}
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/fail" element={<FailPage />} />
            </Routes>
          </Suspense>
        </Layout>

        {/* 토스트 알림 컨테이너 */}
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
