'use client';

import { useState } from 'react';
import { Heart, Users, MessageSquare, Sparkles, Compass } from 'lucide-react';

interface FloatingDecorationProps {
  mouseOffset: { x: number; y: number };
}

export function FloatingDecoration({ mouseOffset }: FloatingDecorationProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items = [
    {
      id: 'connect',
      label: 'Connect',
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      position: 'top-4 -right-2 sm:-right-8',
      depthFactor: 14,
      floatAnimation: 'animate-float-1',
    },
    {
      id: 'share',
      label: 'Share',
      icon: MessageSquare,
      color: 'text-pink-600 bg-pink-50 border-pink-200',
      position: 'top-1/3 -left-4 sm:-left-12',
      depthFactor: 12,
      floatAnimation: 'animate-float-2',
    },
    {
      id: 'belong',
      label: 'Belong',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      position: 'bottom-12 -right-4 sm:-right-10',
      depthFactor: 16,
      floatAnimation: 'animate-float-3',
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      position: '-bottom-4 left-1/4',
      depthFactor: 10,
      floatAnimation: 'animate-float-4',
    },
  ];

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredId === item.id;
        const moveX = mouseOffset.x * item.depthFactor;
        const moveY = mouseOffset.y * item.depthFactor;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              transform: `translate3d(${moveX}px, ${moveY}px, 0px) scale(${isHovered ? 1.15 : 1})`,
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
            }}
            className={`absolute ${item.position} z-30 cursor-pointer select-none`}
          >
            <div
              className={`px-3.5 py-2 rounded-2xl border shadow-lg backdrop-blur-md flex items-center gap-2 transition-all ${
                item.color
              } ${isHovered ? 'shadow-purple-500/30 ring-2 ring-purple-400' : 'shadow-black/5'} ${item.floatAnimation}`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-extrabold text-xs tracking-tight">{item.label}</span>
            </div>
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-6px) translateX(5px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.04); }
        }
        .animate-float-1 { animation: float1 5s ease-in-out infinite; }
        .animate-float-2 { animation: float2 6s ease-in-out infinite; }
        .animate-float-3 { animation: float3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float4 5.5s ease-in-out infinite; }
      `}</style>
    </>
  );
}
