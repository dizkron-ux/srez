# SREZ component architecture audit

Audit target: `concept/cosmos-catalog` at commit `62477b46ad51efd8fd6ee4b1d2b5f4a882cac667`.

## Guardrail

The current rendered product is the source of truth for this cleanup pass. The audit does not authorize a visual redesign, IA change, block reorder, copy rewrite, or product-logic change. Refactoring must preserve the current approved UI unless an explicit product change is requested.

Use Structure Lock semantics during refactor:

- `PRESERVED` — structure and behaviour preserved;
- `VISUAL_ADAPTATION` — only implementation/visual-system ownership changes, meaning preserved;
- `STRUCTURAL_DRIFT` — accidental product change; reject;
- `INTENTIONAL_PRODUCT_CHANGE` — only with explicit approval.

## Current runtime screen map

| Screen | Runtime status | Main composition |
|---|---|---|
| Home | active | Header · RegionSelector · LookCard grid · Button · CityModal |
| Look | active | Header · visual stage · master selector/portfolio · CTA · similar looks |
| Catalog | active | Header/CatalogSearch · CatalogFilters · MasterCard grid |
| Master | active | Header · profile identity/actions · work grid |
| Work | active | Header · work visual · tags · master source block · CTA |
| Favourites | active | Header · MasterCard or empty state |
| Photo | Storybook-only / unreachable from current App | Header · upload actions · analysis/tags · CTA |

Important drift: `PhotoPage` and the `Photo` screen still exist, but `App.tsx` no longer routes to `Photo`. The legacy `SearchComposer` still links to `Photo`, while the live Header now uses `CatalogSearch` with inline photo search.

## Component map

### Keep as public reusable components

| Component | Current use | Storybook | Action |
|---|---|---|---|
| Button | Home, Master, Work, Photo, CityModal, legacy Focus/Search | yes | keep; replace remaining raw generic CTA buttons where semantics match |
| Header | every active screen | yes | keep |
| LookCard | Home | yes | keep |
| MasterCard | Catalog, Favourites | yes | keep |
| SaveButton | MasterPage and inside MasterCard | indirect only | promote to public Storybook component; it is independently reused |
| CityModal | Home | yes as Modal | keep |
| RegionSelector | Home | indirect only | keep as small public component or document under Home pattern; stable enough to retain |
| Icon | broad | Foundations/Icons | keep |

### Keep as product patterns

| Pattern | Current use | Storybook | Action |
|---|---|---|---|
| CatalogSearch | Header across active screens | inside Catalog controls only | give it an explicit pattern story/state matrix |
| CatalogFilters | Catalog | inside Catalog controls only | keep as pattern; document open/closed/selected/reset states |
| Look master selector + hover portfolio | LookPage inline JSX | no | extract to a named pattern only if extraction preserves current composition exactly |
| Master work grid/card | MasterPage; `WorkCard` is local | no | extract local `WorkCard` only if it remains a stable repeated unit |
| Work source/master block | WorkPage inline JSX | no | keep screen-local until reused; do not extract just for purity |
| Favourites empty state | FavouritesPage inline JSX | screen only | screen-local is acceptable |
| Photo analysis result | PhotoPage inline JSX | screen only | keep only if Photo remains an intentional scenario |

### Legacy / obsolete candidates

These should not be deleted blindly. First remove imports/references, run typecheck/build/visual regression, then delete if no runtime dependency remains.

| Component | Evidence | Recommended action |
|---|---|---|
| Filters | current Catalog uses `CatalogFilters`; `Filters` is only represented in old Components Storybook | retire old component/story after regression check |
| SearchComposer | current Header uses `CatalogSearch`; SearchComposer represents the old Home search and routes to Photo | retire or archive unless the old Photo entry point is intentionally restored |
| FocusBlock | Home no longer renders it; it survives as `Patterns/Featured match` | remove from public Storybook and code unless explicitly retained as a future concept |
| CatalogFilterPill | current `CatalogFilters` renders its own option buttons and does not use this component | remove if no other consumer appears |
| LookEntityCard | current WorkPage does not render it; its stylesheet remains globally imported | remove or restore intentionally; current state is orphaned |
| ContextLine | imported but unused in MasterPage, FavouritesPage and PhotoPage; current screens use their own back treatments | remove stale imports and delete component if no remaining consumer |
| Evidence | imported but unused in current MasterPage; still showcased in Storybook | decide explicitly whether evidence is still part of current Master UI; otherwise Storybook is documenting a component the product no longer renders |
| PrototypeNav | not part of current App/page composition | delete if it is no longer required for prototype QA |

## Concrete inconsistencies found

