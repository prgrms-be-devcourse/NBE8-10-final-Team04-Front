import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckoutPage } from "./pages/payment/Checkout";
import { SuccessPage } from "./pages/payment/Success";
import { FailPage } from "./pages/payment/Fail";
import SubscribePage from "./pages/payment/SubscribePage";
import Main from "./pages/main/Main";
import Search from "./pages/search/Search";
import Prompt from "./pages/prompt/Prompt";
import Chatbot from "./pages/chatbot/Chatbot";
import MyPage from "./pages/mypage/MyPage";
import GlobalStyle from "./pages/GlobalStyles";
import Layout from "./pages/component/layout/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/mypage" element={<MyPage />} />
            {/* 결제관련  */}
            <Route path="/subscribe" element={<SubscribePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/fail" element={<FailPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
