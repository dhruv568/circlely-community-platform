'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  dayGroup: 'TODAY' | 'TOMORROW' | 'THIS WEEKEND';
  category: string;
  isOnline: boolean;
  communityName: string;
  avatars: string[];
  participantsCount: number;
}

export function ActivityTimeline() {
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      title: 'Acoustic Guitar & Jam Session',
      time: '7:00 PM',
      dayGroup: 'TODAY',
      category: 'Music',
      isOnline: true,
      communityName: 'Music Enthusiasts',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
      ],
      participantsCount: 14,
    },
    {
      id: 'act-2',
      title: 'Casual FPS Multiplayer Night',
      time: '8:30 PM',
      dayGroup: 'TODAY',
      category: 'Gaming',
      isOnline: true,
      communityName: 'Gaming Community',
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      ],
      participantsCount: 8,
    },
    {
      id: 'act-3',
      title: 'Golden Gate Sunset Photowalk',
      time: '6:00 PM',
      dayGroup: 'TOMORROW',
      category: 'Photography',
      isOnline: false,
      communityName: 'Travel & Exploration',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
      ],
      participantsCount: 18,
    },
  ];

  const handleToggleJoin = (id: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(joinedIds.filter((item) => item !== id));
    } else {
      setJoinedIds([...joinedIds, id]);
    }
  };

  const groups = ['TODAY', 'TOMORROW'] as const;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Interactive Timeline
          </span>
          <h3 className="font-extrabold text-xl text-gray-900 mt-1">Upcoming Activity Schedule</h3>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((group) => {
          const items = activities.filter((a) => a.dayGroup === group);
          return (
            <div key={group} className="space-y-3">
              <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-gray-100 text-gray-700 uppercase tracking-widest">
                {group}
              </span>

              <div className="space-y-3">
                {items.map((act) => {
                  const isJoined = joinedIds.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-extrabold flex flex-col items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 mb-0.5" />
                          <span>{act.time}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-gray-900">{act.title}</h4>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                              {act.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">Circle: {act.communityName}</p>

                          {/* Stacked Avatars */}
                          <div className="flex items-center gap-2 pt-1">
                            <div className="flex -space-x-2 overflow-hidden">
                              {act.avatars.map((url, i) => (
                                <img
                                  key={i}
                                  src={url}
                                  alt="Participant"
                                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-gray-500 font-semibold">
                              +{act.participantsCount - 2} attending
                            </span>
                          </div>
                        </div>
                      </div>

                      <MagneticButton
                        variant={isJoined ? 'outline' : 'primary'}
                        size="sm"
                        isSuccess={isJoined}
                        successText="Joined ✓"
                        onClick={() => handleToggleJoin(act.id)}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Join Hangout</span>
                      </MagneticButton>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
