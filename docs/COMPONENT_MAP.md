# SREZ component map

Current product-system map for `concept/cosmos-catalog` after the component/Storybook cleanup.

The rendered product remains source of truth. Classification below describes code ownership and Storybook placement; it does not authorize product or visual changes.

## Foundations

| Unit | Code | Storybook |
|---|---|---|
| Design tokens | `src/styles/base.css` | `Foundations / Tokens` |
| Icons | `src/components/Icon/Icon.tsx` | `Foundations / Icons` |
| Media placeholder renderer | `src/components/Media/Media.tsx` | internal helper; exercised by cards/screens |

## Components

| Unit | Code | Main consumers | Storybook |
|---|---|---|---|
| Button | `src/components/Button/Button.tsx` | Home, Master, Work, Photo, CityModal, Favourites | `Components / Button` |
| Header | `src/components/Header/Header.tsx` | all active screens | `Components / Header` |
| SaveButton | `src/components/SaveButton/SaveButton.tsx` | MasterPage, MasterCard | `Components / Save button` |
| RegionSelector | `src/components/RegionSelector/RegionSelector.tsx` | Home | `Components / Region selector` |
| CityModal | `src/components/CityModal/CityModal.tsx` | Home | `Components / Modal` |
| LookCard | `src/components/LookCard/LookCard.tsx` | Home | `Components / Look card` |
| MasterCard | `src/components/MasterCard/MasterCard.tsx` | Catalog, Favourites | `Components / Master card` |
| WorkCard | `src/components/WorkCard/WorkCard.tsx` | Master | `Components / Work card` |
| Evidence | `src/components/Evidence/Evidence.tsx` | currently not mounted in active runtime screens | `Components / Evidence` |

## Product patterns

| Pattern | Code | Main consumers | Storybook |
|---|---|---|---|
| Catalog search | `src/components/CatalogSearch/CatalogSearch.tsx` | Header | `Patterns / Catalog search` |
| Catalog filters | `src/components/CatalogFilters/CatalogFilters.tsx` | Catalog | `Patterns / Catalog filters` |
| Look master selector | `src/components/LookMasterSelector/LookMasterSelector.tsx` | Look | `Patterns / Look master selector` |
| Catalog controls composition | CatalogSearch + CatalogFilters | Catalog | `Patterns / Catalog controls` |

## Screen-only composition

These are intentionally not extracted merely to make the component count larger.

| Unit | Owner |
|---|---|
| Home look-grid layout and show-more composition | `HomePage.tsx` |
| Look visual stage, back action, CTA and similar-looks section | `LookPage.tsx` |
| Catalog results composition | `CatalogPage.tsx` |
| Master identity/actions and works layout | `MasterPage.tsx` |
| Work source/master block and tag composition | `WorkPage.tsx` |
| Favourites empty state | `FavouritesPage.tsx` |
| Photo analysis result | `PhotoPage.tsx` (prototype-only scenario) |

## Screens

Storybook keeps one public page per screen and uses presets for meaningful states:

- `Screens / Home`
- `Screens / Haircut detail`
- `Screens / Catalog`
- `Screens / Master`
- `Screens / Work`
- `Screens / Photo` — prototype-only; not currently routed by `App.tsx`
- `Screens / Favourites`

## Retired implementations

The following older or orphaned implementations were removed during the cleanup because the current product no longer consumes them:

- `Filters`
- `SearchComposer`
- `FocusBlock`
- `CatalogFilterPill`
- `LookEntityCard`
- `ContextLine`
- `PrototypeNav`
- orphaned `look-entity-card.css`

## Rule for future local/Codex edits

Before creating a new visual block:

1. check this map for an existing component or pattern;
2. extend the existing public contract if the semantics match;
3. create a new component only when the block has an independently meaningful/reusable contract;
4. add or update its Storybook states in the same change;
5. keep page-specific composition in the page until reuse justifies extraction;
6. do not change product structure as a side effect of design-system cleanup.
