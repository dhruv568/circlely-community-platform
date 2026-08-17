import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { MapPin, Calendar, Users, Sparkles, MessageSquare, ShieldAlert, Settings, Heart } from 'lucide-react';
import Link from 'next/link';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const currentUser = await getSessionUser();
  const { username } = await params;

  let targetUsername = username;
  if (username === 'me' && currentUser) {
    targetUsername = currentUser.username;
  }

  const profile = await db.profile.findUnique({
    where: { username: targetUsername },
    include: {
      user: {
        include: {
          userInterests: { include: { interest: true } },
          communityMemberships: { include: { community: true } },
          createdActivities: true,
          createdEvents: true,
        },
      },
    },
  });

  if (!profile) notFound();

  const isSelf = currentUser?.userId === profile.userId;

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={currentUser} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          {/* Cover accent */}
          <div className="h-36 gradient-bg w-full relative"></div>

          <div className="p-6 sm:p-8 pt-0 relative space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
              
              {/* Avatar & Name */}
              <div className="flex items-end gap-4">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
                  alt={profile.user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
                <div className="mb-2">
                  <h1 className="text-2xl font-extrabold text-gray-900">{profile.user.name}</h1>
                  <p className="text-sm font-bold text-purple-600">@{profile.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isSelf ? (
                  <Link
                    href="/settings"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" /> Edit Profile
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/messages"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg shadow-md flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Message
                    </Link>
                  </>
                )}
              </div>

            </div>

            {/* Meta details */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600 pt-2 border-t border-gray-100">
              {profile.showCity && profile.city && (
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-purple-500" /> {profile.city}
                </span>
              )}
              {profile.showAge && profile.ageGroup && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-purple-500" /> Age Group: {profile.ageGroup}
                </span>
              )}
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-purple-500" /> Member of {profile.user.communityMemberships.length} Circles
              </span>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{profile.bio}</p>
              </div>
            )}

          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" /> Interests & Passions
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.user.userInterests.map((ui) => (
              <span
                key={ui.id}
                className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-100"
              >
                {ui.interest.icon} {ui.interest.name}
              </span>
            ))}
          </div>
        </div>

        {/* Communities Joined Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" /> Circles Joined ({profile.user.communityMemberships.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.user.communityMemberships.map((cm) => (
              <Link
                key={cm.id}
                href={`/communities/${cm.community.slug}`}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-purple-50 transition-colors flex items-center gap-3 group"
              >
                <span className="text-2xl">{cm.community.icon || '💬'}</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-600">{cm.community.name}</h4>
                  <p className="text-xs text-gray-500">{cm.community.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      <MobileBottomNav user={currentUser} />
    </div>
  );
}
