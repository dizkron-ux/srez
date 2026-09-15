# Visual QA audit

Scope: source-level audit of Concept V3 components/screens plus the user-reported rendered defects. This is not yet a screenshot-regression report for every breakpoint; that final pass requires the current Storybook deployment to be available and connected to this repository.

## Fixed in the QA/component pass

### P1 — obvious craft defects
- City selector chevron baseline drift: replaced font-glyph dependency with stable component/CSS alignment.
- Back + eyebrow collision on Photo/Catalog/Favourites: moved to shared ContextLine.
- Unicode action glyphs in SearchComposer, master cards, LookCard, modal and FocusBlock: replaced with shared SVG Icon component to remove font/baseline variance.
- Master/Work back affordances now reuse ContextLine instead of page-local arrow text.
- Mobile Header previously hid the Masters destination at <=700px; override keeps all three primary destinations reachable.

### P2 — component consistency
- Added shared SaveButton instead of duplicate save markup in card/profile.
- Added explicit disabled styling for shared button/save/icon controls.
- Added dialog/nav/accessibility labels where the structure already supported them.
- Added long-content, focus, hover and mobile Storybook cases for reusable components.

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

## Responsive risks to verify visually on deployed Storybook

Check each applicable screen/component at 320, 375, 414, 768, 1280 and 1440 px:
- Header width with saved-count visible;
- hero/display-heading wraps;
- SearchComposer two-action stack;
- ContextLine with long eyebrow;
- FocusBlock long master metadata;
- MasterCard long name/place/proof;
- filter open/closed transition at <=900;
- Master hero collapse;
- Work detail image/sidebar collapse;
- Photo analyzed grid collapse;
- modal safe padding;
- fixed PrototypeNav overlap (QA-only).

## Severity convention

- P0: unusable/broken flow.
- P1: obvious visual or correctness defect that should be fixed before review.
- P2: polish, resilience, accessibility or missing-state gap.
- P3: subjective art-direction preference; do not auto-fix without design intent.
