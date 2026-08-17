import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export function Logo({ className = '', size = 36, showText = true, textClassName = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* SVG Vector Logo Icon */}
      <div
        className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_12px_rgba(108,99,255,0.3)]"
        >
          <defs>
            <linearGradient id="circlely-grad-1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#FF7A59" />
            </linearGradient>
            <linearGradient id="circlely-grad-2" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FF7A59" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Container Circle with Soft Shadow */}
          <rect width="48" height="48" rx="14" fill="url(#circlely-grad-1)" />

          {/* Stylized Interlocking C-Circle Community Rings */}
          {/* Main Outer Arc */}
          <path
            d="M 32 14 C 22 14, 14 20, 14 28 C 14 36, 22 40, 32 37"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          {/* Intersecting Orbit Ring Node 1 */}
          <circle cx="32" cy="14" r="3.5" fill="#FFD166" />

          {/* Intersecting Orbit Ring Node 2 */}
          <circle cx="28" cy="24" r="4.5" fill="white" />

          {/* Intersecting Orbit Ring Node 3 */}
          <circle cx="33" cy="36" r="3.5" fill="#FF7A59" stroke="white" strokeWidth="1.5" />

          {/* Connection Arc */}
          <path
            d="M 28 24 C 33 24, 38 20, 38 15"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2.5"
            strokeDasharray="2 2"
            fill="none"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold text-xl tracking-tight text-gray-900 leading-tight ${textClassName}`}>
            Circlely
          </span>
          <span className="text-[10px] font-bold text-purple-600 tracking-wider uppercase hidden sm:inline-block">
            Build Your Circle
          </span>
        </div>
      )}
    </div>
  );
}
