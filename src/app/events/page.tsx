import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { EventCard } from '@/components/event/EventCard';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { Calendar, Search } from 'lucide-react';

interface EventsPageProps {
  searchParams: Promise<{
    category?: string;
    city?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function EventsPage({ searchParams }: EventsPageProps) {
  let user = null;
  let events: any[] = [];

  const { category, city } = await searchParams;

  const whereClause: any = {};
  if (category && category !== 'All') whereClause.category = category;
  if (city && city !== 'All') whereClause.city = city;

  try {
    user = await getSessionUser();
    events = await db.event.findMany({
      where: whereClause,
      orderBy: { startDate: 'asc' },
      include: { creator: { include: { profile: true } } },
    });
  } catch (err) {
    console.error('Error fetching events:', err);
  }

  const categories = ['All', 'Entertainment', 'Professional', 'Lifestyle', 'Health', 'Culture', 'Creativity'];
  const cities = ['All', 'San Francisco', 'New York', 'Seattle', 'Austin', 'Chicago', 'Los Angeles', 'Denver', 'London', 'Dubai'];

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="space-y-4">
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Community Events & Meetups
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-600 text-sm max-w-2xl">
            RSVP for official workshops, webinars, panel talks, and regional member summits.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FilterSelect
            name="category"
            label="Category Filter"
            defaultValue={category || 'All'}
            options={categories}
          />

          <FilterSelect
            name="city"
            label="City Filter"
            defaultValue={city || 'All'}
            options={cities}
          />
        </div>

        {/* Event Cards Grid */}
        {events.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center space-y-3">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No events found</h3>
            <p className="text-sm text-gray-500">Try selecting a different category or city filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}

      </main>

      <Footer />
      <MobileBottomNav user={user} />
    </div>
  );
}
