import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { Compass, Users, MapPin, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface DiscoverPageProps {
  searchParams: Promise<{
    city?: string;
    ageGroup?: string;
    search?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  let user = null;
  let people: any[] = [];

  const { city, ageGroup, search } = await searchParams;

  const whereClause: any = {
    profile: { isPublic: true },
  };

  if (city && city !== 'All') whereClause.profile.city = city;
  if (ageGroup && ageGroup !== 'All') whereClause.profile.ageGroup = ageGroup;
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { profile: { bio: { contains: search } } },
    ];
  }

  try {
    user = await getSessionUser();
    if (user) {
      whereClause.id = { not: user.id };
    }
    people = await db.user.findMany({
      where: whereClause,
      take: 24,
      include: {
        profile: true,
        userInterests: { include: { interest: true } },
      },
    });
  } catch (err) {
    console.error('Error fetching discover people:', err);
  }

  const cities = ['All', 'San Francisco', 'New York', 'Seattle', 'Austin', 'Chicago', 'Los Angeles', 'Denver', 'London', 'Dubai'];
  const ageGroups = ['All', '18-24', '25-34', '35-49', '50-64', '65+'];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Friendship & Community Discovery
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Discover Like-Minded People</h1>
          <p className="text-gray-600 text-sm max-w-2xl">
            Find adult members who share your passions, hobbies, and city. Build your personal circle.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FilterSelect
            name="city"
            label="City Filter"
            defaultValue={city || 'All'}
            options={cities}
          />

          <FilterSelect
            name="ageGroup"
            label="Age Bracket Filter"
            defaultValue={ageGroup || 'All'}
            options={ageGroups}
          />
        </div>

        {/* People Grid */}
        {people.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
            <Compass className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No members found</h3>
            <p className="text-sm text-gray-500">Try broadening your city or age filter settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={p.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={p.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-100"
                    />
                    <div>
                      <h3 className="font-bold text-base text-gray-900">{p.name}</h3>
                      <p className="text-xs text-purple-600 font-semibold">@{p.profile?.username || 'user'}</p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{p.profile?.city || 'San Francisco'}</span>
                        <span>•</span>
                        <span>{p.profile?.ageGroup || '25-34'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {p.profile?.bio || 'Circlely community member exploring new activities and circles.'}
                  </p>

                  {/* Interest Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.userInterests.map((ui: any) => (
                      <span
                        key={ui.id}
                        className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-100"
                      >
                        {ui.interest.icon} {ui.interest.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connect Action */}
                <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/profile/${p.profile?.username || 'user'}`}
                    className="flex-1 py-2 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center"
                  >
                    View Profile
                  </Link>

                  <button
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white gradient-bg shadow-sm flex items-center justify-center gap-1.5 hover:opacity-95"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
