import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommunityCard } from '@/components/community/CommunityCard';
import { Users, Search, Filter } from 'lucide-react';

interface CommunitiesPageProps {
  searchParams: Promise<{
    category?: string;
    ageGroup?: string;
    search?: string;
  }>;
}

export default async function CommunitiesPage({ searchParams }: CommunitiesPageProps) {
  const user = await getSessionUser();
  const { category, ageGroup, search } = await searchParams;

  const whereClause: any = {};
  if (category && category !== 'All') whereClause.category = category;
  if (ageGroup && ageGroup !== 'All') whereClause.ageGroup = ageGroup;
  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const communities = await db.community.findMany({
    where: whereClause,
    orderBy: { memberCount: 'desc' },
  });

  const categories = ['All', 'Entertainment', 'Lifestyle', 'Creativity', 'Health', 'Professional', 'Culture', 'Wellness'];
  const ageGroups = ['All', '18-24', '25-34', '35-49', '50-64', '65+'];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Circles Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Explore Welcoming Communities</h1>
          <p className="text-gray-600 text-sm max-w-2xl">
            Find and join circles that match your interests, age preference, and lifestyle.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <form method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Search circles by title or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                name="category"
                defaultValue={category || 'All'}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="All">All Categories</option>
                {categories.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Age Group Filter */}
            <div className="md:col-span-3">
              <select
                name="ageGroup"
                defaultValue={ageGroup || 'All'}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="All">All Age Brackets</option>
                {ageGroups.filter((a) => a !== 'All').map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

          </form>
        </div>

        {/* Community Cards Grid */}
        {communities.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
            <Users className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No communities found</h3>
            <p className="text-sm text-gray-500">Try adjusting your category or search filter keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        )}

      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
