// src/pages/mcp/McpGuidePage.tsx
import {useState} from "react";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Copy, Terminal, Trash2, KeyRound, Check} from "lucide-react";
import {format, addMonths} from "date-fns";
import {toast} from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import {useMcpTokens} from "@/features/mcp/hooks/useMcpTokens";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/features/auth/hooks/useAuth";

const GUIDE_MARKDOWN = `
## MCP 연결 방법

### 공통: 토큰 환경변수
\`\`\`bash
export START_AI_HUB_MCP_TOKEN="your_token"
\`\`\`

### Codex
\`\`\`bash
codex mcp add start-ai-hub --url "https://api.han-minhee.site/mcp" --bearer-token-env-var START_AI_HUB_MCP_TOKEN
\`\`\`

### Claude
\`\`\`bash
claude mcp add --transport http start-ai-hub https://api.han-minhee.site/mcp \\
  --header "Authorization: Bearer $START_AI_HUB_MCP_TOKEN" --scope user
\`\`\`

### Gemini
\`\`\`bash
gemini mcp add --transport http start-ai-hub https://api.han-minhee.site/mcp \\
  --header "Authorization: Bearer $START_AI_HUB_MCP_TOKEN" --scope user
\`\`\`

> 이후 각 에이전트에서 mcp 연결을 확인합니다.

---

## MCP 사용 방법

자신의 기획 정보와 함께 다음과 같이 입력하세요.
> **"자신의 기획 정보와 함께 start-ai-hub 자동화 워크플로우 실행해줘"**

### 단계
1. **START** : agent용 시작 템플릿을 응답 후 사용자 기획 정보 수집
2. **COLLECTED** : 기획 정보 키워드를 바탕으로 관련 skills 응답
`;

export default function McpGuidePage() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  const {tokens, isLoading, createToken, deleteToken, isCreating} = useMcpTokens();

  // 🌟 폐기된 토큰(revoked)은 제외하고 활성 토큰만 필터링
  const activeTokens = tokens.filter((token) => !token.revoked);

  const [form, setForm] = useState({
    name: "",
    expiresAt: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
  });

  const [newToken, setNewToken] = useState<string | null>(null);

  const handleCreateToken = async () => {
    if (!form.name.trim()) {
      toast.error("토큰 이름을 입력해주세요.");
      return;
    }

    const expiresAtIso = `${form.expiresAt}T00:00:00`;

    try {
      const response = await createToken({name: form.name, expiresAt: expiresAtIso});
      setNewToken(response.token);
      toast.success("토큰이 발급되었습니다.");
      setForm({name: "", expiresAt: format(addMonths(new Date(), 1), "yyyy-MM-dd")});
    } catch (e) {
      // 에러 처리는 훅에서 진행
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사되었습니다.");
  };

  return (
    <PageLayout className="bg-slate-50 py-10 min-h-screen">
      <PageInner className="max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">MCP 연결 가이드 및 토큰 관리</h1>

        {/* 1. 마크다운 가이드 영역 */}
        <Card className="mb-10 overflow-hidden bg-white border-slate-200 shadow-sm">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-200" />
            <span className="text-slate-200 font-medium">MCP 연동 문서</span>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto bg-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => (
                  <h2
                    className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-slate-200 text-slate-900"
                    {...props}
                  />
                ),
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-900" {...props} />,
                p: ({node, ...props}) => <p className="mb-5 text-slate-700 leading-relaxed break-keep" {...props} />,
                ol: ({node, ...props}) => (
                  <ol className="list-decimal ml-6 mb-5 space-y-2 text-slate-700 marker:text-slate-400" {...props} />
                ),
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote
                    className="border-l-4 border-slate-300 pl-4 italic text-slate-600 bg-slate-50 py-3 pr-4 rounded-r-lg mb-5"
                    {...props}
                  />
                ),
                code({node, inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  return !inline && match ? (
                    <div className="relative group/code">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(codeString);
                          toast.success("코드가 복사되었습니다.");
                        }}
                        className="absolute right-3 top-3 z-10 p-2 rounded-md bg-slate-800/50 text-slate-400 opacity-0 group-hover/code:opacity-100 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
                        title="코드 복사"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match}
                        PreTag="div"
                        className="rounded-xl !mt-2 !mb-6 text-sm border border-slate-800 shadow-inner"
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm border border-slate-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {GUIDE_MARKDOWN}
            </ReactMarkdown>
          </div>
        </Card>

        {/* 2. 토큰 관리 영역 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-amber-600" /> MCP 토큰 발급 및 관리
          </h2>

          {isAuthenticated ? (
            <>
              <Card className="p-6 bg-white border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 block mb-1">토큰 이름 (용도)</label>
                    <Input
                      placeholder="예: Claude Desktop 용"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-1">만료일</label>
                    <Input
                      type="date"
                      value={form.expiresAt}
                      onChange={(e) => setForm({...form, expiresAt: e.target.value})}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCreateToken}
                  disabled={isCreating}
                  className="bg-slate-900 hover:bg-slate-800 text-white w-full md:w-auto"
                >
                  {isCreating ? "발급 중..." : "새 토큰 발급"}
                </Button>
              </Card>

              <Card className="bg-white border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-4 font-semibold">이름</th>
                      <th className="p-4 font-semibold">토큰 Prefix</th>
                      <th className="p-4 font-semibold">만료일</th>
                      <th className="p-4 font-semibold text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400">
                          불러오는 중...
                        </td>
                      </tr>
                    ) : activeTokens.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400">
                          발급된 활성 토큰이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      activeTokens.map((token) => (
                        <tr
                          key={token.tokenId}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="p-4 font-medium text-slate-900">{token.name}</td>
                          <td className="p-4 font-mono text-slate-500">{token.tokenPrefix}...</td>
                          <td className="p-4 text-slate-500">{format(new Date(token.expiresAt), "yyyy-MM-dd")}</td>
                          <td className="p-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteToken(token.tokenId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Card>
            </>
          ) : (
            <Card className="p-10 bg-white border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <KeyRound className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">로그인이 필요합니다</h3>
              <p className="text-slate-500 mb-6 max-w-md leading-relaxed">
                MCP 토큰을 발급받고 개인화된 AI 스킬 매칭을 사용하려면
                <br />
                먼저 로그인을 진행해 주세요.
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-xl transition-all hover:scale-105 shadow-md shadow-blue-500/20"
              >
                로그인 하러 가기
              </Button>
            </Card>
          )}
        </div>

        {/* 3. 새 토큰 발급 완료 모달 */}
        <Dialog open={!!newToken} onOpenChange={(open) => !open && setNewToken(null)}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-green-600 flex items-center gap-2">
                <Check className="w-5 h-5" /> 토큰 발급 성공!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4 text-sm text-slate-600 leading-relaxed">
              <p>새 MCP 토큰이 발급되었습니다.</p>
              <p>
                <strong>이 토큰은 지금 한 번만 확인할 수 있습니다.</strong>
              </p>
              <p>안전한 곳에 복사해 두세요.</p>
              <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 font-mono text-[13px] break-all shadow-inner">
                {newToken}
              </div>
              <Button
                onClick={() => copyToClipboard(newToken!)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11"
              >
                <Copy className="w-4 h-4 mr-2" /> 복사하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageInner>
    </PageLayout>
  );
}
