# ADR 0001: Strict Light Theme Only Design System

## Status
Accepted

## Context
DeployCheck is an engineering platform developed by DevSparks India for developer operations, pre-deployment auditing, and infrastructure management. A clear, high-contrast, uncluttered user interface is required to present complex audit trees, multi-file code diffs, server metrics, and deployment logs with maximum readability.

## Decision
1. DeployCheck strictly implements a **Light Theme Only** design system.
2. The UI palette strictly conforms to:
   - Primary Background: `#F7F9FC`
   - Card / Surface Background: `#FFFFFF`
   - Primary Text: `#172033`
   - Secondary Text: `#667085`
   - Border Color: `#E4E7EC`
   - Brand Blue: `#3563E9`
   - Brand Blue Hover: `#264FC7`
   - Brand Violet: `#6D5EF7`
   - Status Success: `#16803D` (green)
   - Status Warning: `#B7791F` (amber)
   - Status Error: `#C62828` (red)
3. **Strict Prohibition:** Dark mode, dark theme tokens, dark surfaces, and theme toggles are strictly forbidden in all client code, components, charts, and artifacts.

## Consequences
- High visual consistency and alignment with approved Figma/PNG design mockups in `UI Design/`.
- Elimination of dual-theme CSS complexity and accessibility contrast regressions.
- All SVG charts (health doughnut, deployment trends) must use light canvas backgrounds with explicit labels and units.
