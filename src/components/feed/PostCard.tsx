'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageSquare, Share2, Bookmark, ShieldAlert, Send } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
import { ReportModal } from '@/components/safety/ReportModal';

interface CommentType {
  id: string;
  content: string;
  createdAt: Date | string;
  author: {
    name: string;
    profile?: { username?: string | null; avatarUrl?: string | null } | null;
  };
}

interface PostCardProps {
  post: {
    id: string;
    content: string;
    type: string;
    imageUrl?: string | null;
    likesCount: number;
    commentsCount: number;
    createdAt: Date | string;
    author: {
      id: string;
      name: string;
      profile?: { username?: string | null; avatarUrl?: string | null } | null;
    };
    community: {
      name: string;
      slug: string;
      icon?: string | null;
    };
    polls?: {
      id: string;
      question: string;
      options: string;
    }[];
    comments?: CommentType[];
  };
  currentUserId?: string;
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [saved, setSaved] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsList, setCommentsList] = useState<CommentType[]>(post.comments || []);
  const [commentInput, setCommentInput] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Poll state
  const poll = post.polls && post.polls.length > 0 ? post.polls[0] : null;
  const pollOptionsList: string[] = poll ? JSON.parse(poll.options || '[]') : [];
  const [selectedPollOpt, setSelectedPollOpt] = useState<number | null>(null);

  const handleLikeToggle = async () => {
    try {
      const res = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
        setLikesCount(data.likesCount);
      }
    } catch {
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          content: commentInput,
        }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setCommentsList([newComment, ...commentsList]);
        setCommentInput('');
      }
    } catch {
      // Optimistic
      const newComment: CommentType = {
        id: Date.now().toString(),
        content: commentInput,
        createdAt: new Date(),
        author: {
          name: 'You',
          profile: { username: 'me', avatarUrl: null },
        },
      };
      setCommentsList([newComment, ...commentsList]);
      setCommentInput('');
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      {/* Author & Community Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.profile?.username || 'user'}`}>
            <img
              src={post.author.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-purple-100 hover:opacity-90"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.author.profile?.username || 'user'}`}
                className="font-bold text-sm text-gray-900 hover:text-purple-600"
              >
                {post.author.name}
              </Link>
              <span className="text-xs text-gray-400">•</span>
              <Link
                href={`/communities/${post.community.slug}`}
                className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full hover:bg-purple-100"
              >
                {post.community.icon || '💬'} {post.community.name}
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        {/* Options / Report */}
        <button
          onClick={() => setReportModalOpen(true)}
          className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Report Post"
        >
          <ShieldAlert className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

        {/* Image Attachment */}
        {post.imageUrl && (
          <div className="rounded-2xl overflow-hidden max-h-96 w-full bg-gray-100">
            <img src={post.imageUrl} alt="Post attachment" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Poll Attachment */}
        {poll && (
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
            <h4 className="font-bold text-sm text-purple-900">{poll.question}</h4>
            <div className="space-y-2">
              {pollOptionsList.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPollOpt(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                    selectedPollOpt === idx
                      ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-md'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedPollOpt === idx && <span className="text-[10px] uppercase font-bold">Voted</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
              liked ? 'text-red-500 font-bold' : 'hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => setCommentsOpen(!commentsOpen)}
            className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-purple-600 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{commentsList.length || post.commentsCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-1.5 rounded-lg transition-colors ${saved ? 'text-purple-600' : 'hover:text-purple-600'}`}
            title="Save post"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-purple-600' : ''}`} />
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="p-1.5 rounded-lg hover:text-purple-600 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comments Drawer */}
      {commentsOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in fade-in duration-200">
          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a supportive comment..."
              className="flex-1 py-2 px-3.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {commentsList.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-2">No comments yet. Start the conversation!</p>
            ) : (
              commentsList.map((c) => (
                <div key={c.id} className="p-3 rounded-2xl bg-gray-50 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{c.author.name}</span>
                    <span className="text-[10px] text-gray-400">{timeAgo(c.createdAt)}</span>
                  </div>
                  <p className="text-gray-700">{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Safety Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetType="POST"
        targetId={post.id}
        targetName={`Post by ${post.author.name}`}
      />
    </div>
  );
}
