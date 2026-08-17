'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    coverImage?: string | null;
    category: string;
    isOnline: boolean;
    location?: string | null;
    city?: string | null;
    startDate: Date | string;
    attendeesCount: number;
    maxAttendees: number;
    creator?: { name: string; avatarUrl?: string | null } | null;
    isRSVPed?: boolean;
  };
}

export function EventCard({ event }: EventCardProps) {
  const [rsvped, setRsvped] = useState(event.isRSVPed || false);
  const [count, setCount] = useState(event.attendeesCount);

  const handleRSVP = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/events/${event.id}/rsvp`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setRsvped(data.rsvped);
        setCount(data.attendeesCount);
      }
    } catch {
      setRsvped(!rsvped);
      setCount(rsvped ? count - 1 : count + 1);
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Cover Image Header */}
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
        <img
          src={event.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white shadow-sm">
            {event.category}
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/40 backdrop-blur-md text-white">
            {event.isOnline ? '🌐 Online' : '📍 Offline'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/events/${event.id}`}>
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors line-clamp-1">
              {event.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-4 space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{formatDate(event.startDate)}</span>
              <Clock className="w-4 h-4 text-purple-500 ml-2" />
              <span>{formatTime(event.startDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="truncate">{event.location || event.city || 'Online Auditorium'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{count} Attendees</span>
            </div>
          </div>
        </div>

        {/* Footer RSVP */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={handleRSVP}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              rsvped
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'gradient-bg text-white shadow-md shadow-purple-500/20 hover:opacity-95'
            }`}
          >
            {rsvped ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                RSVP Confirmed
              </>
            ) : (
              'RSVP Now'
            )}
          </button>

          <Link
            href={`/events/${event.id}`}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 transition-colors"
            title="View Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
