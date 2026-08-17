'use client';

import Link from 'next/link';
import { Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    ageGroup?: string | null;
    icon?: string | null;
    coverImage?: string | null;
    memberCount: number;
    isMember?: boolean;
  };
  onJoinToggle?: (slug: string) => void;
}

export function CommunityCard({ community, onJoinToggle }: CommunityCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Cover Image Header */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          src={community.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600'}
          alt={community.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category & Age Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-md text-purple-700 shadow-sm">
            {community.category}
          </span>
          {community.ageGroup && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/40 backdrop-blur-md text-white">
              {community.ageGroup}
            </span>
          )}
        </div>

        {/* Icon Floating Badge */}
        <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl border-2 border-white">
          {community.icon || '💬'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 pt-8 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/communities/${community.slug}`}>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
              {community.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {community.description}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{community.memberCount} members</span>
          </div>

          <Link
            href={`/communities/${community.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-all"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
