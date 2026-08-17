'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Bell, CheckCircle2, MessageSquare, Heart, Users, Calendar, ShieldCheck } from 'lucide-react';
import { timeAgo } from '@/lib/utils';
import Link from 'next/link';

interface NotificationType {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: Date | string;
  actor?: {
    name: string;
    profile?: { avatarUrl?: string | null } | null;
  } | null;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setNotifications(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications', { method: 'PATCH' });
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch {
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'CONNECTION': return <Users className="w-4 h-4 text-purple-600" />;
      case 'COMMENT': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'LIKE': return <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
      case 'EVENT': return <Calendar className="w-4 h-4 text-orange-500" />;
      default: return <Bell className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
            <p className="text-xs text-gray-500">Updates from your connections, circles, and activities</p>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All as Read
          </button>
        </div>

        {/* Notifications Feed */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
          {loading ? (
            <p className="p-6 text-xs text-gray-400 italic text-center">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-gray-300" />
              <p>You have no notifications yet.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-5 flex items-start gap-4 transition-colors ${
                  !n.isRead ? 'bg-purple-50/40' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm shrink-0">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-gray-900">{n.title}</h4>
                    <span className="text-[10px] text-gray-400">{timeAgo(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{n.message}</p>
                  {n.link && (
                    <Link href={n.link} className="inline-block pt-1 text-xs font-bold text-purple-600 hover:underline">
                      View details →
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
