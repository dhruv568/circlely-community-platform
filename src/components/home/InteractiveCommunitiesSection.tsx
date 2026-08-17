'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { CommunityCard } from '@/components/community/CommunityCard';
import { CommunityPreviewDrawer } from '@/components/community/CommunityPreviewDrawer';

interface CommunityItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  ageGroup?: string | null;
  icon?: string | null;
  coverImage?: string | null;
  memberCount: number;
}

interface InteractiveCommunitiesSectionProps {
  initialCommunities: CommunityItem[];
}

export function InteractiveCommunitiesSection({ initialCommunities }: InteractiveCommunitiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewCommunity, setPreviewCommunity] = useState<CommunityItem | null>(null);

  const categories = ['All', 'Professional', 'Entertainment', 'Lifestyle', 'Creativity', 'Health'];

  const filteredCommunities = selectedCategory === 'All'
    ? initialCommunities
    : initialCommunities.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Pills Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <Link
          href="/communities"
          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 group"
        >
          <span>View All Circles</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCommunities.map((c) => (
          <div key={c.id} onClick={() => setPreviewCommunity(c)} className="cursor-pointer">
            <CommunityCard community={c} />
          </div>
        ))}
      </div>

      {/* Community Preview Drawer */}
      <CommunityPreviewDrawer
        isOpen={!!previewCommunity}
        onClose={() => setPreviewCommunity(null)}
        community={previewCommunity}
      />
    </div>
  );
}
