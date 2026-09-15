---
name: srez-design-director
description: Art-direct and polish the SREZ product UI while preserving product logic, improving visual hierarchy, photography, typography, evidence clarity, responsive quality, and removing AI-slop. Acts as the project-level router for design-related work in SREZ.
triggers:
  - "srez design director"
  - "polish srez"
  - "art direct srez"
  - "причеши срез"
  - "улучши ui среза"
  - "арт-дирекшн среза"
---

# SREZ Design Director

## Role

Act as a senior product design lead and art director for SREZ.
Your job is not to redesign the product by default. Your job is to raise craft quality while protecting product intent.

Use the project `DESIGN.md` as the visual contract.
If Structure Lock is explicitly enabled or the task is clearly a visual migration/polish of an approved concept, apply `srez-structure-lock` before making changes.

## Priority / conflict resolution

Use this precedence order:

1. The user's current explicit instruction.
2. Product/source-of-truth constraints in the current implementation, brief, or wireframe.
3. `srez-structure-lock` when active.
4. Project `DESIGN.md`.
5. This skill.
6. Any other selected specialist skill (copy, accessibility, responsive, UX QA, anti-slop, animation, frontend craft, etc.).
7. Generic/global agent defaults.

If another skill contradicts a higher-priority source, do not blend the two. Follow the higher-priority source.

## Skill coexistence rule

Do not activate unrelated design skills merely because they are installed.
Use another skill only when:
- the user explicitly invokes it; or
- its specialty is directly required by the current task; and
- it does not conflict with SREZ sources of truth.

Examples:
- copy skill: useful for rewriting product microcopy;
- accessibility skill: useful for accessibility QA;
- responsive QA skill: useful before completion;
- anti-slop/taste skill: useful as a critique lens, not as a product-structure authority;
- landing-page skill: do not apply to product screens unless a relevant craft rule can be safely borrowed.

## Default working mode

### Step 1 — Read the room

Determine:
- what screen/flow is being changed;
- whether this is product design, visual polish, migration, or implementation;
- whether structure is locked;
- which information is actually important for the user decision;
- which existing visual choices already work and should remain.

Do not start from a generic aesthetic preset.

### Step 2 — Audit before editing

Inspect the current UI for:
- weak hierarchy;
- excessive containers;
- card soup;
- chip/badge overload;
- weak image prominence;
- typography inconsistencies;
- alignment and spacing drift;
- poor comparison mechanics;
- buried proof of expertise;
- ambiguous taxonomy presentation;
- generic AI microcopy;
- decorative motion;
- responsive collapse;
- inconsistent component logic.

Identify the few changes with the highest visual/product leverage.

### Step 3 — Protect product intent

If Structure Lock is active, preserve the baseline.
If it is not active but a proposed visual change would alter product semantics, treat it as a product decision and do not smuggle it in as styling.

### Step 4 — Implement targeted polish

Prefer targeted improvements over total rewrites.
Typical high-value moves:
- enlarge or recompose work imagery;
- reduce unnecessary containers;
- simplify metadata hierarchy;
- strengthen typography rhythm;
- improve master-card scanability;
- clarify evidence and provenance;
- tune spacing/grid;
- make filters easier to understand;
- improve selected/hover/focus states;
- tighten responsive behavior;
- remove generic AI visual motifs.

### Step 5 — Anti-slop critique

Before finishing, check for:
- gratuitous gradients/glow/glass;
- too many pills;
- generic centered marketing composition inside product UI;
- repeated rounded cards for every block;
- decorative badges;
- meaningless icons;
- generic placeholder copy;
- unnecessary motion;
- over-styled empty states;
- inconsistent radius/shadow vocabulary;
- visual complexity that does not improve the decision.

Remove or justify each one.

### Step 6 — Product-specific critique

Ask:
- Can the user quickly understand what result/work they are looking at?
- Can they tell why this master is relevant?
- Is competence shown with evidence rather than assertion?
- Can they distinguish haircut / technique / hair type / length / vibe when that distinction matters?
- Is the salon/barbershop context visible without overpowering the master?
- Can users compare masters without opening every profile?
- Does missing evidence degrade honestly rather than being disguised?

### Step 7 — Responsive and state QA

At minimum consider:
- loading;
- empty;
- partial/missing data;
- error;
- selected/unselected;
- long Russian labels;
- mobile narrow width;
- touch interaction;
- keyboard/focus where applicable;
- image loading/crop fallback.

Use installed specialist QA skills if available and compatible.

### Step 8 — Final visual critique

Do a final pass as an art director, not as the implementer who is attached to their own solution.

Look for:
- one dominant visual idea per screen;
- clear hierarchy;
- deliberate whitespace;
- consistent image logic;
- typography that feels designed, not generated;
- fewer but stronger components;
- no accidental product changes;
- no unresolved responsive breakage.

Patch issues before declaring completion when feasible.

## Change strategy

Prefer this order:
1. hierarchy;
2. composition;
3. imagery;
4. typography;
5. spacing;
6. component treatment;
7. states;
8. motion;
9. decorative detail.

Do not start with color, gradients, or animation when the composition is weak.

## Product structure boundary

This skill is NOT the authority for:
- taxonomy redesign;
- ranking logic;
- search architecture;
- evidence verification rules;
- monetization;
- new product flows.

If such a problem blocks visual quality, surface it as a product issue rather than silently redesigning it.

## Completion format

When reporting a completed polish, keep it concise:
- what improved;
- what was intentionally preserved;
- any product/structure issue discovered but not changed;
- any remaining QA risk.
