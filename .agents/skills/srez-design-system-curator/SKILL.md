---
name: srez-design-system-curator
description: Curate SREZ Storybook and design-system documentation using established product design-system conventions. Keep the sidebar focused on public foundations, components, patterns, screens, and service documentation; consolidate variants and states into one page per public component; keep QA breadth in automation instead of navigation clutter.
triggers:
  - "srez design system curator"
  - "приведи сторибук в порядок"
  - "почисти сторибук"
  - "собери дизайн систему среза"
  - "организуй сторибук как продуктовую дизайн систему"
---

# SREZ Design System Curator

## Role

Act as a design-system curator for SREZ.

Your job is to keep Storybook useful as product documentation rather than turning it into a dump of fixtures, implementation helpers, or one sidebar item per visual state.

Use conventions common to mature product design systems such as GitHub Primer, IBM Carbon, Atlassian Design System, and Storybook's own documentation model:

- navigation centers on public components and meaningful product patterns;
- variants and interaction states live inside the component page;
- implementation helpers stay out of the public navigation unless they become stable reusable primitives;
- screen states are grouped under the screen rather than duplicated into many sidebar stories;
- visual regression coverage is automated and does not need to mirror sidebar granularity.

This skill governs Storybook/documentation architecture. It does not redesign SREZ product structure.

## Priority / conflict resolution

Follow this order:

1. current explicit user request;
2. approved product structure / current React implementation;
3. `srez-structure-lock` when active;
4. `DESIGN.md`;
5. `srez-design-director`;
6. this skill;
7. visual/taste specialists;
8. generic defaults.

Never use Storybook cleanup as permission to change information architecture, taxonomy, navigation semantics, CTA meaning, evidence rules, ranking logic, or production copy meaning.

## Public Storybook architecture

Default top-level navigation:

- `Foundations`
- `Components`
- `Patterns`
- `Screens`
- `Documentation`

Do not add a new top-level section without a clear product-system reason.

### Foundations

Keep foundations small and durable.

Default SREZ foundations:
- `Tokens` — color, typography, spacing/shape on one page;
- `Icons` — one complete icon gallery.

Do not create separate pages for every color family, font sample, spacing step, or individual icon.

### Components

A sidebar item should represent a stable public UI component used by the product.

For each public component:
- create one visible page;
- show variants together;
- show sizes together;
- show meaningful states together;
- include long-content/stress examples on the same page when relevant;
- allow viewport resizing rather than adding separate desktop/mobile sidebar entries.

Do NOT create visible sidebar stories like:
- `Button / Primary`
- `Button / Secondary`
- `Button / Hover`
- `Button / Focus`
- `Icon / Search`
- `Icon / Heart`
- `MasterCard / Saved`
- `MasterCard / Mobile`

Those are examples or QA cases, not navigation units.

### Patterns

Use `Patterns` for product-specific compositions made from components where the composition itself has reusable product meaning.

Examples:
- Search composer;
- Featured result / focus block.

Do not promote a one-off layout helper to Patterns merely because it has its own React file.

### Screens

Expose one visible page per product screen:
- Home;
- Catalog;
- Master;
- Work;
- Photo;
- Favourites.

Meaningful screen states belong behind a state/preset control or equivalent in the same screen page.

Do not create separate visible sidebar entries for:
- `Home / Default`;
- `Home / Focus selected`;
- `Home / City modal`;
- `Photo / Analyzed`;
- `Photo / No tags`;
- responsive duplicates.

The screen page may expose these as controls while automated QA renders every required preset.

### Documentation

Prefer one concise service specification entry over multiple inventory/status pages.

Documentation should explain:
- navigation model;
- public component inventory;
- screen state coverage;
- known prototype gaps;
- curation rules.

Do not duplicate information already maintained in `DESIGN.md`, `SERVICE_SPEC.md`, or `VISUAL_QA_AUDIT.md` unless the Storybook summary makes navigation materially easier.

## Public vs internal decision

Before creating a Storybook page, classify the code unit.

### PUBLIC COMPONENT

Promote when it has a stable independent UI contract and is meaningful to a designer/developer using the system.

Examples:
- Button;
- Header;
- Filters;
- Modal;
- Look card;
- Master card;
- Evidence.

### PRODUCT PATTERN

Promote when multiple components form a meaningful reusable product composition.

Examples:
- Search composer;
- Featured match.

### INTERNAL HELPER

Do not expose by default.

Typical examples:
- ContextLine;
- RegionSelector;
- SaveButton;
- Media placeholder;
- PrototypeNav;
- tiny wrappers whose meaning only exists inside another component.

An internal helper can still have unit tests or automated QA. Lack of a sidebar page does not mean lack of quality coverage.

## State documentation rule

The public page must make supported states understandable without multiplying sidebar entries.

Prefer:
1. a single specimen matrix on the component page;
2. Storybook Controls for mutable state;
3. play functions to place hover/focus examples into meaningful state;
4. automated rendered QA for breakpoint/state combinations.

Do not duplicate production components just to show a state.

## Responsive rule

Responsive behavior belongs to the same component/screen page.

Use:
- Storybook viewport controls;
- responsive specimen layouts;
- automated checks at project QA widths.

Do not create `Mobile`, `Tablet`, or `Desktop` as permanent sidebar stories unless the layout is a genuinely distinct product variant rather than a breakpoint.

## QA separation

Storybook navigation and QA coverage are different concerns.

The sidebar should stay concise even when QA is exhaustive.

Automated QA may render:
- multiple screen presets;
- multiple breakpoints;
- hover/focus/disabled states;
- long content;
- overflow checks;
- screenshots.

Keep that breadth in the QA script/report, not as dozens of visible stories.

## SREZ default curated inventory

### Foundations
- Tokens
- Icons

### Components
- Button
- Header
- Filters
- Modal
- Look card
- Master card
- Evidence

### Patterns
- Search composer
- Featured match

### Screens
- Home
- Catalog
- Master
- Work
- Photo
- Favourites

### Documentation
- Service specification

Treat this inventory as a default, not an immutable product rule. Change it when the implementation meaningfully changes.

## Definition of done

A Storybook curation task is complete when:

- the sidebar is understandable without knowing the codebase;
- a designer can find a component by product meaning;
- one public component is not split into many state pages;
- icons are represented by one gallery;
- mobile/responsive entries do not clutter navigation;
- internal helpers are not promoted without reason;
- screen states remain discoverable through controls;
- visual QA still exercises required states and breakpoints;
- production and Storybook use the same source components;
- no product structure changed accidentally;
- docs and Storybook inventory agree.

## Recommended invocation

Use:

`$srez-design-director $srez-design-system-curator $srez-structure-lock`

for Storybook/design-system restructuring that must preserve the approved product.

Add `$srez-visual-qa-sweep` after curation when the task also includes a rendered regression pass.
