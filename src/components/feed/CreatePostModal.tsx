'use client';

import { useState } from 'react';
import { X, Image as ImageIcon, BarChart2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  communityName: string;
  onPostCreated?: () => void;
}

export function CreatePostModal({ isOpen, onClose, communityId, communityName, onPostCreated }: CreatePostModalProps) {
  const [postType, setPostType] = useState<'TEXT' | 'IMAGE' | 'POLL'>('TEXT');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handlePollOptionChange = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communityId,
          content,
          type: postType,
          imageUrl: postType === 'IMAGE' ? imageUrl : undefined,
          pollQuestion: postType === 'POLL' ? pollQuestion : undefined,
          pollOptions: postType === 'POLL' ? pollOptions.filter((o) => o.trim() !== '') : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create post');
      }

      setContent('');
      setImageUrl('');
      setPollQuestion('');
      setPollOptions(['', '']);
      if (onPostCreated) onPostCreated();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">Create Post</h3>
            <p className="text-xs text-purple-600 font-medium">Posting in: {communityName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Post Type Selector */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPostType('TEXT')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              postType === 'TEXT' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Text
          </button>
          <button
            type="button"
            onClick={() => setPostType('IMAGE')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              postType === 'IMAGE' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Image
          </button>
          <button
            type="button"
            onClick={() => setPostType('POLL')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              postType === 'POLL' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Poll
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Share something with your circle..."
            className="w-full p-3.5 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
          ></textarea>

          {postType === 'IMAGE' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          )}

          {postType === 'POLL' && (
            <div className="space-y-3 p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Poll Question</label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="Ask your community..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Poll Options</label>
                {pollOptions.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => handlePollOptionChange(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="w-full p-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none"
                  />
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-xs text-purple-600 font-bold hover:underline"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white gradient-bg shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
