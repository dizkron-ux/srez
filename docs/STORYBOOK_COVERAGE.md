# Storybook coverage

Storybook is curated as product documentation, not as a one-story-per-state test catalog.

Public navigation follows:

- Foundations
- Components
- Patterns
- Screens
- Documentation

Exhaustive breakpoint/state coverage remains in automated visual QA.

## Public Storybook inventory

| Section | Page | Coverage on the page | Known missing behaviour |
|---|---|---|---|
| Foundations | Tokens | color · typography · shape · spacing | — |
| Foundations | Icons | full icon gallery | — |
| Components | Button | variants · sizes · default/hover/focus/disabled | loading/success/error 🟡 |
| Components | Header | primary active destinations · saved count | real routing/search state is prototype-level 🟡 |
| Components | Save button | interactive · saved · disabled | saved state is still global prototype state 🟡 |
| Components | Region selector | default · long city | city persistence 🟡 |
| Components | Modal | city modal interactive state | focus trap/Escape/persist 🟡 |
| Components | Look card | multiple real look fixtures · interactive hover/focus | entity-specific open behaviour 🟡 |
| Components | Master card | default · saved · long-content stress | entity-specific saved state 🟡 |
| Components | Work card | representative image ratios | selected work entity id 🟡 |
| Components | Evidence | default · alternate · long-content stress | currently not mounted on active runtime screens 🟡 |
| Patterns | Catalog search | default · selected look · photo panel | real search/ranking/upload backend 🟡 |
| Patterns | Catalog filters | closed · open · current selected defaults | result filtering wiring 🟡 |
| Patterns | Look master selector | master list · active/hover portfolio | selected master entity routing 🟡 |
| Patterns | Catalog controls | integrated search + filter composition | real catalog data wiring 🟡 |
| Screens | Home | preset control | see state matrix below |
| Screens | Haircut detail | look preset control | selected-master/entity routing 🟡 |
| Screens | Catalog | preset control | see state matrix below |
| Screens | Master | preset control | see state matrix below |
| Screens | Work | default | route/entity selection 🟡 |
| Screens | Photo | prototype-only preset control | not reachable from current App; real upload/loading/error 🟡 |
| Screens | Favourites | preset control | persistence/multiple entities 🟡 |
| Documentation | Service specification | navigation · coverage · known gaps | — |

## Screen state matrix

Each screen has one visible sidebar page. Use `Controls → preset` to switch meaningful states.

| Screen | Presets |
|---|---|
| Home | default · focus · all-looks · city-modal |
| Haircut detail | mullet · wolf |
| Catalog | default · mullet · filters-open · saved |
| Master | default · saved |
| Work | default |
| Photo | default · analyzed · analyzed-no-tags |
| Favourites | default · saved |

`Photo` remains a prototype scenario in Storybook, but the current runtime `App` does not route to it. Keep that distinction explicit until the product decision is made.

## Implementation helpers

These remain production code but do not receive dedicated public Storybook pages by default:

- `Media` placeholder renderer;
- low-level `Icon` implementation (covered through Foundations/Icons);
- screen-local empty states, back buttons, tag rows and layout wrappers.

Promote a helper only when it becomes a stable independently meaningful UI contract. Current examples of promoted pieces are `SaveButton`, `WorkCard`, `CatalogSearch`, `CatalogFilters` and `LookMasterSelector`.

## Retired legacy implementations

The Cosmos/current-product pass retired these older implementations from public Storybook and runtime code:

- old sidebar `Filters`;
- old Home `SearchComposer`;
- old `FocusBlock` featured-match composition;
- unused `CatalogFilterPill`;
- orphaned `LookEntityCard`;
- unused `ContextLine`;
- old `PrototypeNav`.

## QA coverage

Automated Storybook QA renders:

- public components/patterns/foundations at 375 and 1280 px;
- every screen preset at 320 / 375 / 414 / 768 / 1280 / 1440 px;
- Storybook play-function states such as hover/focus where defined;
- overflow, offscreen/clipped UI, wrapped action controls, resource errors, and console errors;
- screenshots for every rendered check.

Navigation granularity is intentionally smaller than QA granularity.
