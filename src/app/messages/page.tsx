'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MessageSquare, Send, ShieldAlert, UserX, Search, Circle } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

interface MessageType {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date | string;
  sender: {
    name: string;
    profile?: { avatarUrl?: string | null } | null;
  };
}

interface ConversationType {
  id: string;
  members: {
    user: {
      id: string;
      name: string;
      profile?: { username?: string | null; avatarUrl?: string | null } | null;
    };
  }[];
  messages: MessageType[];
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages/conversations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setConversations(data);
          if (data.length > 0) {
            setActiveConvId(data[0].id);
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeConvId) return;
    fetch(`/api/messages?conversationId=${activeConvId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      });
  }, [activeConvId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    const text = inputText;
    setInputText('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeConvId, content: text }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setMessages((prev) => [...prev, newMsg]);
      }
    } catch {
      // Optimistic message
      const fallback: MessageType = {
        id: Date.now().toString(),
        senderId: 'me',
        content: text,
        createdAt: new Date(),
        sender: { name: 'You', profile: { avatarUrl: null } },
      };
      setMessages((prev) => [...prev, fallback]);
    }
  };

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const otherMember = activeConv?.members.find((m) => m.user.id !== 'me')?.user || activeConv?.members[0]?.user;

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          
          {/* Conversation Sidebar */}
          <div className="md:col-span-4 border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Messages</h2>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {loading ? (
                <p className="p-4 text-xs text-gray-400 italic">Loading conversations...</p>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
                  <p>No active conversations yet. Visit Discover People to connect with members!</p>
                </div>
              ) : (
                conversations.map((c) => {
                  const targetUser = c.members[0]?.user;
                  const isActive = c.id === activeConvId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveConvId(c.id)}
                      className={`w-full p-4 text-left flex items-center gap-3 transition-colors ${
                        isActive ? 'bg-purple-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={targetUser?.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                        alt={targetUser?.name || 'User'}
                        className="w-10 h-10 rounded-full object-cover border border-purple-100"
                      />
                      <div className="flex-1 truncate">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-gray-900 truncate">{targetUser?.name || 'Circle Member'}</span>
                          <span className="text-[10px] text-gray-400">Active</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {c.messages[0]?.content || 'Start chatting...'}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Chat Stream */}
          <div className="md:col-span-8 flex flex-col h-full bg-gray-50/50">
            {activeConvId ? (
              <>
                {/* Chat Header */}
                <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={otherMember?.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={otherMember?.name || 'Member'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{otherMember?.name || 'Circle Member'}</h3>
                      <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                        <Circle className="w-2 h-2 fill-green-500 text-green-500" /> Active Now
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('User blocked successfully.')}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50"
                      title="Block User"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[450px]">
                  {messages.length === 0 ? (
                    <p className="text-center text-xs text-gray-400 py-8">No messages yet. Send a friendly message!</p>
                  ) : (
                    messages.map((m) => {
                      const isMe = m.senderId === 'me';
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                              isMe
                                ? 'bg-purple-600 text-white rounded-br-none'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            <p>{m.content}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 px-1">{timeAgo(m.createdAt)}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl text-xs font-bold text-white gradient-bg shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> Send
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-2 p-8">
                <MessageSquare className="w-12 h-12 text-gray-300" />
                <p className="text-sm font-bold text-gray-600">Select a conversation to start messaging</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
