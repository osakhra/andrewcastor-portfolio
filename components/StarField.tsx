'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkle: number;
};

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createStars = () => {
      const count = Math.min(
        Math.floor((width * height) / 8000),
        180
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = performance.now() / 1000;

      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -2) {
          s.y = height + 2;
          s.x = Math.random() * width;
        }
        const flicker = Math.sin(time * 0.8 + s.twinkle) * 0.2 + 0.8;
        const opacity = s.opacity * flicker;

        // Teal-tinted highlight on the brighter stars
        if (s.size > 1.1) {
          ctx.fillStyle = `rgba(180, 220, 215, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(232, 236, 241, ${opacity * 0.7})`;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      setSize();
      createStars();
    };

    setSize();
    createStars();
    render();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
