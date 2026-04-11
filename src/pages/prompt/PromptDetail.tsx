// src/pages/prompt/PromptDetail.tsx
import {useParams, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ArrowLeft, Copy, Star, GitFork, Globe, Loader2, Terminal, ExternalLink} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {toast} from "sonner";

import {apiClient} from "@/lib/axios";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {type SkillDetail} from "@/types/prompt.types";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

function safeParseContent(mdContent: string = "") {
  const fmRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const contentMatch = mdContent.match(fmRegex);

  if (!contentMatch) {
    return {frontmatter: null, body: mdContent};
  }

  const fmStr = contentMatch[1] ?? "";
  const body = contentMatch[2] ?? "";

  const [, nameRaw = ""] = fmStr.match(/name:\s*(.+)/) ?? [];
  const name = nameRaw.trim() || undefined;

  const [, homepageRaw = ""] = fmStr.match(/homepage:\s*(.+)/) ?? [];
  const homepage = homepageRaw.trim() || undefined;

  let metadataJson = null;
  try {
    const [, metaRaw = ""] = fmStr.match(/metadata:\s*(\{[\s\S]*?\n\s*\})/) ?? [];

    metadataJson = metaRaw ? JSON.parse(metaRaw) : null;
  } catch {
    console.warn("Metadata JSON 파싱 실패");
  }

  return {
    frontmatter: {name, homepage, metadata: metadataJson},
    body,
  };
}

export default function PromptDetail() {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data: prompt, isLoading} = useQuery({
    queryKey: ["prompt-detail", id],
    queryFn: async () => {
      const {data} = await apiClient.get<SkillDetail>(`/api/v1/prompts/skills/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading || !prompt) {
    return (
      <PageLayout>
        <PageInner className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </PageInner>
      </PageLayout>
    );
  }

  const {frontmatter, body} = safeParseContent(prompt.contentMd);
  const openclawMeta = frontmatter?.metadata?.openclaw;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      toast.success("본문이 복사되었습니다!");
    } catch (e) {
      toast.error("복사 실패");
    }
  };

  return (
    <PageLayout className="bg-slate-50 py-10 min-h-screen">
      <PageInner className="max-w-5xl">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="-ml-4 text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> 목록
          </Button>
        </div>

        {/* 🌟 1. 메인 헤더 영역 (기본 정보 통합) */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase">
                  {prompt.category}
                </Badge>
                <span className="text-xs text-slate-400">ID: {prompt.id}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 break-keep mb-4">{prompt.name}</h1>

              <p className="text-slate-600 text-lg mb-5">{prompt.summary}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {prompt.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 🌟 통합된 기본 정보 영역 (태그 하단에 배치) */}
              <div className="flex flex-col gap-3 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 w-16">저장소</span>
                  <a
                    href={prompt.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium flex items-center gap-1.5 text-slate-700 hover:text-blue-600 hover:underline"
                  >
                    <Globe className="w-4 h-4" /> {prompt.repositoryName}
                  </a>
                </div>
                {frontmatter?.homepage && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 w-16">홈페이지</span>
                    <a
                      href={frontmatter.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1.5 break-all"
                    >
                      <ExternalLink className="w-4 h-4" /> {frontmatter.homepage}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 수치 정보 (Star, Fork) */}
            <div className="flex gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 shrink-0 h-fit">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Stars</p>
                <div className="flex items-center justify-center gap-1.5 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-xl font-bold text-slate-800">{prompt.stars.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Forks</p>
                <div className="flex items-center justify-center gap-1.5 text-blue-500">
                  <GitFork className="w-5 h-5" />
                  <span className="text-xl font-bold text-slate-800">{prompt.forks.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 (선택 사항) 설치 가이드가 있는 경우 단독 블록으로 표시 */}
        {openclawMeta && (
          <Card className="p-6 bg-slate-900 text-white border-none shadow-sm mb-8">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-300">
              <Terminal className="w-4 h-4" /> 설치 가이드
            </h3>
            <div className="space-y-3">
              {openclawMeta.install?.map((inst: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <p className="text-[11px] font-medium text-slate-400">{inst.label}</p>
                  <div className="bg-black/40 p-3 rounded-md font-mono text-sm text-pink-400 border border-white/10 break-words flex items-center gap-2">
                    <span className="select-none text-slate-600">$</span>
                    {inst.kind} get {inst.module}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 🌟 2. 본문 (SKILL.md) 렌더링 */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-800">
            <span className="text-slate-200 font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4" /> SKILL.md
            </span>
            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-white/10 hover:bg-white/20 text-white border-none transition-colors h-8"
            >
              <Copy className="w-3.5 h-3.5 mr-2" /> 복사
            </Button>
          </div>

          <div className="p-6 md:p-10 overflow-x-auto bg-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => (
                  <h1
                    className="text-3xl md:text-4xl font-bold mt-8 mb-4 pb-2 border-b border-slate-200 text-slate-900"
                    {...props}
                  />
                ),
                h2: ({node, ...props}) => (
                  <h2
                    className="text-2xl md:text-3xl font-bold mt-8 mb-4 pb-2 border-b border-slate-200 text-slate-900"
                    {...props}
                  />
                ),
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-slate-900" {...props} />,
                p: ({node, ...props}) => (
                  <p className="mb-5 text-base text-slate-700 leading-relaxed break-keep" {...props} />
                ),
                ul: ({node, ...props}) => (
                  <ul className="list-disc ml-6 mb-5 space-y-1.5 text-slate-700 marker:text-slate-400" {...props} />
                ),
                ol: ({node, ...props}) => (
                  <ol className="list-decimal ml-6 mb-5 space-y-1.5 text-slate-700 marker:text-slate-400" {...props} />
                ),
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote
                    className="border-l-4 border-slate-300 pl-4 italic text-slate-600 bg-slate-50 py-3 pr-4 rounded-r-lg mb-5"
                    {...props}
                  />
                ),
                a: ({node, ...props}) => (
                  <a
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto mb-6 w-full rounded-lg border border-slate-200">
                    <table className="w-full border-collapse text-sm text-left" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-slate-50 text-slate-700" {...props} />,
                th: ({node, ...props}) => (
                  <th
                    className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900 whitespace-nowrap"
                    {...props}
                  />
                ),
                td: ({node, ...props}) => (
                  <td className="border-b border-slate-200 px-4 py-3 text-slate-700" {...props} />
                ),
                tr: ({node, ...props}) => (
                  <tr className="last:border-b-0 hover:bg-slate-50/50 transition-colors" {...props} />
                ),
                code({node, inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus as any}
                      language={match}
                      PreTag="div"
                      className="rounded-xl !mt-4 !mb-6 text-[13px] md:text-sm border border-slate-800"
                      showLineNumbers={true}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-slate-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {body.replace(/\\n/g, "\n")}
            </ReactMarkdown>
          </div>
        </Card>
      </PageInner>
    </PageLayout>
  );
}