1. `FavouritesPage` renders a raw `cosmos-button cosmos-button--secondary cosmos-button--sm` instead of the shared `Button` component.
2. `MasterPage` imports `ContextLine` and `Evidence` but does not render either.
3. `FavouritesPage` imports `ContextLine` but does not render it.
4. `PhotoPage` imports `ContextLine` but does not render it.
5. `LookEntityCard` has a dedicated global stylesheet even though the current Work page no longer consumes the component.
6. `look-entity-card.css` contains two declarations for `.srez-work-related`; the second overrides the first border rule with `!important`.
7. `qa-fixes.css` still contains selectors for older structures such as `.srez-nav`, `.srez-catalog-head` and `.srez-master-hero__info`; these need usage verification before cleanup.
8. `PhotoPage` exists in Storybook and types, but is absent from the runtime `App` switch.
9. Current Storybook coverage documentation is stale: `Screens.stories.tsx` includes Haircut detail/Look, while `docs/STORYBOOK_COVERAGE.md` does not list Look in its public inventory or state matrix.
10. Storybook contains `Patterns/Catalog controls`, but `docs/STORYBOOK_COVERAGE.md` does not list that pattern.
11. The old coverage document intentionally treats `SaveButton` as an internal helper, but it is now independently reused by both `MasterPage` and `MasterCard`; it should be reconsidered as a public component.
12. `MIGRATION_BASELINE.md` describes the older FocusBlock/SearchComposer/Photo/PrototypeNav flow. It is historical migration documentation, not an accurate description of the current Cosmos experiment.

## Storybook target architecture

Keep the existing top-level information architecture:

```text
Foundations
  Tokens
  Icons

Components
  Button
  Header
  Save button
  Region selector
  City modal
  Look card
  Master card
  Evidence (only if still in current product scope)

Patterns
  Catalog search
  Catalog filters
  Look master selector (after safe extraction)
  Master works grid (only if promoted from screen-local)

Screens
  Home
  Haircut detail
  Catalog
  Master
  Work
  Favourites
  Photo (only if still intentionally supported)

Documentation
  Service specification
  Component architecture / coverage
```

Do not create Storybook pages for every internal helper. Storybook should document independently meaningful UI contracts; screen-local composition can stay covered by Screens and visual QA.

## CSS ownership target

Current styles are split partly by historical pass rather than component ownership. The cleanup should move gradually toward:

- global foundations/tokens/reset in `base.css`;
- true app-shell styles in `app-header.css` or a shell layer;
- component/pattern styles owned by their component/pattern;
- screen-only layout styles owned by the relevant screen;
- `qa-fixes.css` reduced over time by moving valid fixes to their real owner and deleting stale selectors.

Do not perform a mass CSS rewrite. Move rules only while touching the corresponding component and verify screenshots after each batch.

## Safe refactor sequence

### Phase 1 — no-visual cleanup

- remove unused imports;
- replace Favourites raw generic CTA with shared Button while preserving classes/appearance;
- verify whether `Photo`, `Evidence`, `FocusBlock`, `SearchComposer`, `Filters`, `CatalogFilterPill`, `LookEntityCard`, `ContextLine`, `PrototypeNav` are intentionally retained;
- delete only confirmed dead code and its dead CSS;
- update `STORYBOOK_COVERAGE.md` to the actual current product.

### Phase 2 — Storybook sync

- add public SaveButton story;
- give CatalogSearch and CatalogFilters explicit pattern coverage;
- align component descriptions/states with current product;
- remove legacy stories for components removed in Phase 1;
- keep one sidebar story per meaningful component/pattern with variants and states inside that story.

### Phase 3 — safe extraction

- extract Look master selector/portfolio from `LookPage` if it can be moved without structure change;
- extract Master work card/grid only if the unit has a clear reusable contract;
- keep Favourites empty state and Work source block screen-local until reuse justifies promotion.

### Phase 4 — CSS ownership cleanup

- remove orphaned `look-entity-card.css` if LookEntityCard is retired;
- move valid `qa-fixes.css` rules to their real owners;
- remove stale selectors after automated checks;
- avoid visual retuning during this pass.

## Acceptance criteria for the refactor

Every refactor batch must satisfy:

1. no intended visual change on Home, Look, Catalog, Master, Work and Favourites;
2. no IA/order/copy/navigation change unless separately approved;
3. `npm run typecheck` passes;
4. `npm run build-storybook` passes;
5. Storybook visual audit passes at configured breakpoints;
6. all public components/patterns in current product have an intentional Storybook home;
7. no Storybook entry documents a retired implementation;
8. no globally imported stylesheet exists solely for dead components;
9. current screen presets remain usable as regression fixtures.

## Recommended next implementation batch

Start with Phase 1 only. It has the best risk/reward ratio and creates a clean baseline before component extraction. The first implementation commit should be limited to dead imports, obvious dead legacy components/styles that can be proven unused, the Favourites Button normalization, and Storybook coverage documentation sync. No layout or visual tuning in that commit.
