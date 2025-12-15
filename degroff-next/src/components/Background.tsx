'use client';

import { useEffect, useMemo, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type BackgroundProps = {
  children: ReactNode;
};

/**
 * Premium layered background used on marketing surfaces.
 * - Soft vertical gradient base
 * - Radial blobs (blue / cyan / violet)
 * - Subtle technical grid + noise texture
 * - Optional spotlight that follows the cursor (disabled for prefers-reduced-motion)
 */
export function Background({ children }: BackgroundProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
    const listener = (event: MediaQueryListEvent) => setIsReducedMotion(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX}px ${spotlightY}px, rgba(56,189,248,0.16), transparent 55%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  };

  const motionTransition = useMemo(
    () => ({ duration: 1, ease: "easeOut" as const }),
    []
  );

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient - light or dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Hexagon technical pattern + gradient overlays */}
        <div className="absolute inset-0 bg-white dark:bg-slate-950">
          <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.15]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                  <path
                    d="M25 0 L50 14.4 L50 38.4 L25 51.8 L0 38.4 L0 14.4 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-blue-500/40 dark:text-blue-400/30"
                  />
                  <path
                    d="M25 0 L50 14.4 L50 38.4 L25 51.8 L0 38.4 L0 14.4 Z"
                    transform="translate(50, 25.9)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-purple-500/40 dark:text-purple-400/30"
                  />
                </pattern>

                <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#hexagons)" />
              <rect width="100%" height="100%" fill="url(#hex-gradient)" />
            </svg>
          </div>

          {/* Gradient radial overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_60%)]" />
        </div>

        {/* Large hero glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={motionTransition}
          className="absolute -top-64 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.55)_0,rgba(37,99,235,0.0)_55%)] blur-3xl"
        />

        {/* Cyan + violet side glows */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ ...motionTransition, delay: 0.1 }}
          className="absolute top-32 -right-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.45)_0,rgba(8,47,73,0.0)_55%)] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ ...motionTransition, delay: 0.12 }}
          className="absolute bottom-[-160px] -left-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.5)_0,rgba(30,64,175,0.0)_60%)] blur-3xl"
        />

        {/* Optional spotlight following cursor */}
        {!isReducedMotion && (
          <motion.div
            style={{ backgroundImage: spotlightBackground }}
            className="absolute inset-0 mix-blend-soft-light opacity-80"
          />
        )}
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}


