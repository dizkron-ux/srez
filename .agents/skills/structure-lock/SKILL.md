---
name: srez-structure-lock
description: Preserve an approved SREZ concept or wireframe while adapting or polishing its visual implementation. Use only when the user explicitly asks to preserve structure, migrate a concept, restyle an existing screen, or invokes Structure Lock.
triggers:
  - "structure lock"
  - "preserve structure"
  - "preserve concept"
  - "keep the current structure"
  - "не меняй структуру"
  - "сохрани структуру"
---

# SREZ Structure Lock / Concept Fidelity Guard

## Purpose

Protect an already-approved product concept from accidental structural drift during redesign, migration, design-system adaptation, UI polish, refactoring, or agent-driven implementation.

This skill does NOT prevent visual improvement. It prevents unrequested product redesign.

## Source of truth

The current approved concept / wireframe / implemented screen is the source of truth for structure.

A design system, Storybook, visual reference, UI library, or craft skill may change presentation, but may not silently change product structure.

## Before editing: establish the baseline

Capture, mentally or explicitly, the current:
- screen list;
- section/block order;
- hierarchy;
- entities and data shown;
- primary and secondary CTAs;
- interactions;
- navigation relationships;
- visible states;
- conditional visibility;
- filters/sorts/search semantics;
- evidence/provenance treatment;
- key responsive behavior where it affects product meaning.

Do not start with visual changes until the baseline is understood.

## Allowed without explicit approval

You MAY change:
- typography;
- spacing;
- grid implementation;
- visual grouping;
- component styling;
- image treatment;
- iconography;
- borders/backgrounds/radii;
- animation and transition details;
- responsive composition that preserves meaning;
- micro-layout inside an existing block;
- visual prominence of existing elements.

## Not allowed without explicit product intent

You MUST NOT silently:
- add/remove product sections;
- reorder major blocks;
- merge distinct product entities;
- split one entity into new product concepts;
- add new filters or taxonomy dimensions;
- remove an existing filter or control;
- change CTA meaning;
- change navigation model;
- invent new states;
- alter the evidence model;
- turn optional information into required information;
- hide existing information merely to make the screen cleaner;
- change product logic because another design system handles it differently.

## Difference classification

After the edit, classify meaningful differences as:

### PRESERVED
Structure and product meaning are unchanged.

### VISUAL ADAPTATION
Only presentation changed; semantics, hierarchy, entities, actions, and flow remain intact.

### STRUCTURAL DRIFT
Product structure or logic changed without being requested.
This must be reverted or explicitly surfaced to the user before it is kept.

### INTENTIONAL PRODUCT CHANGE
A structural/product change explicitly requested by the user.
Keep it, but identify it separately from visual polish.

## Conflict rule

When this skill is active:
1. explicit user instructions win;
2. Structure Lock governs product structure;
3. project DESIGN.md governs visual language;
4. selected craft/UI skills may improve presentation only within those constraints;
5. generic/global skills must yield when they conflict with the above.

## Final check

Before finishing, verify:
- Did any section disappear?
- Did any major section move?
- Did any CTA change meaning?
- Did any entity or taxonomy axis get merged or renamed semantically?
- Did filters/search/sort behavior change?
- Did proof of expertise become stronger/weaker without data justification?
- Did responsive work alter the information hierarchy?

If yes, classify it. Revert STRUCTURAL DRIFT.

## Output discipline

For visual-polish tasks, do not spend the final response re-explaining the whole concept. Report only:
- what was visually improved;
- any intentional product changes;
- any unresolved structural risk.
