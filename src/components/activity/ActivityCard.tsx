'use client';

import { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    category: string;
    isOnline: boolean;
    location?: string | null;
    city?: string | null;
    activityDate: Date | string;
    maxParticipants: number;
    participantsCount: number;
    icon?: string | null;
    community?: { name: string; slug: string } | null;
    isJoined?: boolean;
  };
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [joined, setJoined] = useState(activity.isJoined || false);
  const [count, setCount] = useState(activity.participantsCount);

  const handleJoinToggle = async () => {
    try {
      const res = await fetch(`/api/activities/${activity.id}/join`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setJoined(data.joined);
        setCount(data.participantsCount);
      }
    } catch {
      // optimistic toggle
      setJoined(!joined);
      setCount(joined ? count - 1 : count + 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-xl">
              {activity.icon || '🎯'}
            </span>
            <div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {activity.category}
              </span>
              {activity.community && (
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{activity.community.name}</p>
              )}
            </div>
          </div>

          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              activity.isOnline
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-orange-50 text-orange-700 border border-orange-200'
            }`}
          >
            {activity.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1">{activity.title}</h3>
          <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">{activity.description}</p>
        </div>

        {/* Meta details */}
        <div className="space-y-2 pt-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{formatDate(activity.activityDate)}</span>
            <Clock className="w-4 h-4 text-purple-500 ml-2" />
            <span>{formatTime(activity.activityDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="truncate">{activity.location || activity.city || 'Online'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span>
              {count} / {activity.maxParticipants} Participants
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-5 mt-4 border-t border-gray-100">
        <button
          onClick={handleJoinToggle}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            joined
              ? 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200'
              : 'gradient-bg text-white shadow-md shadow-purple-500/20 hover:opacity-95'
          }`}
        >
          {joined ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Joined Activity
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Join Activity
            </>
          )}
        </button>
      </div>
    </div>
  );
}
