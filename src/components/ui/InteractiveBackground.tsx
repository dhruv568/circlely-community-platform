'use client';

import { useEffect, useRef, useState } from 'react';

export type BackgroundEffectMode = 'network' | 'grid' | 'particles' | 'none';

interface InteractiveBackgroundProps {
  effect?: BackgroundEffectMode;
  particleCount?: number;
  intensity?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export function InteractiveBackground({
  effect = 'network',
  particleCount = 50,
  intensity = 0.6,
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const ripplesRef = useRef<Ripple[]>([]);
  const isTabActiveRef = useRef(true);

  // Clean Professional Color Palette: Indigo, Violet, Neon Cyan, Warm Amber (NO PINK)
  const cleanColors = [
    { rgb: 'rgba(99, 102, 241, ', stroke: '#6366F1' },  // Deep Indigo
    { rgb: 'rgba(139, 92, 246, ', stroke: '#8B5CF6' }, // Electric Violet
    { rgb: 'rgba(6, 182, 212, ', stroke: '#06B6D4' },  // Neon Cyan
    { rgb: 'rgba(245, 158, 11, ', stroke: '#F59E0B' }, // Warm Amber
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || effect === 'none') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      const randomColor = cleanColors[Math.floor(Math.random() * cleanColors.length)].stroke;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 160 * intensity,
        color: randomColor,
        alpha: 0.5,
      });
    };

    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [effect, intensity]);

  useEffect(() => {
    if (effect === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

    const particles = Array.from({ length: count }, () => {
      const colorObj = cleanColors[Math.floor(Math.random() * cleanColors.length)];
      return {
        x: Math.random() * (width / dpr),
        y: Math.random() * (height / dpr),
        vx: (Math.random() - 0.5) * 0.4 * intensity,
        vy: (Math.random() - 0.5) * 0.4 * intensity,
        baseRadius: Math.random() * 2.8 + 1.2,
        radius: Math.random() * 2.8 + 1.2,
        colorRgb: colorObj.rgb,
        colorStroke: colorObj.stroke,
        alpha: Math.random() * 0.35 + 0.15,
        angle: Math.random() * Math.PI * 2,
      };
    });

    const render = () => {
      if (!isTabActiveRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cssWidth = width / dpr;
      const cssHeight = height / dpr;
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Render expanding shockwave click ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 3.5;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = r.alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (effect === 'network' || effect === 'particles') {
        particles.forEach((p) => {
          p.angle += 0.008;
          p.x += p.vx + Math.cos(p.angle) * 0.1;
          p.y += p.vy + Math.sin(p.angle) * 0.1;

          if (p.x < 0 || p.x > cssWidth) p.vx *= -1;
          if (p.y < 0 || p.y > cssHeight) p.vy *= -1;

          // Mouse attraction/repulsion
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const force = (130 - dist) / 130;
            p.x -= (dx / dist) * force * 1.4;
            p.y -= (dy / dist) * force * 1.4;
            p.radius = p.baseRadius + force * 1.8;
          } else {
            p.radius = p.baseRadius;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorRgb}${p.alpha * intensity})`;
          ctx.fill();
        });

        // Network lines
        if (effect === 'network') {
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 115) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = particles[i].colorStroke;
                ctx.globalAlpha = 0.1 * (1 - dist / 115) * intensity;
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.globalAlpha = 1;
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effect, particleCount, intensity, mousePos]);

  if (effect === 'none') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Cursor Light Halo (Indigo & Cyan Dual Gradient - NO PINK) */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-20 transition-transform duration-200 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 80%)',
          left: `${mousePos.x - 225}px`,
          top: `${mousePos.y - 225}px`,
        }}
      />

      {/* Floating Animated Ambient Gradient Orbs (Indigo, Violet, Cyan, Amber) */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-3xl animate-pulse duration-10000 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-purple-400/20 rounded-full blur-3xl animate-pulse duration-8000 pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl animate-pulse duration-9000 pointer-events-none"></div>

      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
