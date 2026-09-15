# Visual QA audit

Scope: source-level component audit + rendered Storybook regression sweep. Storybook navigation is curated separately from QA breadth: public pages stay compact while the audit expands meaningful screen presets and breakpoints behind the scenes.

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
- Consolidated Storybook around public Foundations, Components, Patterns, Screens and Documentation instead of one sidebar story per state.
- Internal helpers remain covered through parent components/screens and QA rather than receiving dedicated public pages.

## Rendered audit history — 2026-09-15

### Broad migration audit

The initial migration-oriented Storybook had **91 stories / 248 rendered checks**. That pass was intentionally exhaustive in the sidebar and surfaced Storybook-fixture issues, font-resource noise and a few false positives. It also confirmed that the six production screens did not have horizontal overflow at the target widths.

### Curated product Storybook audit

After reorganizing Storybook like a product design system, the public navigation contains **18 visible stories** while automated QA still expands screen state presets.

Current automated result: **18 visible stories / 113 rendered checks / 0 issue records**.

Coverage:
- Foundations, Components and Patterns at 375 / 1280 px;
- every Home, Catalog, Master, Work, Photo and Favourites preset at 320 / 375 / 414 / 768 / 1280 / 1440 px;
- hover/focus play-function states where defined;
- horizontal overflow, offscreen/clipped UI, wrapped action controls, resource errors and console errors;
- screenshots for every rendered case.

A first curated run found one Storybook-only overflow in the Filters specimen layout at 375 px. The specimen grid was made responsive and the follow-up audit returned **0 issues**. No production Filters structure was changed for that fix.

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

For Storybook checks on PRs and configured pushes, CI:
1. typechecks the project;
2. builds Storybook;
3. launches Chromium;
4. expands the curated stories into their QA state/breakpoint matrix;
5. checks horizontal overflow, offscreen/clipped UI, wrapped action controls and resource/console errors;
6. uploads screenshots and `report.json` as the `storybook-visual-qa` artifact.

The sidebar can therefore stay concise without reducing regression coverage.

## Severity convention

- P0: unusable/broken flow.
- P1: obvious visual or correctness defect that should be fixed before review.
- P2: polish, resilience, accessibility or missing-state gap.
- P3: subjective art-direction preference; do not auto-fix without design intent.
