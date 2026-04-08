import {lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";

import {Toaster} from "sonner";
import {queryClient} from "@/lib/queryClient";
import Layout from "@/components/layout/Layout";
import PageSkeleton from "@/components/common/PageSkeleton";

// 기존 페이지들 모두 lazy import 처리 (성능 최적화)
const Main = lazy(() => import("@/pages/main/Main"));
const Search = lazy(() => import("@/pages/search/Search"));
const Prompt = lazy(() => import("@/pages/prompt/Prompt"));
const Chatbot = lazy(() => import("@/pages/chatbot/Chatbot"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));

// 결제 관련 페이지
const SubscribePage = lazy(() => import("@/pages/payment/SubscribePage"));
const CheckoutPage = lazy(() => import("@/pages/payment/Checkout"));
const SuccessPage = lazy(() => import("@/pages/payment/Success"));
const FailPage = lazy(() => import("@/pages/payment/Fail"));

// 새로 만든 로그인 페이지
const Login = lazy(() => import("@/pages/Login"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Search />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/login" element={<Login />} />

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
