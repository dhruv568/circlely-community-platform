'use client';

import { useState } from 'react';
import { Users, MessageSquare, Heart, Compass, LucideIcon } from 'lucide-react';

interface FloatingLabelProps {
  id: string;
  label: string;
  iconName: 'users' | 'message' | 'heart' | 'compass';
  colorClassName: string;
  positionClassName: string;
  mouseOffset?: { x: number; y: number };
  depthFactor?: number;
}

export function FloatingLabel({
  id,
  label,
  iconName,
  colorClassName,
  positionClassName,
  mouseOffset = { x: 0, y: 0 },
  depthFactor = 10,
}: FloatingLabelProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap: Record<string, LucideIcon> = {
    users: Users,
    message: MessageSquare,
    heart: Heart,
    compass: Compass,
  };

  const Icon = iconMap[iconName] || Users;
  const moveX = mouseOffset.x * depthFactor;
  const moveY = mouseOffset.y * depthFactor;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${moveX}px, ${moveY}px, 0px) scale(${isHovered ? 1.12 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
      className={`absolute ${positionClassName} z-30 cursor-pointer select-none`}
    >
      <div
        className={`px-4 py-2 rounded-full border shadow-lg backdrop-blur-md flex items-center gap-2 transition-all ${colorClassName} ${
          isHovered ? 'ring-2 ring-purple-400 shadow-purple-500/20' : 'shadow-black/5'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-extrabold text-xs tracking-tight">{label}</span>
      </div>
    </div>
  );
}
