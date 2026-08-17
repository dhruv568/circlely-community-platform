import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostCard } from '@/components/feed/PostCard';
import { Users, ShieldCheck, Sparkles, Plus, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CommunityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  let user = null;
  let community: any = null;
  let isJoined = false;

  const { slug } = await params;

  try {
    user = await getSessionUser();
    community = await db.community.findUnique({
      where: { slug },
      include: {
        creator: { include: { profile: true } },
        members: {
          take: 12,
          include: { user: { include: { profile: true } } },
        },
        posts: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: {
            author: { include: { profile: true } },
            comments: {
              take: 3,
              orderBy: { createdAt: 'desc' },
              include: { author: { include: { profile: true } } },
            },
            polls: true,
            community: true,
          },
        },
        activities: { take: 4, orderBy: { activityDate: 'asc' } },
        events: { take: 4, orderBy: { startDate: 'asc' } },
      },
    });

    if (community && user) {
      const member = await db.communityMember.findUnique({
        where: {
          communityId_userId: {
            communityId: community.id,
            userId: user.id,
          },
        },
      });
      isJoined = !!member;
    }
  } catch (err) {
    console.error('Error loading community detail:', err);
  }

  if (!community) notFound();

  const rulesList: string[] = community.rules ? JSON.parse(community.rules) : [];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <Link href="/communities" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Circles
        </Link>

        {/* Cover Header */}
        <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-xl bg-gray-900">
          <img
            src={community.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'}
            alt={community.name}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-lg border-2 border-white text-gray-900">
                {community.icon || '💬'}
              </div>
              <div>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-600 mb-1 inline-block">
                  {community.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold">{community.name}</h1>
                <p className="text-xs text-purple-200 font-medium">{community.memberCount} members • {community.ageGroup}</p>
              </div>
            </div>

            <button
              className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                isJoined
                  ? 'bg-white/20 text-white backdrop-blur-md border border-white/40 hover:bg-white/30'
                  : 'bg-white text-purple-700 hover:bg-purple-50'
              }`}
            >
              {isJoined ? 'Joined Circle' : '+ Join Circle'}
            </button>
          </div>
        </div>

        {/* 2-Col Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
              <h2 className="font-bold text-lg text-gray-900">About {community.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{community.description}</p>
            </div>

            <div className="space-y-6">
              <h2 className="font-bold text-lg text-gray-900">Discussions ({community.posts.length})</h2>
              {community.posts.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center text-sm text-gray-500">
                  No posts yet in this circle. Be the first to start a conversation!
                </div>
              ) : (
                community.posts.map((post: any) => (
                  <PostCard key={post.id} post={post} currentUserId={user?.id} />
                ))
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Rules Box */}
            {rulesList.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-base text-gray-900">Circle Guidelines</h3>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  {rulesList.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-purple-600">{i + 1}.</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Members Preview */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-gray-900">Members ({community.memberCount})</h3>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {community.members.map((m: any) => (
                  <Link
                    key={m.id}
                    href={`/profile/${m.user.profile?.username || 'user'}`}
                    className="flex flex-col items-center group"
                    title={m.user.name}
                  >
                    <img
                      src={m.user.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={m.user.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-100 group-hover:scale-105 transition-transform"
                    />
                  </Link>
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
