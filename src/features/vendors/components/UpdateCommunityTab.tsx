// src/features/vendors/components/UpdateCommunityTab.tsx
import {useState} from "react";
import {MessageCircle, ChevronLeft, CornerDownRight, User, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useCommunity} from "@/features/community/hooks/useCommunity";

// 벤더 상세 페이지에서 props로 vendorId를 넘겨주어야 합니다.
export function UpdateCommunityTab({vendorId}: {vendorId: string}) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{id: number; author: string} | null>(null);

  // 🌟 커스텀 훅을 통해 API 데이터 가져오기
  const {posts, comments, isLoading, createComment, deleteComment} = useCommunity(selectedPostId || undefined);

  // 현재 벤더와 일치하는 게시글만 필터링 (string -> number 변환 주의)
  const vendorPosts = posts?.contents.filter((p) => p.vendorId === Number(vendorId)) || [];

  // 날짜 포맷팅 헬퍼 함수
  const formatDate = (dateString: string) => dateString.split("T");

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    createComment(
      {content: newComment, parentCommentId: replyTo?.id || null},
      {
        onSuccess: () => {
          setNewComment("");
          setReplyTo(null);
        },
      },
    );
  };

  // --- 1. 로딩 상태 ---
  if (isLoading && !posts) {
    return <div className="py-20 text-center text-slate-500 animate-pulse">데이터를 불러오는 중입니다...</div>;
  }

  // --- 2. 목록 뷰 ---
  if (!selectedPostId) {
    return (
      <div className="flex flex-col gap-4 animate-in fade-in duration-300">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-900">최신 업데이트 및 토론</h3>
          <p className="text-sm text-slate-500">모델 변경 사항과 커뮤니티 의견을 확인하세요.</p>
        </div>

        {vendorPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPostId(post.id)}
            className="p-6 rounded-xl border border-slate-200 hover:border-slate-800 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">
                  {post.type === "MODEL_INFO" ? "모델 업데이트" : "일반"}
                </span>
                <h4 className="text-lg font-bold text-slate-900">{post.title}</h4>
              </div>
              <span className="text-sm text-slate-500">{formatDate(post.publishedAt)}</span>
            </div>
            <p className="text-slate-600 mb-4">{post.summary}</p>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <MessageCircle className="h-4 w-4" /> 게시글 보기
            </div>
          </div>
        ))}

        {vendorPosts.length === 0 && (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed rounded-xl">
            등록된 업데이트 소식이 없습니다.
          </div>
        )}
      </div>
    );
  }

  // --- 3. 상세 뷰 및 댓글 ---
  const selectedPost = vendorPosts.find((p) => p.id === selectedPostId);
  const rootComments = comments?.filter((c) => c.parentId === null) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Button variant="ghost" onClick={() => setSelectedPostId(null)} className="mb-6 -ml-4 text-slate-500">
        <ChevronLeft className="h-4 w-4 mr-1" /> 목록으로
      </Button>

      {/* 게시글 본문 */}
      <div className="mb-10 pb-10 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedPost?.title}</h2>
        <p className="text-sm text-slate-500 mb-6">{selectedPost && formatDate(selectedPost.publishedAt)}</p>
        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-lg">
          {selectedPost?.body}
        </div>
      </div>

      {/* 댓글 작성란 */}
      <div className="mb-8 flex flex-col gap-2">
        {replyTo && (
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 rounded-md text-sm">
            <span className="text-slate-600">
              <strong>{replyTo.author}</strong>님에게 답글 작성 중...
            </span>
            <button onClick={() => setReplyTo(null)} className="text-slate-400 hover:text-slate-700">
              취소
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <Input
            placeholder={replyTo ? "답글 내용을 입력하세요." : "업데이트 내용에 대한 의견을 자유롭게 나눠보세요!"}
            className="bg-slate-50"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
          />
          <Button onClick={handleCommentSubmit} className="bg-slate-800 text-white hover:bg-slate-700">
            작성하기
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-6">
        <h4 className="font-bold text-slate-900 mb-4">댓글 {comments?.length || 0}개</h4>

        {rootComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-slate-900 text-sm">{comment.authorName}</span>
                  <span className="text-xs text-slate-500">{formatDate(comment.createdAt)}</span>
                </div>
                {/* 삭제 버튼 (본인 권한 체크는 백엔드에서 에러로 처리하지만, UI상 휴지통 아이콘 제공) */}
                {!comment.deleted && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className={`text-sm mb-2 ${comment.deleted ? "text-slate-400 italic" : "text-slate-700"}`}>
                {comment.deleted ? "삭제된 댓글입니다." : comment.content}
              </p>

              {!comment.deleted && (
                <button
                  onClick={() => setReplyTo({id: comment.id, author: comment.authorName})}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium mb-4"
                >
                  답글 달기
                </button>
              )}

              {/* 대댓글 렌더링 (depth 1) */}
              {comments
                ?.filter((reply) => reply.parentId === comment.id)
                .map((reply) => (
                  <div key={reply.id} className="flex gap-3 mt-3 p-3 bg-slate-50 rounded-lg group/reply">
                    <CornerDownRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-slate-900 text-xs">{reply.authorName}</span>
                          <span className="text-[10px] text-slate-500">{formatDate(reply.createdAt)}</span>
                        </div>
                        {!reply.deleted && (
                          <button
                            onClick={() => deleteComment(reply.id)}
                            className="opacity-0 group-hover/reply:opacity-100 text-red-400 hover:text-red-600 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <p className={`text-xs ${reply.deleted ? "text-slate-400 italic" : "text-slate-700"}`}>
                        {reply.deleted ? "삭제된 댓글입니다." : reply.content}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {comments?.length === 0 && (
          <div className="py-10 flex flex-col items-center text-slate-400">
            <MessageCircle className="h-8 w-8 mb-2 opacity-20" />
            <p>아직 작성된 댓글이 없습니다. 첫 번째 의견을 남겨보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
