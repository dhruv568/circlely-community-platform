'use client';

import { useEffect, useRef } from 'react';

interface OrbitDot {
  ringIndex: number;
  angle: number;
  speed: number;
  direction: 1 | -1;
  baseRadius: number;
  color: string;
}

interface OrbitSystemProps {
  mousePos: { x: number; y: number };
  containerBounds: { left: number; top: number; width: number; height: number };
}

export function OrbitSystem({ mousePos, containerBounds }: OrbitSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isTabActiveRef = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const size = Math.min(containerBounds.width || 600, 700);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const radii = [size * 0.28, size * 0.38, size * 0.48];

    // Generate orbit dots
    const dots: OrbitDot[] = [
      { ringIndex: 0, angle: 0.2, speed: 0.003, direction: 1, baseRadius: 4, color: '#8B5CF6' },
      { ringIndex: 0, angle: 3.4, speed: 0.003, direction: 1, baseRadius: 3.5, color: '#EC4899' },
      { ringIndex: 1, angle: 1.5, speed: 0.002, direction: -1, baseRadius: 4.5, color: '#FF7A59' },
      { ringIndex: 1, angle: 4.8, speed: 0.002, direction: -1, baseRadius: 3.8, color: '#8B5CF6' },
      { ringIndex: 2, angle: 2.7, speed: 0.0015, direction: 1, baseRadius: 5, color: '#EC4899' },
      { ringIndex: 2, angle: 5.9, speed: 0.0015, direction: 1, baseRadius: 4, color: '#06B6D4' },
    ];

    const render = () => {
      if (!isTabActiveRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, size, size);

      // Render Static/Dashed Concentric Orbit Rings
      radii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(center, center, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(139, 92, 246, 0.15)';
        ctx.lineWidth = 1.2;
        if (idx === 1) ctx.setLineDash([6, 6]);
        else if (idx === 2) ctx.setLineDash([4, 8]);
        else ctx.setLineDash([]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Calculate relative mouse coordinates inside orbit canvas
      const relMouseX = mousePos.x - containerBounds.left;
      const relMouseY = mousePos.y - containerBounds.top;

      // Update and render dots
      const computedDotsPos: { x: number; y: number; color: string }[] = [];

      dots.forEach((dot) => {
        if (!prefersReducedMotion) {
          dot.angle += dot.speed * dot.direction;
        }

        const ringR = radii[dot.ringIndex];
        let currentX = center + Math.cos(dot.angle) * ringR;
        let currentY = center + Math.sin(dot.angle) * ringR;

        // Mouse proximity reaction
        const dx = relMouseX - currentX;
        const dy = relMouseY - currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let renderRadius = dot.baseRadius;
        let alpha = 0.8;

        if (dist < 100) {
          const factor = (100 - dist) / 100;
          currentX -= (dx / dist) * factor * 10;
          currentY -= (dy / dist) * factor * 10;
          renderRadius += factor * 3;
          alpha = 1;
        }

        computedDotsPos.push({ x: currentX, y: currentY, color: dot.color });

        // Draw Dot Glow
        ctx.beginPath();
        ctx.arc(currentX, currentY, renderRadius + 4, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}22`;
        ctx.fill();

        // Draw Main Dot
        ctx.beginPath();
        ctx.arc(currentX, currentY, renderRadius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw subtle connecting lines between close orbit dots
      for (let i = 0; i < computedDotsPos.length; i++) {
        for (let j = i + 1; j < computedDotsPos.length; j++) {
          const d1 = computedDotsPos[i];
          const d2 = computedDotsPos[j];
          const dist = Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = d1.color;
            ctx.globalAlpha = 0.18 * (1 - dist / 140);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos, containerBounds]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <canvas ref={canvasRef} className="block pointer-events-none bg-transparent" />
    </div>
  );
}
