/**
 * DevSparks DeployCheck — GSAP Animation Presets & Orchestration (.js)
 * Pure JavaScript utility functions for GSAP animation timelines and micro-interactions.
 */

import { gsap } from "gsap";

/**
 * Checks whether user prefers reduced motion.
 * @returns {boolean}
 */
export function isReducedMotionPreferred() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Creates standard entrance animation for card / container.
 * @param {HTMLElement | null} target
 * @param {object} [options]
 * @returns {gsap.core.Tween | null}
 */
export function animateEntrance(target, options = {}) {
  if (!target || isReducedMotionPreferred()) return null;

  const {
    y = -8,
    opacity = 0,
    scale = 0.985,
    duration = 0.25,
    ease = "power2.out",
    delay = 0,
  } = options;

  return gsap.fromTo(
    target,
    { y, opacity, scale },
    { y: 0, opacity: 1, scale: 1, duration, ease, delay }
  );
}

/**
 * Animates a list of elements with staggered entrance.
 * @param {string | HTMLElement[]} targets
 * @param {object} [options]
 * @returns {gsap.core.Tween | null}
 */
export function animateStagger(targets, options = {}) {
  if (!targets || isReducedMotionPreferred()) return null;

  const {
    y = 4,
    opacity = 0,
    duration = 0.18,
    stagger = 0.02,
    ease = "power2.out",
    delay = 0.05,
  } = options;

  return gsap.fromTo(
    targets,
    { y, opacity },
    { y: 0, opacity: 1, duration, stagger, ease, delay }
  );
}

/**
 * Animate alert banner entrance (smooth pop in).
 * @param {HTMLElement | null} target
 * @returns {gsap.core.Tween | null}
 */
export function animateAlert(target) {
  if (!target || isReducedMotionPreferred()) return null;

  return gsap.fromTo(
    target,
    { y: -4, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
  );
}

