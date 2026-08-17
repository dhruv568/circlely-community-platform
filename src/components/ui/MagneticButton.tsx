'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isSuccess?: boolean;
  loadingText?: string;
  successText?: string;
  magneticIntensity?: number;
  className?: string;
}

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  loadingText = 'Processing...',
  successText = 'Done ✓',
  magneticIntensity = 0.2,
  className = '',
  disabled,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable magnetic effect on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Magnetic pull when mouse is within 60px of center
      if (distance < 60) {
        setPosition({
          x: distanceX * magneticIntensity,
          y: distanceY * magneticIntensity,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (btn) btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticIntensity]);

  // Variant styles
  const baseStyle = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20',
    outline: 'bg-white text-gray-800 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-sm',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      ref={buttonRef}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${
        isSuccess ? 'bg-green-600 text-white hover:bg-green-600' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{successText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
