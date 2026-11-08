"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to detect user reduced-motion preference
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

/**
 * Standard animation curves & durations across DevSparks DeployCheck
 */
export const MOTION = {
  ease: {
    smooth: "power2.out",
    snappy: "power3.out",
    spring: "back.out(1.4)",
    elastic: "elastic.out(1, 0.75)",
  },
  duration: {
    micro: 0.2, // 200ms
    hover: 0.22, // 220ms
    card: 0.25, // 250ms
    section: 0.6, // 600ms
    hero: 0.9, // 900ms
  },
};
