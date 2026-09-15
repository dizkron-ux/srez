# Visual QA audit

Scope: source-level component audit + rendered Storybook regression sweep. The automated sweep renders every story and captures screenshots. Screen stories are checked at 320 / 375 / 414 / 768 / 1280 / 1440 px; component stories at 375 / 1280 px.

## Fixed in the component/system pass

### P1 — obvious craft defects
- City selector chevron baseline drift: removed font-glyph dependency and stabilized alignment.
- Back + eyebrow collision on Photo/Catalog/Favourites: moved to shared `ContextLine`.
- Unicode action glyphs in SearchComposer, master cards, LookCard, modal and FocusBlock: replaced by shared SVG `Icon` component.
- Master/Work back affordances now reuse `ContextLine` instead of page-local arrow text.
- Mobile Header previously hid the Masters destination at <=700px; all three primary destinations now remain reachable.

### P2 — component consistency
- Added shared `SaveButton` instead of duplicate save markup in card/profile.
- Added explicit disabled styling for shared button/save/icon controls.
- Added dialog/nav/accessibility labels where the existing structure supported them.
- Added long-content, focus, hover and mobile Storybook cases for reusable components.
- Storybook now includes Foundations, Components, Screens, QA and Documentation sections.

## First rendered audit — 2026-09-15

Automated result: **91 stories / 248 rendered checks**.

The first pass surfaced four categories:
- 130 generic 404 console messages caused by the intentionally uncommitted `cosmosOracle` font reference. The display token now uses the same fallback chain without requesting the missing asset; no font file was added.
- FocusBlock component story overflow at 375px caused by the Storybook decorator width, not the production component. The story wrapper was corrected.
- Icon Gallery component story overflow at 375px caused by its three-column minimum width. The story gallery was made responsive.
- wrapped-control detector false positives for the favourites count badge and deliberately multi-line master name. The detector now treats those structures correctly rather than changing valid production UI.

The production screen screenshots from the first pass did **not** expose horizontal overflow in Home, Catalog, Master, Work, Photo or Favourites at the six target widths. The remaining production issues are behavioural/product-state gaps listed below rather than pixel overflow defects.

## Product/behaviour gaps found but not silently changed

### P1 product correctness
- Favourites copy says saved data is stored in the browser, but current state is in-memory only.
- One global `saved` boolean makes every master card appear saved together.
- Master and Work screens always render the first fixture instead of the clicked entity.

### P2 interaction gaps
- Search text does not drive catalog query/filtering; Enter/submission behaviour is not specified.
- Filter checkboxes and reset do not change result data.
- City input is not persisted and the modal lacks focus trap/Escape-close rules.
- Photo analysis is simulated; upload/loading/error states do not exist.
- Real media loading/error/fallback behaviour is undefined because current media is illustrative placeholder art.

### P2 missing screen states
- catalog loading / no results / error;
- master missing evidence / no works / booking unavailable;
- work missing source / media error;
- favourites multiple items / persistence / empty-after-remove;
- network and retry states generally.

## Visual checks retained in CI

Every push to `main` now:
1. typechecks the project;
2. builds Storybook;
3. launches Chromium;
4. renders Storybook stories at their QA target widths;
5. checks horizontal overflow, offscreen/clipped UI, wrapped action controls and resource/console errors;
6. uploads the screenshots and `report.json` as the `storybook-visual-qa` artifact.

## Severity convention

- P0: unusable/broken flow.
- P1: obvious visual or correctness defect that should be fixed before review.
- P2: polish, resilience, accessibility or missing-state gap.
- P3: subjective art-direction preference; do not auto-fix without design intent.
