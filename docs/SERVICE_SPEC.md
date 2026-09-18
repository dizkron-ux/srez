# SREZ service specification

Status: living specification for Concept V3. This document describes what is present in the React implementation and Storybook, and explicitly separates implemented behaviour from prototype gaps.

## 1. Product purpose

SREZ helps a person find a hair specialist by the desired visual result and visible evidence of competence. The primary entity is the master; the salon/barbershop is contextual information. The interface must explain why a master matches instead of relying on a generic rating.

Core user intents represented in V3:
- browse known haircut/result names;
- search by a result/type-of-hair phrase;
- start from a photo reference;
- inspect why a master matches;
- inspect a work/evidence item;
- save a master;
- understand where the master works.

The current test taxonomy contains haircut/result, hair type, desired length, style, proof availability and price availability as separate filter groups. This document does not redefine the taxonomy.

## 2. Source of truth and change boundary

Product structure source of truth: `MIGRATION_BASELINE.md` + current React implementation. Visual contract: `DESIGN.md`. Storybook renders production components; it is not a separate product implementation.

Structure Lock rule: visual QA may change component craft, states, alignment, icons, responsive behaviour and accessibility semantics, but must not silently add/remove product flows, reorder major sections, change taxonomy or strengthen evidence claims.

## 3. Information architecture

### Screens

1. **Home** — region selector, hero/search, haircut/result discovery, optional FocusBlock for selected Mullet.
2. **Catalog** — query context, filters and a horizontal carousel of master collections grouped by haircut type.
3. **Master** — master hero, evidence, works, specializations, workplace context.
4. **Work** — one work/evidence detail and source/master context.
5. **Photo** — reference-photo entry, simulated analysis, removable inferred tags, continuation to catalog.
6. **Favourites** — empty or one saved master in the current prototype.

### Global navigation

Header sections:
- Стрижки → Home; Photo also belongs to this section.
- Мастера → Catalog; Master and Work belong to this section.
- Избранное → Favourites; a count appears when `saved=true`.

PrototypeNav is QA-only navigation and is not part of the intended product IA.

## 4. Global state model

Current `AppState`:
- `screen`: current screen.
- `focus`: whether the Home Mullet FocusBlock is open.
- `city`: city modal visibility.
- `showAll`: expands the Home haircut list.
- `filtersOpen`: mobile filters visibility.
- `photoAnalyzed`: whether simulated photo analysis is shown.
- `photoTags`: removable simulated analysis tags.
- `saved`: one prototype-level saved boolean.

Important limitation: `saved` is global, not entity-specific and not persisted. The Favourites copy currently says the state is stored in the browser, but the implementation only stores it in React memory for the current session. Treat this as a known product/copy mismatch.

## 5. Component specification

### Header
Purpose: persistent section navigation and brand return-home affordance.
States: Haircuts active; Masters active; Favourites active; saved count visible; narrow/mobile.
Responsive requirement: all three navigation destinations remain accessible at 320px; text must not wrap.
A11y: nav has label; current section uses `aria-current`; brand button has an accessible label.

### Button
Variants: primary, secondary, ghost. Sizes: sm, md, lg.
States represented in Storybook: default, hover, focus, disabled; active is available interactively through press.
Rules: label stays on one line; icon aligns to text through flex gap; disabled state cannot animate/scale.
Not currently specified: loading/success/error button semantics. Add only when a real flow needs them.

### Icon
Internal SVG icon set removes font-glyph baseline drift. Current names: search, image, arrow-right, arrow-left, arrow-up-right, heart, heart-filled, close, chevron-down.
Rules: decorative by default (`aria-hidden`); action accessible name belongs to the parent control.

### SearchComposer
Anatomy: search input + reference-photo action + search action.
States: default, input focus, typed query, photo-action hover, narrow/mobile.
Current behaviour: typing does not affect results; Найти always opens Catalog; Есть фото opens Photo.
Missing product states: suggestions/autocomplete, empty query policy, submitting/loading, no match, keyboard Enter behaviour.

### RegionSelector
Anatomy: label `Город` + city trigger + chevron.
States: default, hover/focus, long city name.
Current behaviour: opens CityModal; Moscow is the only supported product city.

### ContextLine
Reusable back navigation + optional eyebrow. Used to avoid local spacing/baseline drift.
States: default with eyebrow, back-only, long eyebrow, narrow/mobile.

### LookCard
Anatomy: visual preview, hover open affordance, haircut/result title.
States: default, hover, keyboard focus, alternate look.
Current behaviour: only Mullet toggles FocusBlock; other items show prototype feedback. This is a prototype limitation, not the intended final behaviour.

### FocusBlock
Purpose: explain the selected result and show directly relevant masters with evidence.
States: default and narrow/mobile.
Current data: hard-coded to first look and first master.
Missing states: zero matching masters, multiple matches, missing description/fit, long master list.

### MasterCard
Anatomy: collage, name/place, SaveButton and prototype disclaimer.
States: default, saved, alternate master, long content, media hover, save focus, narrow/mobile.
Rules: missing data must not be disguised; collage images are explicitly placeholders in V3.

