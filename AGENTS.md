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
