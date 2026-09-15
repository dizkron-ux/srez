# Storybook coverage

Legend: ✅ covered now · 🟡 documented gap / needs product behaviour · QA-only = not production UI.

| Area | Default | Variants/data | Hover/focus | Mobile | Known missing behaviour |
|---|---:|---:|---:|---:|---|
| Header | ✅ | ✅ active/saved | interactive | ✅ | — |
| Button | ✅ | ✅ variants/sizes/disabled | ✅ | n/a | loading/success/error 🟡 |
| Icon | ✅ | ✅ gallery | n/a | n/a | — |
| SearchComposer | ✅ | ✅ typed | ✅ | ✅ | real search/autocomplete 🟡 |
| RegionSelector | ✅ | ✅ long city | ✅ | natural | multi-city persistence 🟡 |
| ContextLine | ✅ | ✅ back-only/long | keyboard | ✅ | — |
| LookCard | ✅ | ✅ alt | ✅ | screen-level | non-Mullet open behaviour 🟡 |
| FocusBlock | ✅ | fixed fixture | interactive | ✅ | zero/multi matches 🟡 |
| MasterCard | ✅ | ✅ saved/alt/long | ✅ | ✅ | entity-specific saved state 🟡 |
| SaveButton | ✅ | ✅ saved/disabled | ✅ | natural | persisted entity save 🟡 |
| Evidence | ✅ | ✅ alt/long | n/a | natural | zero/partial proof rules 🟡 |
| Filters | ✅ | static selections | checkbox native | ✅ | reset/filter wiring 🟡 |
| CityModal | ✅ | ✅ typed/focus | interactive | ✅ | focus trap/Escape/persist 🟡 |
| Media | ✅ | ✅ ratios | n/a | natural | loading/error/alt for real media 🟡 |
| PrototypeNav | ✅ | ✅ active | interactive | ✅ | QA-only |

## Screen coverage

| Screen | Stories now |
|---|---|
| Home | default; focus selected; all looks; city modal; mobile |
| Catalog | default; filters open; saved; mobile + filters |
| Master | default; saved; mobile |
| Work | default |
| Photo | before analysis; analyzed; analyzed/no tags; mobile |
| Favourites | empty; saved |

Responsive QA target set remains 320 / 375 / 414 / 768 / 1280 / 1440. Storybook mobile stories are representative; final visual regression should still inspect every target width on the deployed Storybook.
