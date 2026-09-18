# Catalog / Cosmos experiment

Status: experimental branch only. This is an intentional product-layout experiment and should not be merged into `main` until reviewed visually.

## Reference qualities carried over

From the supplied Cosmos screenshots and current Cosmos search behaviour:
- compact top chrome instead of a large catalog hero;
- navigation left, search centered, secondary action right;
- selected context represented as a tag inside the search field;
- search remains the dominant control;
- focus is expressed through a stronger floating/elevated search surface rather than a separate search page;
- visual search starts from the image action inside the search bar and accepts upload / drag-and-drop inline;
- text and visual context can coexist in the same search;
- filter controls stay out of the permanent sidebar;
- selected filter options use a soft filled capsule while inactive options remain outlined;
- light borders, white surfaces, rounded capsules and restrained shadows.

## SREZ adaptation

The experiment deliberately keeps SREZ product semantics rather than copying Cosmos content:
- `СРЕЗ.` remains the brand;
- destinations remain `Стрижки`, `Мастера`, `Избранное`;
- when the current Home prototype has Mullet selected (`focus` state), `Mullet` appears inside Catalog search with the existing visual placeholder thumbnail;
- the text prompt inside search rotates through SREZ-specific example intents;
- photo/reference search opens as an attached upload panel instead of navigating to the separate Photo screen;
- after upload, the reference becomes a token inside the same search bar and can coexist with Mullet + text query;
- color selection from the Cosmos reference is intentionally omitted;
- Catalog heading is reduced to `Мастера` only;
- all taxonomy filters are collapsed behind one icon button aligned with `Мастера`;
- taxonomy stays separated into hair type, length, style, proof and data.

## Component decomposition

- `CatalogHeader` — compact Catalog-only top chrome and navigation;
- `CatalogSearch` — contextual look token, animated text prompt, focused state and inline visual-search upload;
- `CatalogFilters` — one icon trigger + grouped filter popover with Cosmos-like outlined/filled option states;
- `CatalogPage` — composition and results only.

## Prototype limitations

Search text, visual upload and filter selections are interaction-complete at UI level but are not yet wired to ranking/filtering of the fixture master data. Uploaded references are local browser object URLs only; nothing is sent or persisted. The branch is for validating information density, hierarchy, search composition and filter interaction before changing product logic.
