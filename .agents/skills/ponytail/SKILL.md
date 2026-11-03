---
name: ponytail
description: Engineering restraint and anti-bloat skill. Enforces the Ladder of Simplicity to prevent over-engineering, unnecessary dependencies, and premature complexity.
---

# Ponytail — Engineering Restraint & Minimalist Architecture

"The best code is the code you never wrote."

## The Ladder of Simplicity

Before writing any new code, climb the decision ladder:

1. **YAGNI (You Aren't Gonna Need It):**  
   Does this feature or abstraction actually need to exist right now? If no, skip it.
2. **Reuse:**  
   Is there an existing component, utility, or helper in the codebase that already does this?
3. **Standard Library:**  
   Can standard Node.js / TypeScript features accomplish this without a third-party package?
4. **Native Platform:**  
   Can standard web platform APIs or SQL primitives solve this natively?
5. **Installed Dependency:**  
   Can an existing dependency in `package.json` handle this without adding another npm package?
6. **One Line:**  
   Can this logic be expressed in a single clear, readable expression?
7. **Minimum Viable Code:**  
   Only after exhausting the steps above, write the minimal readable code that satisfies the requirement.

## Critical Invariants Protected

Never use Ponytail to cut corners on:
- Security validation & tenant boundaries.
- Error handling & edge cases.
- Test coverage for business logic.
- Accessibility and contrast.
