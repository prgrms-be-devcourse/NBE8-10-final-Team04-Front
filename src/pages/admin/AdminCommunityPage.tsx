import {useState} from "react";
import {useAdminCommunity} from "@/features/community/hooks/useAdminCommunity";
import {PageLayout, PageInner} from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {type CommunityPost, type PostStatus} from "@/features/community/types/community.types";
import {format} from "date-fns";

export default function AdminCommunityPage() {
  const [filter, setFilter] = useState<PostStatus | "ALL">("ALL");
  const {posts, isLoading, generatePost, updatePost, changeStatus} = useAdminCommunity(filter);

  // 모달 제어용 상태
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [editForm, setEditForm] = useState({title: "", summary: "", body: ""});

  const openEditModal = (post: CommunityPost) => {
    setSelectedPost(post);
    setEditForm({title: post.title, summary: post.summary, body: post.body});
  };

  const handleUpdate = () => {
    if (!selectedPost) return;
    updatePost(
      {id: selectedPost.id, payload: editForm},
      {
        onSuccess: () => setSelectedPost(null),
      },
    );
  };

  const handleStatusChange = (status: PostStatus) => {
    if (!selectedPost) return;
    changeStatus(
      {id: selectedPost.id, status},
      {
        onSuccess: () => setSelectedPost(null),
      },
    );
  };

  // 테스트용 자동 생성 핸들러
  const handleGenerateMock = () => {
    generatePost({type: "MODEL_INFO", targetDate: "2026-04-09", vendorId: 10});
  };

  return (
    <PageLayout className="bg-slate-50 pt-10 pb-20 min-h-screen">
      <PageInner className="max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">커뮤니티 관리 콘솔</h1>
            <p className="text-slate-500 mt-2">게시글 검수, 수정 및 발행 상태를 관리합니다.</p>
          </div>
          <Button onClick={handleGenerateMock} className="bg-amber-600 hover:bg-amber-700">
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
                {posts?.contents.map((post) => (
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
                    <td className="p-4 font-medium text-slate-900">{post.title}</td>
                    <td className="p-4 text-slate-500">{format(new Date(post.createdAt), "yyyy-MM-dd")}</td>
                    <td className="p-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(post)}>
                        검수 / 수정
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 검수/수정 모달 */}
        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>게시글 검수 및 관리</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 my-4">
              <div>
                <label className="text-sm font-bold text-slate-700">제목</label>
                <Input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">요약</label>
                <Input value={editForm.summary} onChange={(e) => setEditForm({...editForm, summary: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">본문 (Markdown)</label>
                <Textarea
                  className="min-h-[200px]"
                  value={editForm.body}
                  onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                />
              </div>
            </div>

            {/* 상태 변경 및 저장 액션 영역 */}
            <div className="flex justify-between border-t border-slate-100 pt-4 mt-4">
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => handleStatusChange("HIDDEN")}>
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
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange("PUBLISHED")}>
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
