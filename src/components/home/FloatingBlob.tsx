'use client';

import { useEffect, useState } from 'react';

interface BlobConfig {
  id: string;
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
}

export function FloatingBlob() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const blobs: BlobConfig[] = [
    // Top-Right Soft Indigo
    { id: 'b1', color: 'bg-indigo-100/40 dark:bg-indigo-950/20', size: 500, initialX: 70, initialY: -10, duration: 14 },
    // Bottom-Right Soft Amber/Cream
    { id: 'b2', color: 'bg-amber-100/40 dark:bg-amber-950/20', size: 460, initialX: 60, initialY: 60, duration: 18 },
    // Bottom-Left Soft Cyan
    { id: 'b3', color: 'bg-cyan-100/40 dark:bg-cyan-950/20', size: 420, initialX: -10, initialY: 50, duration: 16 },
    // Center Soft Violet
    { id: 'b4', color: 'bg-purple-100/35 dark:bg-purple-950/20', size: 380, initialX: 30, initialY: 20, duration: 12 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className={`absolute rounded-full blur-[100px] transition-all duration-1000 ${blob.color}`}
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            left: `${blob.initialX}%`,
            top: `${blob.initialY}%`,
            animation: isReducedMotion ? 'none' : `floatDrift ${blob.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatDrift {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(20px, -15px) scale(1.04);
          }
          100% {
            transform: translate(-15px, 15px) scale(0.96);
          }
        }
      `}</style>
    </div>
  );
}
