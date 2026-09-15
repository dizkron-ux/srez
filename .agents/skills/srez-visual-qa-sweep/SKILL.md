---
name: srez-visual-qa-sweep
description: Site-wide visual regression and polish sweep for SREZ. Inspect every product screen and reusable component across breakpoints, find objective layout/craft defects, prioritize by severity, fix them without changing product structure, and re-run QA.
triggers:
  - "srez visual qa sweep"
  - "visual qa srez"
  - "пройдись по всему сайту"
  - "проверь весь срез"
  - "вычисти визуальные косяки"
  - "пиксельный qa"
---

# SREZ Visual QA Sweep

## Role

Act as a senior product designer + frontend visual QA reviewer for SREZ.

Your task is to find and remove objective visual defects across the whole app: alignment drift, touching text, broken baselines, bad wrapping, overflow, inconsistent spacing, broken responsive behavior, icon/chevron positioning, component-state gaps, and other implementation-level craft issues.

This is NOT a redesign skill.

Use `DESIGN.md` as the visual contract. Use the current approved React implementation and `MIGRATION_BASELINE.md` as the product/structure baseline.

When Structure Lock is active, treat it as a hard guard.

## Priority / conflict resolution

Follow this order:

1. current explicit user request;
2. approved product structure / current implementation;
3. `srez-structure-lock` when active;
4. `DESIGN.md`;
5. `srez-design-director`;
6. this skill;
7. other specialist skills;
8. generic/global defaults.

Never use a visual QA finding as permission to change information architecture, taxonomy, CTA meaning, navigation semantics, evidence claims, or product logic.

## Default scope

Unless the user narrows scope, inspect the full SREZ UI:

- all production screens/routes;
- all reusable components used by those screens;
- Storybook stories when available, especially component states;
- desktop and responsive layouts;
- visible interaction states that can be exercised safely.

Do not only inspect the current viewport or the single screen mentioned in the prompt when the request is explicitly site-wide.

## Required breakpoint sweep

At minimum validate these widths:

- 320 px;
- 375 px;
- 414 px;
- 768 px;
- 1280 px;
- 1440 px.

If the implementation has meaningful additional breakpoints, test around them too, including just below and just above breakpoint boundaries.

## Visual defect checklist

### 1. Alignment and baseline

Check:
- icon/text vertical centering;
- chevrons/arrows aligned to control text;
- label/value baselines;
- repeated cards/rows sharing the same internal alignment;
- inline navigation items accidentally touching;
- breadcrumbs/back-links/meta text with missing gaps;
- optical alignment where mathematical centering still looks wrong.

Typical defect examples:
- `Москва` and its chevron sitting on different baselines;
- `Назад` touching an eyebrow/section label;
- icon offset caused by line-height rather than explicit alignment.

### 2. Spacing rhythm

Check:
- accidental zero/too-small gaps;
- inconsistent sibling gaps;
- mismatched section spacing;
- asymmetric padding that is not intentional;
- duplicated margin + gap causing oversized whitespace;
- components that visually stick together;
- controls whose hit-area spacing differs from visual spacing.

Prefer fixing the shared layout/component rule rather than patching each instance separately.

### 3. Typography and wrapping

Check:
- headline clipping;
- ugly or accidental line breaks;
- long Russian words/labels;
- orphaned single words when avoidable;
- line-height collisions;
- text touching icons;
- uppercase eyebrow tracking and spacing;
- mixed font metrics creating vertical jumps;
- font fallback changing layout;
- clickable text wrapping unexpectedly.

Do not rewrite copy merely to hide an implementation problem unless the user explicitly asks for copy changes.

### 4. Overflow and clipping

Check:
- horizontal scroll;
- content escaping containers;
- hidden text caused by `overflow`;
- cropped focus rings;
- images overflowing cards;
- sticky/fixed UI covering content;
- modals/popovers clipped by parent overflow;
- large display type exceeding viewport width.

### 5. Components and controls

Check:
- buttons;
- links;
- inputs;
- select/city controls;
- chips/tags;
- cards;
- evidence rows;
- filters;
- modals;
- save/favourite controls;
- search composer;
- prototype navigation if still present.

For interactive components, inspect where applicable:
- default;
- hover;
- focus-visible;
- active/pressed;
- selected/unselected;
- disabled;
- loading;
- error;
- success.

Do not invent states that the product does not need; report missing required states when implementation semantics imply they should exist.

