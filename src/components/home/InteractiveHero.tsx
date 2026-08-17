'use client';

import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { InteractiveHeroBackground } from './InteractiveHeroBackground';

interface InteractiveHeroProps {
  user?: {
    id: string;
    name: string;
  } | null;
}

export function InteractiveHero({ user }: InteractiveHeroProps) {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>BUILD YOUR CIRCLE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Find people who feel like <br />
              <span className="gradient-text">your people.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover welcoming communities, group activities, and events built around the things you genuinely enjoy.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href={user ? '/feed' : '/register'}>
                <MagneticButton variant="primary" size="lg">
                  <span>{user ? 'Go to Community Feed' : 'Join the Community'}</span>
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>

              <Link href="/communities">
                <MagneticButton variant="outline" size="lg">
                  <Compass className="w-5 h-5 text-indigo-600" />
                  <span>Explore Circles</span>
                </MagneticButton>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Free Registration</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Verified Adult Profiles</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Safe & Moderated</span>
            </div>
          </div>

          {/* Right Interactive Orbit Background & Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <InteractiveHeroBackground />
          </div>

        </div>
      </div>
    </section>
  );
}
