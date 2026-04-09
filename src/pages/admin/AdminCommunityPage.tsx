// src/pages/admin/AdminCommunityPage.tsx
import {useState} from "react";
import {useAdminCommunity} from "@/features/community/hooks/useAdminCommunity";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {type CommunityPost, type PostStatus, type PostType} from "@/features/community/types/community.types";
import {format} from "date-fns";
import {toast} from "sonner";
import {ExternalLink} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

export default function AdminCommunityPage() {
  const [filter, setFilter] = useState<PostStatus | "ALL">("ALL");
  const {posts, isLoading, generatePost, updatePost, changeStatus, deletePost} = useAdminCommunity(filter);

  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  // 🌟 editForm 상태 변경
  const [editForm, setEditForm] = useState({title: "", summary: "", sourceUrl: ""});

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateForm, setGenerateForm] = useState<{type: PostType; targetDate: string; vendorId: string}>({
    type: "MODEL_INFO",
    targetDate: format(new Date(), "yyyy-MM-dd"),
    vendorId: "",
  });

  const openEditModal = (post: CommunityPost) => {
    setSelectedPost(post);
    // 🌟 모달을 열 때 sourceUrl 값을 주입 (null 방지용 빈 문자열 처리)
    setEditForm({title: post.title, summary: post.summary || "", sourceUrl: post.sourceUrl || ""});
  };

  const handleUpdate = () => {
    if (!selectedPost) return;
    updatePost({id: selectedPost.id, payload: editForm}, {onSuccess: () => setSelectedPost(null)});
  };

  const handleStatusChange = (status: PostStatus) => {
    if (!selectedPost) return;
    changeStatus({id: selectedPost.id, status}, {onSuccess: () => setSelectedPost(null)});
  };

  const handleGenerateSubmit = () => {
    if (generateForm.type === "MODEL_INFO" && !generateForm.vendorId) {
      toast.error("MODEL_INFO 타입은 벤더 ID를 반드시 입력해야 합니다.");
      return;
    }

    generatePost(
      {
        type: generateForm.type,
        targetDate: generateForm.targetDate,
        vendorId: generateForm.type === "MODEL_INFO" ? Number(generateForm.vendorId) : undefined,
      },
      {
        onSuccess: () => {
          setIsGenerateModalOpen(false);
          setGenerateForm({...generateForm, vendorId: ""});
        },
      },
    );
  };

  return (
    <PageLayout className="bg-slate-50 pt-10 pb-20 min-h-screen">
      <PageInner className="max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">커뮤니티 관리 콘솔</h1>
            <p className="text-slate-500 mt-2">게시글 검수, 수정 및 발행 상태를 관리합니다.</p>
          </div>
          <Button onClick={() => setIsGenerateModalOpen(true)} className="bg-amber-600 hover:bg-amber-700">
            + 새 게시글 자동 생성
          </Button>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
          {["ALL", "PENDING_REVIEW", "PUBLISHED", "REJECTED", "HIDDEN"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${
                filter === status ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* 데이터 테이블 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="p-20 text-center text-slate-400 animate-pulse">데이터를 불러오는 중...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">상태</th>
                  <th className="p-4 font-semibold">타입</th>
                  <th className="p-4 font-semibold">제목</th>
                  <th className="p-4 font-semibold">생성일</th>
                  <th className="p-4 font-semibold text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {posts?.contents?.map((post) => (
                  <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 text-slate-500">{post.id}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          post.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : post.status === "PENDING_REVIEW"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{post.type}</td>
                    <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                      <span className="line-clamp-1">{post.title}</span>
                      {/* 🌟 원본 링크가 있으면 클릭할 수 있는 아이콘 렌더링 */}
                      {post.sourceUrl && (
                        <a
                          href={post.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                    <td className="p-4 text-slate-500">{format(new Date(post.createdAt), "yyyy-MM-dd")}</td>
                    <td className="p-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(post)}>
                        검수 / 수정
                      </Button>
                    </td>
                  </tr>
                ))}
                {posts?.contents?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500">
                      조건에 맞는 게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* 1. 자동 생성 모달 */}
        <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>새 게시글 자동 생성</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">게시글 타입</label>
                <select
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  value={generateForm.type}
                  onChange={(e) => setGenerateForm({...generateForm, type: e.target.value as PostType})}
                >
                  <option value="MODEL_INFO">AI 모델 정보 (MODEL_INFO)</option>
                  <option value="GENERAL">일반 소식 (GENERAL)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">대상 날짜 (Target Date)</label>
                <Input
                  type="date"
                  value={generateForm.targetDate}
                  onChange={(e) => setGenerateForm({...generateForm, targetDate: e.target.value})}
                />
              </div>

              {generateForm.type === "MODEL_INFO" && (
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-1">벤더 ID (숫자)</label>
                  <Input
                    type="number"
                    placeholder="예: 10"
                    value={generateForm.vendorId}
                    onChange={(e) => setGenerateForm({...generateForm, vendorId: e.target.value})}
                  />
                  <p className="text-xs text-slate-500 mt-1">* 백엔드 원천 데이터를 긁어올 대상 벤더의 ID입니다.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
                취소
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleGenerateSubmit}>
                생성 요청하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 2. 기존 검수/수정 모달 */}
        {/* 2. 기존 검수/수정 모달 */}
        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>게시글 검수 및 관리</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">제목</label>
                <Input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} />
              </div>
              {/* 🌟 요약을 Textarea로 변경하여 넓은 영역 확보 */}
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">요약</label>
                <Textarea
                  className="min-h-[150px] leading-relaxed"
                  value={editForm.summary}
                  onChange={(e) => setEditForm({...editForm, summary: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">원본 링크 (Source URL)</label>
                <Input
                  placeholder="https://..."
                  value={editForm.sourceUrl}
                  onChange={(e) => setEditForm({...editForm, sourceUrl: e.target.value})}
                />
              </div>
            </div>

            {/* 상태 변경 및 저장 액션 영역 */}
            <div className="flex justify-between border-t border-slate-100 pt-4 mt-4">
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (selectedPost) {
                      deletePost(selectedPost.id, {onSuccess: () => setSelectedPost(null)});
                    }
                  }}
                >
                  삭제 (HIDDEN)
                </Button>
                <Button
                  variant="outline"
                  className="text-amber-600 border-amber-200 hover:bg-amber-50"
                  onClick={() => handleStatusChange("REJECTED")}
                >
                  반려 (REJECTED)
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleUpdate}>
                  내용만 저장
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleStatusChange("PUBLISHED")}
                >
                  발행 승인 (PUBLISHED)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PageInner>
    </PageLayout>
  );
}
