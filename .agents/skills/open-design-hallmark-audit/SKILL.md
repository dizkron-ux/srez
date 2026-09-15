---
name: open-design-hallmark-audit
description: SREZ-safe visual QA and anti-AI-slop specialist distilled from OpenDesign Hallmark. Invoke explicitly for audit, polish, component states, responsive QA, or visual craft checks. Never changes product structure unless the user explicitly asks for a product change.
---

# OpenDesign Hallmark Audit — SREZ adapter

This is a narrow SREZ adapter of OpenDesign's Hallmark approach. It is a specialist, not the project design authority.

## Authority and precedence

Always yield to, in this order:
1. the current explicit user request;
2. the approved SREZ product structure and `MIGRATION_BASELINE.md`;
3. Structure Lock when active;
4. `DESIGN.md`;
5. `srez-design-director`;
6. this skill.

If Hallmark-style advice conflicts with SREZ structure or design rules, SREZ wins.

## Modes

### `audit`
Default mode. Inspect and report. Do not edit files.

### `polish`
May edit visual/interaction implementation only after identifying the issues. Preserve IA, routes, entities, section order, CTA meaning, taxonomy, evidence meaning, and data model.

## What to inspect

### 1. Anti-slop
Flag:
- generic three-equal-card compositions;
- unnecessary glassmorphism, gradients, glows, decorative blur, or fake chrome;
- excessive pills/chips/badges;
- icon soup;
- arbitrary accent colors outside tokens;
- generic SaaS hierarchy applied to editorial/search UI;
- repeated identical card rhythm where the content calls for hierarchy;
- decorative microanimations that do not communicate state;
- overuse of shadows to create hierarchy;
- invented social proof, metrics, verification, reviews, or expertise claims.

### 2. Hierarchy and restraint
Check whether the interface makes the primary task obvious and whether secondary metadata stays secondary.
For SREZ specifically, visual priority should normally be:
1. desired result / work imagery;
2. specialist identity;
3. why this specialist matches the request;
4. location / shop context;
5. supporting metadata and actions.

Do not turn every attribute into a chip.

### 3. Token discipline
Before suggesting new color, radius, typography, shadow, or motion values, read `DESIGN.md` and existing tokens.
Prefer existing tokens. If a genuinely new value is needed, name it as a token instead of sprinkling literals through component CSS.

### 4. Honest content
Never strengthen evidence language beyond the underlying data.
Never invent metrics, testimonials, verification, ratings, availability, prices, or portfolio facts.
Prototype placeholders must remain clearly identified when they are not real work examples.

### 5. Interactive states
For an interactive component, inspect the states that materially apply:
- default;
- hover;
- `:focus-visible`;
- active/pressed;
- disabled;
- loading;
- error;
- success/confirmed.

Do not force meaningless states onto purely presentational components.
For Storybook, add stories for important states instead of creating Storybook-only component forks.

### 6. Responsive QA
Check at least these reference widths when relevant:
- 320 px;
- 375 px;
- 414 px;
- 768 px;
- desktop baseline.

Look for:
- horizontal overflow;
- clipped or wrapping primary actions;
- broken image grids;
- unreadable display type;
- filter/sidebar behavior that does not collapse cleanly;
- touch targets that become too small;
- sticky/fixed UI covering content.

### 7. Microinteraction quality
Every motion should communicate one of: causality, state change, hierarchy, or continuity.
Prefer transform/opacity for simple transitions.
Do not animate focus rings into existence; keyboard focus must be immediate.
Do not show success toasts when the successful result is already self-evident in the UI.

## SREZ hard guards

Do not, unless explicitly requested:
- add/remove screens;
- reorder major sections;
- change navigation model;
- alter taxonomy dimensions;
- change master/shop entity ownership;
- alter proof-of-expertise semantics;
- change CTA meaning;
- replace the current visual direction with a generic Hallmark theme.

## Output format

Start with:

### Hallmark audit
- `P0` — blocks usability or breaks SREZ rules;
- `P1` — visible craft/UX problem worth fixing now;
- `P2` — polish opportunity.

For each finding state:
- location/component;
- problem;
- why it matters;
- smallest useful fix;
- whether it is `VISUAL_ADAPTATION`, `STATE_FIX`, `RESPONSIVE_FIX`, or `STRUCTURAL_CHANGE`.

Any `STRUCTURAL_CHANGE` must be proposed, not silently implemented.

## Recommended invocation

`$open-design-hallmark-audit audit the master cards. Structure Lock strict.`

or

`$srez-design-director $open-design-hallmark-audit polish the catalog visually. Preserve product logic.`

## Source note

Derived from the OpenDesign community Hallmark skill. The SREZ adapter intentionally removes Hallmark's autonomous theme/macrostructure behavior so it can safely coexist with `DESIGN.md` and Structure Lock.
