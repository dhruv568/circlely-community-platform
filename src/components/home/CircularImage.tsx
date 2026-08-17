'use client';

import { useState } from 'react';

interface CircularImageProps {
  src: string;
  alt: string;
  sizeClassName?: string;
  positionClassName?: string;
  mouseOffset?: { x: number; y: number };
  depthFactor?: number;
}

export function CircularImage({
  src,
  alt,
  sizeClassName = 'w-36 h-36 sm:w-44 sm:h-44',
  positionClassName = '',
  mouseOffset = { x: 0, y: 0 },
  depthFactor = 6,
}: CircularImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const moveX = mouseOffset.x * depthFactor;
  const moveY = mouseOffset.y * depthFactor;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${moveX}px, ${moveY}px, 0px) scale(${isHovered ? 1.08 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
      className={`absolute ${positionClassName} z-10 select-none group cursor-pointer`}
    >
      {/* Soft Glow behind circle */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Main Circular Profile Image Container */}
      <div className={`${sizeClassName} rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl shadow-purple-900/10 transition-shadow duration-300`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
}
