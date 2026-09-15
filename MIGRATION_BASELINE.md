# Concept V3 migration baseline

Original source: `SREZ_Better_UI_v3.html`. This document is the repository-level structural baseline for the migrated React project.

## Screens

1. Home
2. Catalog
3. Master
4. Work
5. Photo
6. Favourites

## Core entities

- Look / haircut visual result
- Master
- Proof / evidence
- Salon or profile context
- Photo-reference analysis tags

## Key interactions preserved

- Header navigation between Стрижки / Мастера / Избранное.
- City modal on Home.
- First Mullet tile toggles FocusBlock; other look tiles show prototype feedback.
- Show more / show less on haircut list.
- Search actions route to Photo or Catalog.
- Catalog filter panel toggles open/closed.
- Master cards open Work or Master and support global prototype save state.
- Master screen exposes work/evidence, tags, and workplace context.
- Photo scenario simulates analysis, removable tags, then routes to Catalog.
- Favourites empty/saved state mirrors the prototype.
- Prototype bottom navigation remains available for fidelity QA.

## Explicit non-goals of migration

- no taxonomy redesign;
- no ranking redesign;
- no real image upload/AI analysis;
- no backend;
- no authentication;
- no real booking integration;
- no invented verification;
- no visual redesign during initial componentization.
