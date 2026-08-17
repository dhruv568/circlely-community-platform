'use client';

import { useState, useEffect, useRef } from 'react';
import { InteractiveHeroVisualV2 } from './InteractiveHeroVisualV2';

export function InteractiveHeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMouseOffset({
          x: (e.clientX - centerX) / (rect.width || 1),
          y: (e.clientY - centerY) / (rect.height || 1),
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex items-center justify-center py-4 bg-transparent">
      {/* Main Interactive Live Community Dashboard Showcase (V2) */}
      <div className="relative z-10 w-full">
        <InteractiveHeroVisualV2 mouseOffset={mouseOffset} />
      </div>
    </div>
  );
}
