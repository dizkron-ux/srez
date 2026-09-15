# SREZ project agent rules

## Source of truth

Concept V3 is the approved migration baseline. The original source was `SREZ_Better_UI_v3.html`; the structural baseline is recorded in `MIGRATION_BASELINE.md` and the current React implementation.
The React implementation must preserve its approved product structure unless the user explicitly requests a product change.

## SREZ design routing

For SREZ design tasks, use `.agents/skills/srez-design-director/SKILL.md` as the project-level design router.

Precedence:
1. current explicit user request;
2. approved product structure / current implementation;
3. Structure Lock when invoked;
4. `DESIGN.md`;
5. SREZ Design Director;
6. task-specific specialist skills;
7. generic/global defaults.

Do not auto-run every installed design skill. A specialist skill may contribute only within its scope and must yield to higher-priority project rules.

Use `.agents/skills/structure-lock/SKILL.md` when the user says Structure Lock, preserve structure, preserve concept, keep the current structure, or equivalent.

## Optional OpenDesign specialists

The project includes two explicitly-invoked OpenDesign-derived specialists:

- `.agents/skills/open-design-hallmark-audit/SKILL.md` — anti-AI-slop, component-state, responsive, microinteraction, and visual QA. Default to audit; it must not change product structure.
- `.agents/skills/open-design-editorial-taste/SKILL.md` — editorial/taste polish for typography, composition, imagery, spacing, restraint, and reducing generic marketplace/SaaS feel.

Both are subordinate to `DESIGN.md`, Structure Lock, and the SREZ Design Director. Do not auto-run them merely because a prompt mentions UI or design. Invoke explicitly only when their narrow lens is useful.

Recommended combinations:
- `$srez-design-director $open-design-hallmark-audit` for visual QA / anti-slop / states / responsive checks;
- `$srez-design-director $open-design-editorial-taste` for art direction and visual polish;
- add `$srez-structure-lock` when approved structure must remain unchanged.

## Migration guard

During fidelity migration:
- do not add/remove screens;
- do not reorder major sections;
- do not change CTA meaning;
- do not redesign taxonomy;
- do not strengthen evidence claims;
- preserve current V3 copy unless explicitly asked to edit it;
- componentization/refactoring is allowed when rendered behavior remains equivalent.

## Component policy

Production screens and Storybook must use the same source components.
Never create a Storybook-only duplicate of a production component.
