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

Full Storybook static build:

```bash
npm run build-storybook
```

## Structure

- `src/pages/` — the six Concept V3 screens.
- `src/components/` — shared UI used by the app and Storybook.
- `src/storybook/` — foundations + service-specification stories.
- `src/data/` — prototype look/master data.
- `src/styles/` — production styles and shared QA fixes.
- `legacy/SREZ_Better_UI_v3.html` — immutable migration baseline.
- `MIGRATION_BASELINE.md` — product-structure baseline.
- `DESIGN.md` — SREZ visual contract.
- `AGENTS.md` — Codex project routing and migration guard.
- `.agents/skills/` — SREZ design/QA skills.
- `docs/SERVICE_SPEC.md` — full service/component/state specification.
- `docs/STORYBOOK_COVERAGE.md` — Storybook coverage matrix.
- `docs/VISUAL_QA_AUDIT.md` — QA findings, fixed issues, and remaining risks.

## Storybook role

Storybook is not a separate version of SREZ. It renders the same production components. Component changes should be made once and observed both in the app and its stories.

The older reference Storybook is still available here while the new Git-connected Storybook deployment is being set up:
https://srez-better-ui-storybook.vercel.app/?path=/story/00-foundations--surface-rules

## QA / CI

Pushes and pull requests run `npm run typecheck` and `npm run build-storybook` via GitHub Actions. Responsive visual QA target widths are 320 / 375 / 414 / 768 / 1280 / 1440 px.

## Migration status

Concept V3 structure remains locked. Current work focuses on component consistency, state coverage, responsive resilience and Storybook completeness rather than redesigning the product model.
