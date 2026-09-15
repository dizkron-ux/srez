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
| Components | Header | primary active destinations · saved count | — |
| Components | Filters | open/closed · current selections | reset/filter wiring 🟡 |
| Components | Modal | city modal interactive state | focus trap/Escape/persist 🟡 |
| Components | Look card | multiple real look fixtures · interactive hover/focus | entity-specific open behaviour 🟡 |
| Components | Master card | default · saved · long-content stress | entity-specific saved state 🟡 |
| Components | Evidence | default · alternate · long-content stress | zero/partial proof rules 🟡 |
| Patterns | Search composer | default · filled · focus | real search/autocomplete 🟡 |
| Patterns | Featured match | product composition | zero/multi-match behaviour 🟡 |
| Screens | Home | preset control | see state matrix below |
| Screens | Catalog | preset control | see state matrix below |
| Screens | Master | preset control | see state matrix below |
| Screens | Work | default | route/entity selection 🟡 |
| Screens | Photo | preset control | real upload/loading/error 🟡 |
| Screens | Favourites | preset control | persistence/multiple entities 🟡 |
| Documentation | Service specification | navigation · coverage · known gaps | — |

## Screen state matrix

Each screen has one visible sidebar page. Use `Controls → preset` to switch meaningful states.

| Screen | Presets |
|---|---|
| Home | default · focus · all-looks · city-modal |
| Catalog | default · filters-open · saved |
| Master | default · saved |
| Work | default |
| Photo | default · analyzed · analyzed-no-tags |
| Favourites | default · saved |

## Internal implementation helpers

These remain production code but do not receive dedicated public Storybook pages by default:

- ContextLine;
- RegionSelector;
- SaveButton;
- Media placeholder;
- PrototypeNav.

They are covered through their parent public components/screens and automated visual QA. Promote one only when it becomes a stable independently-consumed UI primitive.

## QA coverage

Automated Storybook QA renders:

- public components/patterns/foundations at 375 and 1280 px;
- every screen preset at 320 / 375 / 414 / 768 / 1280 / 1440 px;
- Storybook play-function states such as hover/focus where defined;
- overflow, offscreen/clipped UI, wrapped action controls, resource errors, and console errors;
- screenshots for every rendered check.

Navigation granularity is intentionally smaller than QA granularity.
