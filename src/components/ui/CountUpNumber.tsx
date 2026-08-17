'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUpNumber({ end, suffix = '', duration = 1800, className = '' }: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease-out cubic formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * end));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
