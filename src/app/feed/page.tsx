import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostCard } from '@/components/feed/PostCard';
import { Sparkles, Users, Calendar, Plus, Compass } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function FeedPage() {
  let user = null;
  let posts: any[] = [];
  let joinedCommunities: any[] = [];
  let upcomingActivities: any[] = [];

  try {
    user = await getSessionUser();

    posts = await db.post.findMany({
      take: 25,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { include: { profile: true } },
        community: true,
        comments: {
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: { author: { include: { profile: true } } },
        },
        polls: true,
      },
    });

    joinedCommunities = await db.community.findMany({
      take: 6,
      orderBy: { memberCount: 'desc' },
    });

    upcomingActivities = await db.activity.findMany({
      take: 4,
      orderBy: { activityDate: 'asc' },
    });
  } catch (err) {
    console.error('Error fetching feed data:', err);
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Shortcuts */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{user?.name}</h4>
                  <p className="text-xs text-gray-400">@{user?.username || 'user'}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs font-semibold text-gray-600">
                <Link href="/feed" className="flex items-center gap-2 p-2 rounded-xl bg-purple-50 text-purple-700">
                  <Sparkles className="w-4 h-4 text-purple-600" /> Community Feed
                </Link>
                <Link href="/discover" className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 hover:text-gray-900">
                  <Compass className="w-4 h-4 text-gray-400" /> Discover People
                </Link>
                <Link href="/communities" className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 hover:text-gray-900">
                  <Users className="w-4 h-4 text-gray-400" /> My Circles
                </Link>
                <Link href="/activities" className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 hover:text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-400" /> My Activities
                </Link>
              </div>
            </div>

            {/* Popular Circles */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Top Circles</h4>
              <div className="space-y-2">
                {joinedCommunities.map((c) => (
                  <Link
                    key={c.id}
                    href={`/communities/${c.slug}`}
                    className="flex items-center justify-between p-2 rounded-2xl hover:bg-purple-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.icon || '💬'}</span>
                      <span className="text-xs font-bold text-gray-800 group-hover:text-purple-600 truncate">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{c.memberCount}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Center Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Feed Header */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="font-extrabold text-xl text-gray-900">Community Feed</h1>
                <p className="text-xs text-gray-500">Live posts & discussions from your circles</p>
              </div>
              <Link
                href="/communities"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Join More Circles
              </Link>
            </div>

            {/* Feed Posts List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={user?.id} />
              ))}
            </div>

          </div>

          {/* Right Sidebar Widgets */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Upcoming Hangouts</h4>
                <Link href="/activities" className="text-xs text-purple-600 font-bold hover:underline">View All</Link>
              </div>

              <div className="space-y-3">
                {upcomingActivities.map((act) => (
                  <div key={act.id} className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 line-clamp-1">{act.title}</span>
                      <span className="text-[10px] text-purple-600 font-bold">{act.category}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{new Date(act.activityDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
