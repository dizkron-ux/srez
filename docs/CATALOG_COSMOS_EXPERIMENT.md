# Catalog / Cosmos experiment

Status: experimental branch only. This is an intentional product-layout experiment and should not be merged into `main` until reviewed visually.

## Reference qualities carried over

From the supplied Cosmos screenshots:
- compact top chrome instead of a large catalog hero;
- navigation left, search centered, secondary action right;
- selected context represented as a tag inside the search field;
- search remains the dominant control;
- filter controls live above the results instead of in a permanent sidebar;
- filter contents stay hidden until a dropdown is opened;
- light borders, white surfaces, rounded capsules and restrained shadows.

## SREZ adaptation

The experiment deliberately keeps SREZ product semantics rather than copying Cosmos content:
- `СРЕЗ.` remains the brand;
- destinations remain `Стрижки`, `Мастера`, `Избранное`;
- when the current Home prototype has Mullet selected (`focus` state), `Mullet` appears inside Catalog search with the existing visual placeholder thumbnail;
- photo/reference search remains available as the right-side icon action;
- color selection from the Cosmos reference is intentionally omitted;
- taxonomy stays separated into hair type, length, style, proof and data.

## Component decomposition

- `CatalogHeader` — compact Catalog-only top chrome and navigation;
- `CatalogSearch` — integrated scope/look tag, text query and photo-reference action;
- `CatalogFilterBar` — horizontal dropdown filters with local prototype selections;
- `CatalogPage` — composition and results only.

## Prototype limitations

Search text and dropdown selections are interaction-complete at UI level but are not yet wired to ranking/filtering of the fixture master data. The branch is for validating information density, hierarchy, search composition and filter interaction before changing product logic.
