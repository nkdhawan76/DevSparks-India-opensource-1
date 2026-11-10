"use client";

import React, { useRef, useCallback, useEffect } from "react";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowColor?: string; // Default brand purple #5938F5
  glowSize?: number; // Radial glow radius in px
}

/**
 * GlowCard — High-craft interactive card component with a cursor-following border glow effect.
 *
 * Implements a zero-re-render CSS Custom Property architecture that tracks cursor coordinates
 * at 120 FPS directly on the DOM, illuminating the 1px outer perimeter line in brand purple.
 * Strict Light Theme compliant (Zero dark surfaces).
 */
export function GlowCard({
  children,
  className = "",
  innerClassName = "",
  glowColor = "rgba(89, 56, 245, 0.55)",
  glowSize = 380,
  style,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--glow-color", glowColor);
    el.style.setProperty("--glow-inner-opacity", "1");
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "-999px");
    el.style.setProperty("--glow-y", "-999px");
    el.style.setProperty("--glow-inner-opacity", "0");
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "-999px");
    el.style.setProperty("--glow-y", "-999px");
    el.style.setProperty("--glow-size", `${glowSize}px`);
    el.style.setProperty("--glow-color", glowColor);
    el.style.setProperty("--glow-inner-opacity", "0");
  }, [glowColor, glowSize]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glow-card-container relative rounded-2xl p-[1px] transition-all duration-300 ${className}`}
      style={{
        background: `radial-gradient(var(--glow-size, ${glowSize}px) circle at var(--glow-x, -999px) var(--glow-y, -999px), var(--glow-color, ${glowColor}), #E5E7EB 55%)`,
        ...style,
      }}
      {...props}
    >
      <div className={`relative rounded-[15px] bg-white h-full w-full overflow-hidden ${innerClassName}`}>
        {/* Subtle inner ambient glow following the cursor */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 will-change-transform"
          style={{
            opacity: "var(--glow-inner-opacity, 0)",
            background: `radial-gradient(var(--glow-size, ${glowSize}px) circle at var(--glow-x, -999px) var(--glow-y, -999px), rgba(89, 56, 245, 0.04), transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Content layer */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
