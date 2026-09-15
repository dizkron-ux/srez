# SREZ Design Contract

This file is the visual source of truth for SREZ.
It governs visual language and craft, not product structure.
If a task explicitly enables Structure Lock, structure is controlled by the Structure Lock skill and must not be changed unless the user explicitly asks for a structural/product change.

## 1. Product character

SREZ is a visual-first service for finding a hair master by desired result, hair characteristics, technique, or haircut intent.
The interface should feel closer to contemporary editorial / fashion / hair culture than to a generic marketplace, CRM, SaaS dashboard, or beauty booking template.

Core qualities:
- photography-first;
- calm and confident;
- editorial rather than decorative;
- expert-led rather than rating-led;
- clear evidence of competence;
- useful before beautiful;
- visually distinctive without becoming experimental at the expense of comprehension.

Avoid making SREZ feel like:
- a generic marketplace of interchangeable cards;
- a salon directory;
- a dashboard;
- a landing page disguised as a product;
- a Dribbble concept with weak product logic.

## 2. Content hierarchy

Prefer this visual priority:
1. Desired visual result / work example.
2. Master identity.
3. Proof of relevant expertise.
4. Where the master works / salon or barbershop context.
5. Decision-supporting metadata.
6. Secondary social proof.

Do not let ratings, badges, chips, or decorative metadata overpower the work itself.

## 3. Photography

Photography is primary product content, not decoration.

Rules:
- give work examples enough area to be judged;
- preserve useful crop and hair silhouette;
- avoid tiny thumbnails where technique cannot be inspected;
- prefer consistent aspect-ratio logic within the same component family;
- allow irregular editorial composition only when it improves browsing, not as decoration;
- do not cover important hair detail with gradients, badges, or buttons;
- never invent portfolio work or imply unverified evidence is verified.

## 4. Typography

Typography should feel contemporary, editorial, and precise.

Rules:
- strong hierarchy with few type sizes rather than many near-identical sizes;
- headlines may have personality; body UI should remain highly readable;
- use weight, size, spacing, and layout before adding extra colors or containers;
- avoid random serif insertion for “premium” effect;
- avoid excessive uppercase;
- avoid tiny low-contrast metadata;
- avoid generic AI copy patterns and over-explanation.

Russian-language typography must be treated as first-class. Check line breaks, long labels, declensions, and Cyrillic glyph quality.

## 5. Layout and spacing

Use whitespace as structure.

Rules:
- prefer a clear page rhythm over a stack of cards;
- avoid putting every semantic group inside its own rounded container;
- use grouping by proximity before adding borders/backgrounds;
- keep primary content aligned to a coherent grid;
- avoid decorative asymmetry that hurts scanability;
- responsive behavior must preserve hierarchy, not merely stack desktop blocks vertically.

## 6. Components

Components should support comparison and confidence.

Master cards should prioritize:
- image/work evidence;
- master name;
- barbershop/salon context where relevant;
- relevant specialization/evidence;
- only decision-useful secondary metadata.

Avoid:
- badge soup;
- chip clouds with unclear taxonomy;
- repeated labels that merely restate the section title;
- unnecessary shadows;
- glassmorphism;
- default bento grids without product reason;
- decorative icon tiles;
- excessive pills for ordinary text.

## 7. Taxonomy presentation

Do not visually collapse different dimensions into one undifferentiated tag system.

Treat these as potentially different axes unless the product model explicitly says otherwise:
- haircut / hairstyle;
- technique;
- hair type / texture;
- length;
- vibe / visual direction;
- service type.

The UI may simplify these dimensions for browsing, but the underlying distinction must remain understandable.

## 8. Proof of expertise

SREZ must help users answer: “Can this master actually produce the result I want?”

Visual design should make proof inspectable.
Possible evidence types include:
- portfolio examples;
- work tagged to a relevant result/technique;
- credible review excerpts tied to the relevant skill;
- explicit verified source or provenance.

Do not style weak or inferred evidence as strong verification.

## 9. Interaction

Interaction should feel direct and lightweight.

Prefer:
- immediate feedback;
- progressive disclosure;
- contextual controls;
- reversible actions;
- visible selected state;
- preserving browsing context.

Avoid:
- modal dialogs for trivial edits;
- unnecessary confirmation steps;
- hidden state changes;
- motion that delays comparison;
- hover-only critical information.

## 10. Motion

Motion is for orientation, hierarchy, and tactility.

Use:
- short appearance transitions;
- image transitions where they preserve context;
- subtle state changes;
- restrained page/section continuity.

Avoid:
- perpetual ambient animation;
- spring motion on every control;
- staggered card entrances for ordinary product screens;
- animation that competes with photography.

Respect reduced-motion preferences.

## 11. Anti-AI-slop rules

Do not default to:
- purple/blue mesh gradients;
- glowing borders;
- floating glass panels;
- three equal feature cards;
- generic “AI startup” typography;
- excessive centered layouts;
- random gradient text;
- decorative metric cards;
- overuse of pills;
- placeholder microcopy such as “Discover your perfect style” when a concrete product statement is possible;
- too many visual effects competing for attention.

Before adding a visual element, ask what product job it performs.

## 12. Responsive quality bar

At minimum check:
- small mobile;
- common mobile;
- tablet/narrow desktop;
- standard desktop;
- wide desktop.

Check especially:
- image crops;
- filter overflow;
- sticky controls;
- long Russian labels;
- multi-line master names / locations;
- cards with missing or weak evidence;
- empty and loading states.

## 13. Accessibility

Maintain:
- meaningful contrast;
- keyboard access;
- visible focus;
- touch target size;
- semantic controls;
- alt text strategy for meaningful work images;
- reduced-motion support.

Do not trade core usability for an editorial aesthetic.

## 14. Decision rule

When choosing between two visual solutions, prefer the one that makes it easier to:
1. understand what is being shown;
2. judge whether the master is relevant;
3. compare alternatives;
4. trust the evidence;
5. continue the search without losing context.

Visual novelty is secondary.
