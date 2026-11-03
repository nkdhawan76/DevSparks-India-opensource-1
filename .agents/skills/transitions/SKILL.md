---
name: transitions
description: Micro-interactions and CSS motion patterns with accessibility guards. Ensures smooth page transitions while respecting prefers-reduced-motion.
---

# Transitions.dev — Purposeful UI Motion & Micro-Interactions

Provides lightweight, conflict-free transition patterns for DevSparks DeployCheck dashboards.

## Core Rules

1. **Accessibility First (`prefers-reduced-motion`):**  
   Every animation and transition must respect operating-system reduced-motion preferences.
2. **Subtle & Purposeful:**  
   Transitions should convey state changes (panel expanding, audit run completing, alert badge appearing). Avoid disorienting motion.
3. **Namespaced Styles:**  
   Use localized Tailwind utility classes or custom properties to prevent CSS collisions.
4. **License Compliance:**  
   Use permitted free patterns. Do not redistribute the collection as a competing UI pack.
