import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { getSessionUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { formatDate, formatTime } from '@/lib/utils';
import { Calendar, Clock, MapPin, Users, ShieldAlert, Share2, CheckCircle2, ArrowLeft } from 'lucide-react';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const user = await getSessionUser();
  const { id } = await params;

  const event = await db.event.findUnique({
    where: { id },
    include: {
      creator: { include: { profile: true } },
      community: true,
      attendees: {
        take: 12,
        include: { user: { include: { profile: true } } },
      },
    },
  });

  if (!event) notFound();

  let isRSVPed = false;
  if (user) {
    const attendee = await db.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId: user.id,
        },
      },
    });
    isRSVPed = !!attendee;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        {/* Event Banner Header */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl bg-gray-900">
          <img
            src={event.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200'}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
            <div className="flex gap-2">
              <span className="px-3.5 py-1 text-xs font-extrabold rounded-full bg-purple-600">
                {event.category}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-md">
                {event.isOnline ? '🌐 Virtual Online' : '📍 Physical Venue'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold">{event.title}</h1>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="font-bold text-xl text-gray-900">About this Event</h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            {/* Organizer Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={event.creator.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={event.creator.name}
                  className="w-12 h-12 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{event.creator.name}</h3>
                  <p className="text-xs text-purple-600 font-medium">Event Host & Organizer</p>
                </div>
              </div>
              <Link
                href={`/profile/${event.creator.profile?.username || 'user'}`}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-600 hover:bg-purple-100"
              >
                View Host Profile
              </Link>
            </div>

            {/* Attendees List */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="font-bold text-xl text-gray-900">Attendees ({event.attendeesCount})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {event.attendees.map((att) => (
                  <div key={att.id} className="flex items-center gap-2 p-2 rounded-2xl bg-gray-50 text-xs">
                    <img
                      src={att.user.profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={att.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-gray-800 truncate">{att.user.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar RSVP Box */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg space-y-6 sticky top-24">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Calendar className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{formatDate(event.startDate)}</p>
                    <p className="text-xs text-gray-500">{formatTime(event.startDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{event.location || event.city || 'Online Auditorium'}</p>
                    <p className="text-xs text-gray-500">{event.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Users className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{event.attendeesCount} / {event.maxAttendees} Attending</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button
                  className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 ${
                    isRSVPed
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'gradient-bg text-white shadow-xl shadow-purple-500/20'
                  }`}
                >
                  {isRSVPed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      RSVP Confirmed
                    </>
                  ) : (
                    'Confirm RSVP'
                  )}
                </button>
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