### 6. Responsive behavior

Check:
- grid collapse;
- flex wrapping;
- section-header collapse;
- image aspect/crop;
- card ordering;
- filter layout;
- long control labels;
- modal width/padding;
- touch target spacing;
- navigation collapse;
- typography scale;
- accidental desktop-only assumptions.

A layout is not responsive merely because nothing visibly overflows. It must remain readable, scannable, and intentionally composed.

### 7. Consistency

Check:
- radius vocabulary;
- border weight/color;
- shadow usage;
- divider treatment;
- icon sizing/stroke treatment;
- typography roles;
- image treatment;
- repeated component spacing;
- hover/focus language;
- muted text contrast.

Use `DESIGN.md` and existing strongest components as references. Do not normalize intentional differences that communicate hierarchy.

### 8. Accessibility-adjacent visual QA

Check visible issues that affect usability:
- focus visibility;
- text/background contrast concerns;
- touch target crowding;
- controls distinguished by more than color where relevant;
- readable text at narrow widths;
- no motion-dependent-only feedback.

This skill is not a substitute for a full accessibility audit, but obvious visual accessibility defects are in scope.

## Severity model

Classify findings before editing:

### P0 — Broken
Prevents use or makes content inaccessible.
Examples: severe overlap, hidden CTA, unusable modal, horizontal layout completely broken.

### P1 — Obvious visual defect
Clearly unintended and visible to normal users.
Examples: touching labels, displaced chevron, clipped headline, broken alignment, wrong responsive collapse.

### P2 — Craft / consistency issue
Does not block use but makes the interface feel unfinished.
Examples: inconsistent spacing, weak baseline rhythm, mismatched control heights, inconsistent divider treatment.

### P3 — Subjective taste
Could plausibly be a design preference rather than a defect.
Do not auto-fix P3 in a QA sweep. Surface it separately for art direction.

## Workflow

### Step 1 — Inventory

Create a short inventory of screens/routes and reusable components to inspect.
Use the real codebase and Storybook stories rather than guessing.

### Step 2 — Audit first

Inspect the whole requested scope before making broad edits.
Record findings with:
- screen/component;
- breakpoint/state;
- defect;
- severity;
- likely root cause;
- shared vs local fix.

### Step 3 — Fix root causes

Prefer shared fixes in this order:
1. design token / shared style rule;
2. reusable component;
3. shared layout primitive;
4. page-specific layout;
5. one-off patch only when genuinely local.

Avoid accumulating arbitrary pixel nudges across many files.

### Step 4 — Structure safety check

For every fix, verify it does NOT:
- add/remove screens;
- reorder major sections;
- change navigation meaning;
- alter CTA meaning;
- change taxonomy;
- change evidence strength/provenance;
- change ranking/search logic;
- rewrite content meaning.

If a visual defect can only be fixed by changing product structure, stop and report it as a product/design decision instead of silently changing it.

### Step 5 — Regression sweep

After fixes, re-check:
- every affected screen;
- all required breakpoints;
- reused components in other contexts;
- relevant states;
- no new overflow/wrapping/alignment regression.

Do not declare completion after checking only the originally reported example.

## Interaction with other SREZ skills

Recommended stack for a full cleanup:

`$srez-design-director $srez-visual-qa-sweep $srez-structure-lock`

Optional:
- add `$open-design-hallmark-audit` for a stricter anti-slop/state/responsive critique;
- add `$open-design-editorial-taste` only for P3 art-direction polish after objective defects are resolved.

This skill owns objective visual QA. It does not own product strategy or aesthetic reinvention.

## Anti-patch rules

Avoid:
- magic negative margins unless root cause is understood;
- repeated `transform: translate(...)` nudges to compensate for broken layout;
- hardcoded desktop widths that break smaller screens;
- hiding overflow to conceal layout bugs;
- shortening/replacing copy solely to make layout pass;
- duplicating components just to fix one screen;
- fixing the screenshot while breaking another breakpoint.

Prefer semantic flex/grid alignment, explicit gaps, correct line-height, `min-width: 0`, sensible wrapping rules, stable component dimensions, and shared tokens.

## Completion format

Keep the final report concise and actionable:

- screens/components checked;
- P0/P1/P2 issues fixed;
- any P3 items intentionally left for art direction;
- any product/structure issue discovered but not changed;
- breakpoints re-checked;
- remaining risk, if any.

If no issue is found in a category, do not invent one.