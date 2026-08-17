'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';

interface CentralCircleProps {
  mouseOffset?: { x: number; y: number };
}

export function CentralCircle({ mouseOffset = { x: 0, y: 0 } }: CentralCircleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const moveX = mouseOffset.x * 8;
  const moveY = mouseOffset.y * 8;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${moveX}px, ${moveY}px, 0px) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
      }}
      className="relative z-20 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-slate-950 text-white p-6 border-4 border-purple-400/40 shadow-2xl shadow-purple-900/30 flex flex-col items-center justify-center text-center space-y-2 select-none group cursor-pointer"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-2 rounded-full bg-purple-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon Badge */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-900/60 text-purple-300 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <Users className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Center Text */}
      <p className="font-extrabold text-xs sm:text-sm leading-tight max-w-[150px]">
        Different Ages. <br />
        Same Feeling. <br />
        <span className="text-purple-400 font-black">One Circle.</span>
      </p>
    </div>
  );
}
