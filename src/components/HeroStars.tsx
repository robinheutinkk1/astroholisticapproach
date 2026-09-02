"use client";

import { useEffect, useRef } from "react";

/**
 * The drifting starfield behind the hero, carried over from the original site.
 * Pure canvas, no assets, and it stands still for anyone who has asked for
 * reduced motion.
 */
export function HeroStars() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;

    type Star = { x: number; y: number; r: number; a: number; drift: number };
    let stars: Star[] = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 720 ? 40 : 90;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.5 + 0.2,
        drift: Math.random() * 0.12 + 0.02,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 245, ${star.a})`;
        ctx.fill();
        if (!reduceMotion) {
          star.y -= star.drift;
          if (star.y < -2) {
            star.y = height + 2;
            star.x = Math.random() * width;
          }
        }
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} id="heroStars" aria-hidden="true" />;
}
