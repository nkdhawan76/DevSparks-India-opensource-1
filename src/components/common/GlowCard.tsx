"use client";

import React, { useRef, useState, useCallback } from "react";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowColor?: string; // Brand purple default #5938F5
  glowSize?: number; // Radial glow radius in px
}

/**
 * GlowCard — Luxury SaaS Card with real-time cursor-following outer line glow & radiant aura.
 *
 * Implements a high-performance 120 FPS CSS Custom Property architecture:
 * 1. Radiant Outer Bloom: Soft blurred glow (-inset-1 blur-md) projecting beyond the perimeter.
 * 2. Focused Border Spotlight: Sharp high-contrast border illumination (-inset-[1.5px]).
 * 3. Inner White Surface: Pure light-theme surface mask (inset-[1px] bg-white).
 * 4. Ambient Surface Sheen: Subtle inner reflection following the pointer.
 *
 * Zero React state re-renders during mouse movement (direct DOM property updates).
 * Strict Light Theme Only (Zero dark mode surfaces).
 */
export function GlowCard({
  children,
  className = "",
  innerClassName = "",
  glowColor = "#5938F5",
  glowSize = 360,
  style,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glow-card-root relative rounded-2xl bg-white transition-all duration-300 ${className}`}
      style={{
        ...style,
      }}
      {...props}
    >
      {/* LAYER 1: Ambient Outer Aura / Bloom (Radiant halo outside the card border) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300 will-change-transform"
        style={{
          opacity: isHovered ? 0.45 : 0,
          background: `radial-gradient(${glowSize * 0.9}px circle at var(--glow-x, -999px) var(--glow-y, -999px), ${glowColor}, transparent 65%)`,
        }}
      />

      {/* LAYER 2: Focused Sharp Border Spotlight (Illuminating the outer line perimeter) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1.5px] rounded-2xl transition-opacity duration-200 will-change-transform"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at var(--glow-x, -999px) var(--glow-y, -999px), ${glowColor}, transparent 60%)`,
        }}
      />

      {/* LAYER 3: Resting Static Border (Light gray default perimeter) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl border border-[#E5E7EB] transition-opacity duration-200"
        style={{
          opacity: isHovered ? 0.35 : 1,
        }}
      />

      {/* LAYER 4: Inner Card Background (Masks the center to preserve pristine white surface) */}
      <div className={`relative z-10 rounded-[15px] bg-white h-full w-full overflow-hidden ${innerClassName}`}>
        {/* Subtle Ambient Inner Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 will-change-transform"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${glowSize}px circle at var(--glow-x, -999px) var(--glow-y, -999px), rgba(89, 56, 245, 0.045), transparent 60%)`,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
