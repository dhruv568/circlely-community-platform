'use client';

import Link from 'next/link';
import { X, Users, Sparkles, Calendar, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface CommunityPreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
    rules?: string | null;
  } | null;
}

export function CommunityPreviewDrawer({ isOpen, onClose, community }: CommunityPreviewDrawerProps) {
  if (!isOpen || !community) return null;

  const rulesList: string[] = community.rules ? JSON.parse(community.rules) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg h-full shadow-2xl border-l border-gray-100 dark:border-gray-800 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header Banner */}
        <div className="relative h-48 w-full bg-gray-900 shrink-0">
          <img
            src={community.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'}
            alt={community.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 text-white">
            <span className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center text-gray-900 shadow-md">
              {community.icon || '💬'}
            </span>
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-600 uppercase">
                {community.category}
              </span>
              <h2 className="text-xl font-extrabold line-clamp-1">{community.name}</h2>
            </div>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 space-y-6 flex-1">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">About this Circle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{community.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{community.memberCount} active members</span>
            </div>
            {community.ageGroup && (
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>{community.ageGroup}</span>
              </div>
            )}
          </div>

          {rulesList.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Circle Rules</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                {rulesList.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-indigo-600">{idx + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>

          <Link href={`/communities/${community.slug}`}>
            <MagneticButton variant="primary" size="md">
              <span>View Full Community</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>

      </div>
    </div>
  );
}
