'use client';

import { useState } from 'react';
import { Users, Heart, Sparkles, MessageSquare, Calendar, MapPin, Check, ArrowRight } from 'lucide-react';

interface InteractiveHeroVisualV2Props {
  mouseOffset?: { x: number; y: number };
}

export function InteractiveHeroVisualV2({ mouseOffset = { x: 0, y: 0 } }: InteractiveHeroVisualV2Props) {
  const [liked, setLiked] = useState(false);
  const [rsvped, setRsvped] = useState(false);
  const [joined, setJoined] = useState(false);

  // Subtle smooth parallax tilt
  const tiltX = mouseOffset.y * -3;
  const tiltY = mouseOffset.x * 3;
  const moveX = mouseOffset.x * 6;
  const moveY = mouseOffset.y * 6;

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${moveX}px, ${moveY}px, 0px)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative w-full max-w-md mx-auto py-2 select-none z-10"
    >
      {/* SINGLE CLEAN & ELEGANT CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              YP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Young Professionals</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              </div>
              <p className="text-xs text-gray-500 font-medium">1,240 Members • San Francisco</p>
            </div>
          </div>

          <button
            onClick={() => setJoined(!joined)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              joined
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
            }`}
          >
            {joined ? 'Joined ✓' : 'Join Circle'}
          </button>
        </div>

        {/* Event / Activity Spotlight */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-[11px] font-bold tracking-wide">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              THIS SATURDAY • 5:30 PM
            </span>
            <span className="text-xs font-medium text-gray-400">18 Attending</span>
          </div>

          <h3 className="font-extrabold text-base text-gray-900 dark:text-white leading-snug">
            Sunset Photowalk & Coffee Session
          </h3>

          {/* Host Info */}
          <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
              alt="Marcus Vance"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>Hosted by <strong className="text-gray-900 dark:text-white font-semibold">Marcus Vance</strong></span>
          </div>

          {/* Clean Photo Container */}
          <div className="relative h-44 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group">
            <img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600"
              alt="Golden Gate Sunset"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Baker Beach / Golden Gate</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                liked
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{liked ? 25 : 24}</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span>8 Comments</span>
            </div>
          </div>

          <button
            onClick={() => setRsvped(!rsvped)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              rsvped
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
            }`}
          >
            {rsvped ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>RSVPed</span>
              </>
            ) : (
              <span>RSVP Spot</span>
            )}
          </button>
        </div>

        {/* Member Avatar Stack footer */}
        <div className="pt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
              alt="Member"
              className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80"
              alt="Member"
              className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=80"
              alt="Member"
              className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 object-cover"
            />
            <span className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center">
              +15
            </span>
          </div>

          <span className="text-[11px] font-medium text-gray-400">98% Interest Match</span>
        </div>

      </div>
    </div>
  );
}