### MasterCollectionCarousel
Purpose: browse groups of masters by haircut type without turning the Catalog into a generic directory grid.
Anatomy: horizontally scrollable track, three-image collection preview, collection title and master count, previous/next controls.
States: default, hover, keyboard focus, selected, dragged/scrolled, first/last edge and narrow/mobile.
Rules: no favourite action belongs to a collection card; selecting a collection updates the current haircut context; displayed counts must come from the current prototype fixture or future backend data.

### SaveButton
States: default, saved, hover, focus, disabled. Uses `aria-pressed`.
Current copy remains `Save/Saved` for fidelity to V3; copy localization is a separate content decision.
Current behaviour limitation: one global saved boolean affects all master cards.

### Filters
Groups currently rendered: haircut; hair type; desired length; style; proof; where/price.
States: desktop, mobile open, mobile closed.
Current behaviour: checkboxes use static default state; changing them does not change result data; reset button is not wired. These are explicit prototype gaps.

### CityModal
States: open, focused input, typed city, narrow/mobile.
A11y implemented: dialog semantics, title association, close accessible name.
Missing behaviour: Escape close, focus trap/return, backdrop close policy, entered-city persistence, validation/success state.

### Media
Current role: illustrative prototype placeholder generated from look colors. Ratios: default, square, portrait, landscape.
Not a real image component yet. Missing future states: loading, successful remote image, crop policy, broken image/fallback, alt text policy for actual works.

### PrototypeNav
QA-only route switcher used to inspect the six screens quickly. It must not become a production navigation dependency.

## 6. Screen state matrix

### Home
Implemented/Storybook: default; Mullet focus selected; all looks; city modal open; mobile.
Not implemented: search suggestions; haircut-detail state for non-Mullet items; loading of looks; empty catalogue; content errors.

### Catalog
Implemented/Storybook: default; selected haircut collection; filters open; horizontal drag/scroll; mobile touch carousel.
Not implemented: real backend filtering after collection selection; sort; no results; loading/skeleton; error; pagination/infinite loading; partial master data.

### Master
Implemented/Storybook: default; saved; mobile.
Not implemented: selected-master id; missing works; missing proof; missing shop; booking unavailable; loading/error.

### Work
Implemented/Storybook: default. Responsive is included in the global QA target set.
Not implemented: selected-work id; missing source; image loading/error; source verification level.

### Photo
Implemented/Storybook: before analysis; analyzed; analyzed with no remaining tags; mobile.
Not implemented: actual file upload; upload progress; invalid file; analysis loading; analysis error; uncertain/low-confidence tag treatment; retry.

### Favourites
Implemented/Storybook: empty; saved.
Not implemented: multiple saved entities; persistence; cross-session state; removing one of several masters; loading/error.

## 7. Responsive contract

Visual QA target widths: 320, 375, 414, 768, 1280, 1440 px.

Non-negotiables:
- no horizontal scrolling caused by product UI;
- clickable labels do not wrap in ways that break controls;
- display headings wrap without clipping;
- icon/text baselines stay aligned;
- Header keeps all destinations reachable;
- filters are collapsible on narrow widths;
- master/work grids collapse without clipped evidence;
- modal fits with safe page padding;
- PrototypeNav may scroll horizontally because it is QA-only.

## 8. Interaction and accessibility baseline

Required for reusable interactive components:
- visible `:focus-visible` state;
- keyboard reachable controls;
- semantic button/input/dialog/nav roles;
- disabled state visibly and functionally disabled;
- action icons do not carry the only accessible name;
- reduced-motion media query respected;
- long Russian labels and names tested.

Not yet complete: modal focus trap/return; real form submit semantics; screen-level announcements after navigation; automated contrast/a11y CI.

## 9. Data/evidence rules

The UI must distinguish illustrative prototype media from real master work. Evidence claims must come from `master.proof`; Storybook may use test fixtures but must label them as fixtures and must not imply external verification.

Known V3 fixture limitations:
- only three masters;
- Master and Work screens always use `MASTERS[0]`;
- master card navigation does not pass an entity id;
- media is synthetic placeholder art, not real work.

## 10. Missing state backlog

These states are now documented but intentionally not invented in product code without rules/data:
- generic loading/skeleton;
- network error and retry;
- catalog no-results;
- master with no evidence;
- master with partial evidence;
- no works / broken work image;
- booking unavailable;
- search autocomplete and query validation;
- upload invalid/loading/error;
- filter reset/data synchronization;
- entity-specific favourites + persistence;
- multiple-city support;
- selected master/work routing by id.

## 11. Storybook definition of done

For every reusable component:
1. default state;
2. every meaningful product variant;
3. hover and focus when interactive;
4. disabled if supported;
5. long-content stress case when text-bearing;
6. narrow/mobile case when layout changes;
7. production component only — no Storybook-only duplicate.

For every screen:
1. default state;
2. state-changing branches represented by `AppState`;
3. empty/saved/analyzed/open variants where implemented;
4. mobile representative story;
5. missing product states explicitly listed in this spec instead of silently fabricated.
