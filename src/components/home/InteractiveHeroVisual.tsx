'use client';

import { useState, useEffect } from 'react';
import { Users, Heart, Sparkles } from 'lucide-react';

interface InteractiveHeroVisualProps {
  mouseOffset: { x: number; y: number };
}

export function InteractiveHeroVisual({ mouseOffset }: InteractiveHeroVisualProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Calculate subtle 3-5 degree tilt
  const tiltX = isReducedMotion ? 0 : mouseOffset.y * -4;
  const tiltY = isReducedMotion ? 0 : mouseOffset.x * 4;
  const moveX = isReducedMotion ? 0 : mouseOffset.x * -10;
  const moveY = isReducedMotion ? 0 : mouseOffset.y * -10;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${moveX}px, ${moveY}px, 0px) scale(${
          isHovered ? 1.03 : 1
        })`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
      className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full flex items-center justify-center select-none z-10"
    >
      {/* Background Outer Soft Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-200/50 via-pink-200/40 to-orange-200/40 blur-2xl opacity-70 -z-10 animate-pulse duration-5000 pointer-events-none" />

      {/* TOP CIRCLE: Young Adults / Friends */}
      <div className="absolute top-0 right-8 sm:right-12 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl group hover:scale-105 transition-transform duration-300">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
          alt="Young Adults Community"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* LEFT CIRCLE: Adult Coffee & Work */}
      <div className="absolute bottom-12 left-0 sm:left-2 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl group hover:scale-105 transition-transform duration-300">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
          alt="Adult Coffee & Work Community"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* RIGHT CIRCLE: Senior / Multigenerational Members */}
      <div className="absolute bottom-4 right-2 sm:right-4 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl group hover:scale-105 transition-transform duration-300">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
          alt="Senior Community Members"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* CENTER FEATURED CIRCLE BADGE */}
      <div className="relative z-20 w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-white dark:bg-gray-900 p-4 border-4 border-purple-100 dark:border-purple-900/50 shadow-2xl flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2 group hover:border-purple-300 transition-colors">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
          <Users className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <p className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white leading-tight max-w-[140px]">
          Different Ages. <br />
          Same Feeling. <br />
          <span className="text-purple-600 font-black">One Circle.</span>
        </p>
      </div>

    </div>
  );
}
