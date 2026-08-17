import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ActivityCard } from '@/components/activity/ActivityCard';
import { Sparkles, Calendar } from 'lucide-react';

interface ActivitiesPageProps {
  searchParams: Promise<{
    category?: string;
    type?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ActivitiesPage({ searchParams }: ActivitiesPageProps) {
  let user = null;
  let activities: any[] = [];

  const { category, type } = await searchParams;

  const whereClause: any = {};
  if (category && category !== 'All') whereClause.category = category;
  if (type === 'online') whereClause.isOnline = true;
  if (type === 'offline') whereClause.isOnline = false;

  try {
    user = await getSessionUser();
    activities = await db.activity.findMany({
      where: whereClause,
      orderBy: { activityDate: 'asc' },
      include: {
        community: { select: { name: true, slug: true } },
        creator: { include: { profile: true } },
      },
    });
  } catch (err) {
    console.error('Error fetching activities:', err);
  }

  const categories = ['All', 'Games', 'Discussions', 'Fitness', 'Workshops', 'Creative', 'Travel', 'Networking'];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Group Activities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Participate in Interactive Hangouts</h1>
          <p className="text-gray-600 text-sm max-w-2xl">
            From online game nights to weekend hiking sessions, join member-led activities.
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = (category || 'All') === cat;
              return (
                <a
                  key={cat}
                  href={`/activities?category=${encodeURIComponent(cat)}${type ? `&type=${type}` : ''}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/activities?type=all${category ? `&category=${category}` : ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${!type || type === 'all' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
            >
              All Types
            </a>
            <a
              href={`/activities?type=online${category ? `&category=${category}` : ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${type === 'online' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
            >
              🌐 Online
            </a>
            <a
              href={`/activities?type=offline${category ? `&category=${category}` : ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${type === 'offline' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
            >
              📍 Offline
            </a>
          </div>

        </div>

        {/* Activity Cards */}
        {activities.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No activities found</h3>
            <p className="text-sm text-gray-500">Check back soon for new member hangouts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((act) => (
              <ActivityCard key={act.id} activity={act} />
            ))}
          </div>
        )}

      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
