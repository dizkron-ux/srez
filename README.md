# SREZ Concept V3 — React migration

A componentized React + TypeScript + Vite version of the approved `SREZ_Better_UI_v3.html` prototype.

## Why this exists

The original Concept V3 was a single HTML file with CSS, data, view functions, state, and interactions in one document. This project preserves the same product structure and visual baseline while splitting it into reusable production components that are also rendered in Storybook.

## Stack

- React
- TypeScript
- Vite
- Storybook

## Run

```bash
npm install
npm run dev
```

Storybook:

```bash
npm run storybook
```

Production build:

```bash
npm run build
```

## Structure

- `src/pages/` — the six Concept V3 screens.
- `src/components/` — shared UI used by the app and Storybook.
- `src/data/` — prototype look/master data.
- `src/styles/globals.css` — V3 CSS copied from the source prototype for fidelity.
- `legacy/SREZ_Better_UI_v3.html` — immutable migration baseline.
- `MIGRATION_BASELINE.md` — product-structure baseline.
- `DESIGN.md` — SREZ visual contract.
- `AGENTS.md` — Codex project routing and migration guard.
- `.agents/skills/` — SREZ Design Director + Structure Lock.

## Storybook role

Storybook is not a separate version of SREZ. It renders the same components the product uses. Component changes should be made once and observed both in the app and its stories.

https://srez-better-ui-storybook.vercel.app/?path=/story/00-foundations--surface-rules

## Migration status

Initial goal: structure and interaction fidelity, not redesign. The legacy file remains the reference for regression comparison.
