import {useState} from "react";
import {useNavigate} from "react-router-dom"; // 🌟 네비게이트 추가
import {MessageCircle, ChevronLeft, CornerDownRight, User, Trash2, ExternalLink} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useCommunity} from "@/features/community/hooks/useCommunity";
import {useAuthStore} from "@/features/auth/stores/authStore"; // 🌟 인증 스토어 추가

export function UpdateCommunityTab({vendorId}: {vendorId: string}) {
  const navigate = useNavigate();
  const {user} = useAuthStore(); // 🌟 로그인 여부 확인
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{id: number; author: string} | null>(null);

  const {posts, comments, isLoading, createComment, deleteComment} = useCommunity(selectedPostId || undefined);

  const vendorPosts = posts?.contents
    ? [...posts.contents] // 원본 배열 변조 방지를 위해 복사본 생성
        .filter((p) => p.vendorId === Number(vendorId))
        .sort((a, b) => new Date(b.targetDate).getTime() - new Date(a.targetDate).getTime())
    : [];

  // 🌟 에러 방지: dateString이 null인 경우를 대비한 방어 로직 추가
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "날짜 정보 없음";
    return dateString.split("T");
  };

  const handleCommentSubmit = () => {
    if (!user) return; // 로그인 안 했으면 실행 방지
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

  if (isLoading && !posts) {
    return <div className="py-20 text-center text-slate-500 animate-pulse">데이터를 불러오는 중입니다...</div>;
  }

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
            className="p-6 rounded-xl border border-slate-200 hover:border-slate-800 cursor-pointer transition-colors bg-white shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">
                  {post.type === "MODEL_INFO" ? "모델 업데이트" : "일반"}
                </span>
                <h4 className="text-lg font-bold text-slate-900">{post.title}</h4>
              </div>
              <span className="text-sm text-slate-500">{post.targetDate}</span>
            </div>
            <p className="text-slate-600 mb-4 line-clamp-2">{post.summary}</p>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
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

  const selectedPost = vendorPosts.find((p) => p.id === selectedPostId);
  const rootComments = comments?.filter((c) => c.parentId === null) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Button variant="ghost" onClick={() => setSelectedPostId(null)} className="mb-6 -ml-4 text-slate-500">
        <ChevronLeft className="h-4 w-4 mr-1" /> 목록으로
      </Button>

      <div className="mb-10 pb-10 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedPost?.title}</h2>
        <p className="text-sm text-slate-500 mb-6">{selectedPost && formatDate(selectedPost.publishedAt)}</p>

        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-lg mb-4 text-[15px]">
          {selectedPost?.summary}
        </div>

        {selectedPost?.sourceUrl && (
          <a
            href={selectedPost.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-medium text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> 원본 업데이트 문서 보러가기
          </a>
        )}
      </div>

      {/* 🌟 댓글 작성란 (비로그인 상태 대응) */}
      <div className="mb-8 flex flex-col gap-2 relative">
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

        <div className="flex gap-2 relative">
          {/* 비로그인 시 덮어씌울 오버레이 레이어 */}
          {!user && (
            <div
              className="absolute inset-0 z-10 bg-slate-50/40 backdrop-blur-[1px] rounded-md flex items-center justify-center cursor-pointer group"
              onClick={() => navigate("/login")}
            >
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-xs font-bold text-slate-600">로그인 후 대화에 참여해보세요</span>
              </div>
            </div>
          )}

          <Input
            disabled={!user}
            placeholder={!user ? "" : replyTo ? "답글 내용을 입력하세요." : "의견을 나눠보세요!"}
            className="bg-slate-50"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
          />
          <Button
            disabled={!user}
            onClick={handleCommentSubmit}
            className="bg-slate-800 text-white hover:bg-slate-700 shrink-0"
          >
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
                {/* 작성자 본인 확인 로직이 필요하다면 user?.name === comment.authorName 등으로 필터 가능 */}
                {!comment.deleted && user && (
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

              {!comment.deleted && user && (
                <button
                  onClick={() => setReplyTo({id: comment.id, author: comment.authorName})}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium mb-4"
                >
                  답글 달기
                </button>
              )}

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
                        {!reply.deleted && user && (
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
