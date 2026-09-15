---
name: open-design-editorial-taste
description: Optional editorial-minimalist visual-polish lens adapted from OpenDesign's web-prototype-taste-editorial skill. Use explicitly for SREZ art direction, typography, spacing, composition, image hierarchy, and anti-generic UI polish. Never overrides DESIGN.md or product structure.
---

# OpenDesign Editorial Taste — SREZ adapter

This is an optional visual-polish specialist derived from OpenDesign's editorial taste template. It is not a replacement design system.

## Precedence

Yield to:
1. current user request;
2. approved SREZ structure / `MIGRATION_BASELINE.md`;
3. Structure Lock;
4. `DESIGN.md`;
5. `srez-design-director`;
6. this skill.

Do not import a foreign visual system wholesale. Translate useful craft principles into the existing SREZ language.

## Use when

Invoke for:
- art direction;
- typography tuning;
- spacing/rhythm;
- editorial composition;
- reducing generic marketplace/SaaS feel;
- photography-first hierarchy;
- restrained motion;
- visual polish of one screen/component.

Do not use this skill to decide taxonomy, ranking, data model, IA, or product flows.

## SREZ-compatible taste principles

### Canvas and contrast
- Prefer the existing warm canvas and off-black/soft-black hierarchy from `DESIGN.md`.
- Avoid pure-black/pure-white contrast unless the current tokens explicitly call for it.
- Use accent color sparingly for meaning, not decoration.

### Typography
- Preserve the project's display/body pairing.
- Use display typography for editorial emphasis, not for every heading.
- Keep body/meta text quiet and functional.
- Tune line length, tracking, and vertical rhythm before adding decoration.

### Borders, shadows, radii
- Prefer hairline separators and restrained elevation.
- Avoid stacking border + heavy shadow + tinted background on the same object without a clear reason.
- Avoid turning every surface into a rounded card.
- Avoid excessive `rounded-full`; pills are for compact controls/tags, not general containers.

### Composition
- Prefer asymmetric hierarchy when the content supports it.
- Avoid generic equal-card grids when one item deserves stronger emphasis.
- Let photography/work imagery carry the page where possible.
- Use whitespace to separate semantic groups before adding boxes.
- Keep visual chrome quieter than the specialist's work and match evidence.

### Chips and tags
- Use chips only for attributes that benefit from scanability or interaction.
- Do not convert prose, evidence, location, or every metadata field into pills.

### Motion
- Keep motion subtle and causal.
- Prefer opacity/transform for micro-motion.
- Avoid perpetual ambient animation in core product flows.
- Respect reduced-motion preferences when adding non-essential motion.

### Copy and content
- Avoid generic AI-copy clichés.
- Prefer direct product language.
- Never invent proof, metrics, reviews, or trust signals to make a layout feel fuller.

## SREZ-specific lens

When polishing SREZ, ask:
- Are the works/results visually stronger than the chrome around them?
- Is it immediately clear why this master is relevant?
- Is the shop/location context visible without competing with the master?
- Does proof of expertise read like evidence rather than marketing?
- Does the screen feel like contemporary editorial discovery/search rather than a generic beauty marketplace or SaaS dashboard?

## Structural guard

Allowed without product approval:
- spacing;
- type scale within `DESIGN.md` boundaries;
- visual grouping;
- border/shadow/radius tuning;
- image treatment;
- hover/focus/pressed behavior;
- responsive layout adaptation that preserves hierarchy and meaning.

Requires explicit product approval:
- section reordering;
- new/removed modules;
- changed filter taxonomy;
- new CTA semantics;
- changed navigation;
- changing what counts as proof;
- replacing master-first architecture with salon-first architecture.

## Output

When auditing, return no more than 7 high-value findings, ordered by impact.
When editing, make the smallest coherent patch and then compare the result against Structure Lock / current baseline.

## Recommended invocation

`$srez-design-director $open-design-editorial-taste polish the master profile. Structure Lock strict.`

## Source note

Adapted from OpenDesign's `web-prototype-taste-editorial` skill, which emphasizes warm editorial surfaces, serif + grotesque pairing, hairline borders, restrained shadows, asymmetric composition, generous rhythm, and subtle motion. SREZ's own `DESIGN.md` remains authoritative.
