// src/App.tsx
import {lazy, Suspense, useEffect} from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

import {queryClient} from "@/lib/queryClient";
import Layout from "@/components/layout/Layout";
import PageSkeleton from "@/components/common/PageSkeleton";
import ScrollToTop from "@/components/common/ScrollToTop";

// 🌟 ProtectedRoute 임포트
import ProtectedRoute from "@/components/common/ProtectedRoute";

const Main = lazy(() => import("@/pages/main/Main"));
const AIUpdatePage = lazy(() => import("@/pages/update/AIUpdatePage"));
const VendorDetailPage = lazy(() => import("@/pages/update/VendorDetailPage"));
const FamilyDetailPage = lazy(() => import("@/pages/update/FamilyDetailPage"));
const MCPMatchingPage = lazy(() => import("@/pages/mcp/MCPMatchingPage"));
const McpGuidePage = lazy(() => import("@/pages/mcp/McpGuidePage"));
const Prompt = lazy(() => import("@/pages/prompt/Prompt"));
const Chatbot = lazy(() => import("@/pages/chatbot/Chatbot"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const Login = lazy(() => import("@/pages/Login"));
const AdminCommunityPage = lazy(() => import("@/pages/admin/AdminCommunityPage"));
const PromptDetail = lazy(() => import("@/pages/prompt/PromptDetail"));
const SubscribePage = lazy(() => import("@/pages/payment/SubscribePage"));
const CheckoutPage = lazy(() => import("@/pages/payment/Checkout"));
const SuccessPage = lazy(() => import("@/pages/payment/Success"));
const FailPage = lazy(() => import("@/pages/payment/Fail"));

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
        <ScrollRestoration />
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* 공개 라우트 */}
              <Route path="/" element={<Main />} />
              <Route path="/update" element={<AIUpdatePage />} />
              <Route path="/update/:vendorId" element={<VendorDetailPage />} />
              <Route path="/update/family/:familyId" element={<FamilyDetailPage />} />
              <Route path="/mcp" element={<MCPMatchingPage />} />
              <Route path="/mcp/guide" element={<McpGuidePage />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/prompt/:id" element={<PromptDetail />} />
              <Route path="/login" element={<Login />} />

              {/* 🌟 보호 라우트 (로그인 필요) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/subscribe" element={<SubscribePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminCommunityPage />} />
              </Route>

              {/* 결과 페이지 */}
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/fail" element={<FailPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
