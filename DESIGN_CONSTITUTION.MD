# Portfolio Design Constitution

**Version:** 1.0  
**Purpose:** Canonical design-language source of truth for the portfolio  
**Primary reference:** Stripe  
**Secondary references:** Raycast, Notion  

---

## 0. Core Directive

> **Do not make the portfolio look more designed. Make it look more intentional.**

This document defines the visual and interaction language of the portfolio.

It is not a mandate to copy Stripe, Raycast, or Notion.

The objective is to preserve the portfolio's existing identity while improving its clarity, consistency, hierarchy, polish, and perceived product quality.

The final website should feel like a premium technology product built by a product leader — not like a template, résumé page, frontend showcase, or design experiment.

### Reference hierarchy

- **Stripe — 60%**: grid, layout, composition, spacing, cards, premium SaaS presentation, gradients, editorial hierarchy.
- **Raycast — 25%**: motion, interaction polish, glass, blur, layered surfaces, subtle delight.
- **Notion — 15%**: minimalism, typography, information hierarchy, reading flow, restraint.

### Governing principle

> **Borrow principles, never components.**

The website must not become a visual clone of any reference.

---

# 1. Product and Brand Intent

The site should communicate the following qualities before the visitor consciously evaluates individual components:

- Product leadership
- Technical fluency
- Systems thinking
- High standards
- Clarity
- Confidence
- Restraint
- Modernity
- Premium execution

The experience should feel:

- calm rather than loud;
- structured rather than decorated;
- precise rather than flashy;
- editorial rather than dashboard-like;
- premium rather than luxurious;
- technological without looking synthetic or "AI-generated".

### Avoid

- Generic developer-portfolio visual language
- Excessive neon
- Decorative gradients everywhere
- Skill-cloud aesthetics
- Dense badge walls
- Dashboard UI where editorial storytelling would work better
- Gratuitous glassmorphism
- Gratuitous animation

**Reference:** Stripe's marketing-site composition and premium SaaS positioning; Notion's restraint and content-first presentation.

---

# 2. Decision Priority

All design decisions must follow this order:

1. Content
2. Information hierarchy
3. Layout
4. Spacing
5. Typography
6. Styling
7. Motion

Never use styling to compensate for an earlier-layer problem.

Examples:

- If the message is unclear, do not add a gradient.
- If the hierarchy is weak, do not increase shadow.
- If the section is crowded, do not animate it.
- If information does not need a boundary, do not put it in a card.
- If a component does not add meaning, remove it before redesigning it.

**Reference:** Notion-inspired content-first restraint; Stripe-inspired hierarchy.

---

# 3. Invisible Design

The user should not primarily notice effects.

The user should experience:

- clarity;
- confidence;
- ease;
- structure;
- quality.

A successful visual treatment should often be felt before it is noticed.

If an effect attracts more attention than the content it supports, it is probably too strong.

**Reference:** Stripe and Notion.

---

# 4. Density Philosophy

Target:

> **Dense information, low visual noise.**

The site may contain substantial information, but it must not feel crowded.

For every section, ask:

> Is the visitor seeing more information than they need at this moment?

If yes, prefer:

1. remove;
2. group;
3. summarize;
4. defer;
5. progressively disclose.

Do not solve information density by shrinking typography or reducing spacing.

**Reference:** Stripe's ability to present complex product information with controlled visual hierarchy.

---

# 5. Grid System

The site must use a consistent global layout system.

## Desktop

Recommended baseline:

- viewport reference: 1440px+
- content max width: 1200–1280px
- outer page padding: 32–48px
- grid: 12 columns
- column gap: 24–32px

## Tablet

- page padding: 24–32px
- preserve alignment logic, not just scaled desktop dimensions

## Mobile

- page padding: 18–24px
- simplify composition where necessary
- do not mechanically stack every desktop element

## Global rule

Create and reuse a single canonical page container primitive.

Example conceptual primitive:

`PageContainer`

All standard sections should align to it.

### Full-bleed content

Full-bleed treatment is allowed for:

- ambient gradients;
- decorative backgrounds;
- large visual canvases;
- oversized screenshots;
- media.

Text and primary content should still align back to the canonical grid.

**Reference:** Stripe layout discipline.

---

# 6. Alignment Discipline

Premium design depends heavily on invisible alignment lines.

Titles, body copy, cards, screenshots, buttons, and metrics should intentionally share anchors.

Flag a section when:

- title and body copy start on unrelated horizontal positions;
- cards begin on a separate grid from the intro;
- CTA alignment appears arbitrary;
- media and copy do not share a compositional relationship.

Prefer a smaller number of strong alignment anchors.

**Reference:** Stripe.

---

# 7. Spacing Scale

Do not invent spacing per component.

Use a consistent scale such as:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64
- 80
- 96
- 120
- 160

Avoid arbitrary values such as:

- 37px
- 53px
- 71px

unless there is a concrete technical reason.

Spacing is part of the system, not local decoration.

**Reference:** Stripe and Notion.

---

# 8. Section Rhythm

Recommended desktop vertical spacing:

- compact section: 80–96px
- standard section: ~120px
- major narrative section: 144–160px

Recommended mobile spacing:

- 64–96px depending on content density

Do not compress section spacing merely to fit more content above the fold.

Whitespace is an active compositional tool.

**Reference:** Stripe marketing pages; Notion minimalism.

---

# 9. Internal Spacing

Recommended relationships:

- eyebrow → heading: 12–16px
- heading → description: 20–24px
- description → CTA: 24–32px
- section introduction → main content: 48–72px
- card title → supporting text: 12–16px
- grouped controls: 8–12px
- unrelated groups: 24–32px+

Relative consistency matters more than any exact number.

**Reference:** Stripe.

---

# 10. Typography System

Use a limited, explicit hierarchy.

Recommended levels:

- Display
- H1
- H2
- H3
- Body Large
- Body
- Small
- Caption

Do not create many near-identical type sizes.

Typography should create hierarchy primarily through:

1. size;
2. weight;
3. spacing;
4. position;
5. contrast;

and only then through color or effects.

**Reference:** Notion.

---

# 11. Display / H1

The H1 must communicate positioning, not simply be visually large.

Recommended desktop range:

- 56–72px
- line-height: 0.95–1.08
- weight: approximately 600–700
- slightly negative letter spacing where appropriate

Recommended mobile range:

- 40–48px

Prefer 2–3 lines maximum.

Do not turn the H1 into a paragraph.

**Reference:** Stripe hero typography and Notion hierarchy.

---

# 12. H2

Recommended desktop:

- 40–52px

Recommended mobile:

- 32–38px

An H2 should have presence but remain clearly subordinate to the hero.

Do not use headline scale inconsistently between adjacent sections.

**Reference:** Stripe.

---

# 13. Body Typography

Recommended default:

- 16–18px
- line-height: 1.5–1.7

Important supporting copy:

- 18–20px where appropriate

Recommended readable line length:

- roughly 55–70 characters

Avoid long full-width paragraphs.

Use width constraints to improve reading rhythm.

**Reference:** Notion.

---

# 14. Typography Restraint

Avoid:

- bold text everywhere;
- gradient text across many headings;
- long all-caps labels;
- unnecessary font combinations;
- a unique color for every heading;
- excessive text effects.

A page with good typography should remain strong even if all decorative effects are temporarily disabled.

**Reference:** Notion.

---

# 15. Section Message Rule

Every section must have one primary message.

Ask:

> What is the one thing the visitor should understand from this section?

If there is no clear answer, the section needs structural work before visual polish.

Supporting content may enrich the message but must not compete with it.

**Reference:** Stripe.

---

# 16. Color Architecture

Use semantic design tokens.

Recommended categories:

- `--background`
- `--surface`
- `--surface-elevated`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border-subtle`
- `--border-default`
- `--border-strong`
- `--accent`
- `--accent-soft`

Do not scatter hard-coded color values across components.

Dark mode should use layered dark surfaces rather than relying on pure black everywhere.

**Reference:** Stripe and Raycast.

---

# 17. Accent Discipline

Accent color is a scarce resource.

Use it for:

- primary CTA;
- selected states;
- strategic highlights;
- important metrics;
- key product moments.

Do not use accent color for every icon, label, divider, and heading.

If everything is accented, nothing is accented.

**Reference:** Stripe.

---

# 18. Gradient Philosophy

> **Gradient is lighting, not decoration.**

Gradients should create:

- depth;
- focus;
- direction;
- atmosphere;
- hierarchy.

They should not exist simply to make a section appear more colorful.

Recommended default:

- one dominant ambient gradient per major visual zone;
- occasionally a second supporting gradient;
- low opacity;
- broad transition;
- substantial blur where appropriate.

**Reference:** Stripe.

---

# 19. Gradient Restrictions

Avoid:

- rainbow gradients;
- gradient borders on every card;
- gradient fills on all cards;
- gradient text on every heading;
- multiple unrelated gradients in one viewport.

Gradient text may be used only for rare strategic emphasis.

**Reference:** Stripe-inspired restraint.

---

# 20. Surface System

Use a small number of elevation levels.

Recommended model:

### Level 0
Base page background

### Level 1
Standard card / section surface

### Level 2
Elevated or interactive surface

Do not create a unique surface treatment for every section.

**Reference:** Raycast and Stripe.

---

# 21. Card Necessity Rule

A card is not the default container.

Before using a card, ask:

> Does a visible boundary help the user understand this information as an independent unit?

If not, use layout and spacing instead.

Do not wrap every piece of content in rectangles.

**Reference:** Stripe and Notion.

---

# 22. Card Geometry

Use consistent geometry.

Recommended baseline:

- radius: 16–24px
- padding: 24–32px
- border: subtle 1px
- shadow: very soft
- hover elevation: minimal

Avoid unrelated radius and padding systems across different sections.

**Reference:** Stripe.

---

# 23. Card Information Hierarchy

Preferred card sequence:

1. optional icon / marker
2. title
3. concise supporting text
4. optional metric, visual, or CTA

Avoid overloading one card with:

- icon
- title
- several badges
- long paragraph
- metric
- timeline
- two buttons
- extra metadata

Split or simplify when necessary.

**Reference:** Stripe.

---

# 24. Glass Philosophy

Use glass as an interaction or layering tool, not a global visual theme.

Appropriate contexts:

- navbar;
- floating UI;
- overlay;
- utility panel;
- compact interactive surface.

Avoid making every section translucent.

**Reference:** Raycast — especially its recent Liquid Glass direction.

---

# 25. Glass Construction

A successful glass surface usually combines:

- semi-transparent surface;
- restrained backdrop blur;
- subtle border;
- optional soft inner highlight;
- adequate foreground contrast.

Avoid:

- extreme transparency;
- excessive blur;
- bright glowing borders;
- multiple nested glass surfaces.

**Reference:** Raycast.

---

# 26. Blur

Blur should feel ambient.

The user should perceive depth rather than perceive "a blur effect".

Use blur to support:

- atmospheric gradients;
- layered floating surfaces;
- subtle separation.

Do not use blur to hide weak composition.

**Reference:** Raycast.

---

# 27. Icon System

Use one primary icon family.

Preferred examples:

- Lucide
- Phosphor

Avoid mixing unrelated icon families without a strong reason.

Avoid combining:

- icon library A;
- icon library B;
- random custom SVGs;
- emoji;

inside the same visual system.

**Reference:** Raycast-style consistency.

---

# 28. Icon Scale

Define icon sizes by context.

Example scale:

- inline: 16px
- controls: 18–20px
- cards: 20–24px
- feature visual: 28–32px

Do not size every icon independently.

**Reference:** Raycast.

---

# 29. Icon Containers

Do not automatically place every icon inside a circle or rounded square.

Use an icon container only when it improves:

- hierarchy;
- grouping;
- affordance;
- visual balance.

Decorative containers should be removed when they add noise.

**Reference:** Notion restraint + Raycast UI polish.

---

# 30. Motion Philosophy

Motion must serve one of four purposes:

- explain;
- confirm;
- connect;
- reward.

Motion should not exist merely to entertain.

The experience should feel responsive and polished, not animated.

**Reference:** Raycast.

---

# 31. Motion Timing

Recommended ranges:

### Micro-interactions
120–180ms

### Hover transitions
150–220ms

### Element reveal
250–450ms

### Large transition
400–600ms

Avoid long decorative animations.

**Reference:** Raycast-style interaction pacing.

---

# 32. Motion Distance

Use small distances.

Recommended reveal translation:

- 8–20px

Recommended subtle scale:

- reveal: 0.98 → 1
- hover: 1 → 1.01 / 1.015

Avoid:

- 80px+ entrance movement;
- large zoom effects;
- obvious bouncing.

**Reference:** Raycast.

---

# 33. Motion Easing

Default behavior should feel smooth and predictable.

Prefer:

- ease-out;
- restrained cubic-bezier curves;
- restrained springs when appropriate.

Avoid bouncy spring behavior unless there is a very clear interaction rationale.

**Reference:** Raycast motion language.

---

# 34. Forbidden Decorative Motion

Avoid by default:

- bounce;
- spin;
- continuous floating objects;
- infinite glow pulses;
- excessive parallax;
- cursor gimmicks;
- auto-rotating decorative elements.

Exceptions require clear narrative or interaction value.

**Reference:** Raycast-inspired restraint.

---

# 35. Hover States

Hover should usually be subtle.

Useful changes include:

- slightly brighter border;
- slightly lighter surface;
- `translateY(-1px)`;
- mildly stronger shadow;
- small icon motion;
- subtle color transition.

Avoid making every card visibly jump.

**Reference:** Raycast.

---

# 36. Product Visuals

Prefer strong visual evidence over decorative UI.

For an important project, consider:

- one hero visual;
- one product screenshot;
- one architecture / workflow visual;
- one outcome / metric treatment.

A strong product visual can replace multiple explanatory cards.

**Reference:** Stripe product storytelling.

---

# 37. Storytelling Architecture

The portfolio should read as a narrative rather than a list of résumé categories.

Preferred conceptual progression:

1. Who I am
2. What I build
3. Evidence
4. How I think
5. Scale / outcomes
6. Selected work
7. Experience
8. Contact

This does not require those exact section names.

The principle is progression.

**Reference:** Stripe's narrative marketing structure.

---

# 38. Metrics

Important metrics should be treated as visual content.

Do not bury strong evidence inside paragraphs.

Prefer:

**7**  
Products managed

over:

"I have managed seven products..."

when the number is relevant and defensible.

**Reference:** Stripe's frequent use of large metrics and proof points.

---

# 39. Metric Quality

A metric should be:

- specific;
- meaningful;
- contextual;
- credible.

Avoid vanity metrics.

If context is necessary to understand the number, provide it.

**Reference:** Stripe.

---

# 40. Visual Hierarchy Standard

A strong section should make the primary object obvious within roughly three seconds.

Hierarchy should clearly define:

1. primary attention;
2. secondary explanation;
3. supporting detail;
4. action.

If several objects have equal visual weight, hierarchy is weak.

**Reference:** Stripe and Notion.

---

# 41. Spacing Quality Standard

High-quality spacing should feel:

- intentional;
- consistent;
- generous where needed;
- compact where related;
- clearly grouped.

Spacing should communicate semantic relationships.

Closer = more related.

Farther = less related.

**Reference:** Notion and Stripe.

---

# 42. Grid Quality Standard

Check:

- container consistency;
- horizontal anchors;
- column proportions;
- card widths;
- section intro alignment;
- media alignment;
- breakpoint behavior;
- full-bleed logic.

A section can look attractive and still fail the grid standard.

**Reference:** Stripe.

---

# 43. Typography Quality Standard

Check:

- hierarchy;
- line length;
- line height;
- weight;
- contrast;
- responsive scaling;
- Hebrew RTL behavior;
- English/Hebrew mixed text;
- numeric treatment.

**Reference:** Notion.

---

# 44. Card Quality Standard

Before styling a card, evaluate whether the card should exist.

If it should, check:

- purpose;
- padding;
- border;
- radius;
- surface;
- hierarchy;
- density;
- interaction state;
- relationship to adjacent cards.

**Reference:** Stripe.

---

# 45. Color Quality Standard

Check:

- accent discipline;
- text contrast;
- background layering;
- surface distinction;
- gradient restraint;
- semantic consistency.

Color should reinforce hierarchy rather than create hierarchy by itself.

**Reference:** Stripe and Raycast.

---

# 46. Motion Quality Standard

Check:

- purpose;
- duration;
- distance;
- easing;
- consistency;
- reduced-motion behavior;
- performance.

If removing an animation does not reduce clarity, feedback, continuity, or delight, reconsider whether it is necessary.

**Reference:** Raycast.

---

# 47. Premium Feel

Premium quality comes from:

- consistency;
- precision;
- whitespace;
- typography;
- restraint;
- alignment;
- high-quality visuals;
- polished interaction;
- deliberate composition.

It does **not** come from the quantity of effects.

Ask:

> Does this section feel intentionally composed, or merely assembled?

**Reference:** Stripe.

---

# 48. Visual Noise

Noise is created by excessive:

- borders;
- cards;
- badges;
- colors;
- shadows;
- gradients;
- icons;
- labels;
- decorative UI;
- competing type styles.

Reduce the number of simultaneous visual signals.

**Reference:** Notion.

---

# 49. Information Density

Do not confuse information density with visual noise.

The target is:

> **High information value per section with low visual noise.**

Use hierarchy, grouping, whitespace, and progressive disclosure instead of shrinking elements.

**Reference:** Stripe + Notion.

---

# 50. CTA Hierarchy

Each context should normally have one primary action.

A secondary action may exist.

Avoid clusters of equally prominent actions.

Primary CTA should be visually obvious without becoming visually aggressive.

**Reference:** Stripe.

---

# 51. Navbar

The navbar should be one of the quietest persistent elements on the site.

It must not compete with the hero.

Appropriate treatments:

- transparent or near-transparent initial state;
- subtle glass;
- restrained blur;
- very subtle border;
- compact interactions.

**Reference:** Raycast and Stripe.

---

# 52. Navbar Scroll State

Recommended behavior:

### Before scroll
- mostly transparent;
- visually lightweight.

### After scroll
- slightly stronger surface;
- subtle blur;
- subtle border;
- enough separation from page content.

The transition should be smooth and minimally noticeable.

**Reference:** Raycast.

---

# 53. Hero

The hero should communicate:

1. who this person is;
2. what they do;
3. why it matters.

It does not need to tell the full career story.

**Reference:** Stripe.

---

# 54. Hero Content Budget

Recommended maximum structure:

- eyebrow / short context;
- H1;
- one supporting paragraph;
- one primary CTA;
- optional secondary CTA;
- one major visual anchor.

Avoid turning the hero into a dashboard.

**Reference:** Stripe and Notion.

---

# 55. Hero Restraint

Avoid:

- many badges;
- skill clouds;
- multiple competing buttons;
- several cards;
- long biography;
- multiple animated decorations;
- too many metrics.

A strong hero establishes positioning first.

**Reference:** Stripe.

---

# 56. Project Presentation

Important projects should read like compact case studies.

Recommended content model:

1. Problem
2. Role
3. Product / solution
4. Key decision
5. Impact

Technology can support the story but should not replace it.

**Reference:** Product-storytelling interpretation of Stripe's solution framing.

---

# 57. Product Leadership Bias

When there is a choice between showing:

- another technical implementation detail;

or

- a strong product decision, trade-off, outcome, or ownership signal;

prefer the product-leadership signal.

The portfolio should demonstrate:

- judgment;
- ownership;
- prioritization;
- systems thinking;
- execution;
- impact.

Technical credibility remains important but is not the sole narrative.

---

# 58. Skills Presentation

Avoid a wall of badges.

Prefer capability groupings such as:

- Product
- Engineering
- AI
- Data
- Design

Show only information that materially supports positioning.

**Reference:** Notion restraint.

---

# 59. Footer

The footer should function as the conclusion of the narrative.

Prefer:

- strong closing statement;
- short invitation;
- primary contact action;
- secondary profile links;
- compact legal / copyright line.

Do not treat it as a storage area for miscellaneous links.

**Reference:** Stripe-style closing CTA sections.

---

# 60. Responsive Design

Mobile is not desktop scaled down.

Reconsider:

- element order;
- information grouping;
- card stacking;
- typography;
- spacing;
- CTA hierarchy;
- image crops;
- motion;
- navigation.

A composition may require a different structure on mobile.

**Reference:** General responsive interpretation of Stripe/Raycast/Notion principles.

---

# 61. RTL

Hebrew must be treated as a first-class layout mode.

Review:

- text direction;
- alignment;
- icon placement;
- arrow direction;
- mixed Hebrew / English strings;
- email addresses;
- URLs;
- code;
- numbers;
- punctuation;
- timeline direction;
- navigation order.

A component is not complete until its RTL behavior is intentional.

---

# 62. Accessibility

Minimum requirements:

- semantic HTML;
- keyboard navigation;
- visible focus states;
- sufficient contrast;
- alt text where needed;
- accessible interactive controls;
- meaningful labels;
- reduced-motion support.

Accessibility is part of product quality, not a separate cleanup phase.

---

# 63. Reduced Motion

Respect:

`prefers-reduced-motion`

When enabled:

- minimize transforms;
- remove decorative motion;
- keep required feedback;
- use simple fades only where useful;
- avoid large movement.

**Reference:** Raycast-inspired motion restraint + accessibility best practice.

---

# 64. Consistency Over Novelty

When choosing between:

A. a new clever visual pattern;

and

B. an existing pattern already used successfully on the site;

prefer B unless the new pattern solves a real problem.

Repetition creates product confidence.

**Reference:** Stripe and Notion.

---

# 65. Component Reuse

Before creating a new component, check whether the need can be solved with an existing primitive.

Likely reusable primitives include:

- Button
- Link
- PageContainer
- Section
- SectionHeader
- Card
- Metric
- Tag
- ProjectVisual
- CTAGroup
- IconButton

Avoid near-duplicate components.

---

# 66. Token Discipline

Prefer semantic tokens over arbitrary CSS.

Bad:

`color: #aaa7b3`

Better:

`color: var(--text-secondary)`

Apply the same principle to:

- color;
- spacing;
- radius;
- shadow;
- border;
- typography;
- motion.

---

# 67. Shadow System

Use a very small number of shadow levels.

Example:

- `shadow-xs`
- `shadow-sm`
- `shadow-md`

Shadows should create subtle depth, not dramatic elevation.

**Reference:** Stripe and Raycast.

---

# 68. Border System

Use semantic border levels.

Example:

- `border-subtle`
- `border-default`
- `border-emphasis`

Avoid individually tuning every border color and opacity.

**Reference:** Stripe.

---

# 69. Radius System

Use a constrained radius scale.

Example:

- 8px
- 12px
- 16px
- 24px
- 999px for pills only

Do not use arbitrary radii across components.

**Reference:** Stripe and Raycast.

---

# 70. Section Backgrounds

Do not alternate backgrounds mechanically.

A background change should communicate:

- narrative separation;
- a new content mode;
- emphasis;
- a meaningful surface shift.

Avoid the repetitive pattern:

dark → lighter → dark → lighter

without semantic purpose.

**Reference:** Stripe.

---

# 71. Decoration Budget

Every viewport has a limited decoration budget.

A good default:

- one dominant visual;
- one ambient gradient;
- a small number of supporting details.

If there is already a strong product screenshot, do not automatically add:

- particles;
- glowing grids;
- animated blobs;
- glass cards;
- extra gradients.

Restraint increases perceived quality.

**Reference:** Stripe + Notion.

---

# 72. Remove Before Adding

When a section feels weak, use this improvement order:

1. remove unnecessary elements;
2. clarify message;
3. improve hierarchy;
4. fix grid;
5. fix spacing;
6. fix typography;
7. normalize surfaces;
8. improve imagery;
9. add restrained visual polish;
10. add motion last.

This rule is mandatory.

**Reference:** Notion-inspired minimalism and Stripe-inspired structure.

---

# 73. Section Differentiation

Sections should not all use the same template.

Consistency does not mean repetition.

Use variation through:

- composition;
- scale;
- media placement;
- narrative structure;
- whitespace.

Keep tokens and component language consistent while allowing each major section to have an appropriate composition.

**Reference:** Stripe's varied section compositions.

---

# 74. Editorial Composition

Prefer editorial layouts over dashboard layouts when presenting narrative content.

Useful approaches:

- asymmetric two-column composition;
- large metric paired with concise context;
- oversized visual with small supporting copy;
- alternating text / visual anchors;
- one dominant object per section.

Avoid defaulting to three equal cards for every topic.

**Reference:** Stripe.

---

# 75. One Dominant Idea Per Viewport

At any major scroll position, there should normally be one dominant visual or message.

Supporting elements may exist, but they should clearly support the dominant idea.

If the eye does not know where to land, simplify.

**Reference:** Stripe and Notion.

---

# 76. Visual Confidence

Do not over-explain through design.

Premium interfaces often use:

- fewer labels;
- fewer borders;
- fewer decorations;
- larger whitespace;
- stronger typography;
- clearer grouping.

Confidence is expressed through reduction.

**Reference:** Stripe + Notion.

---

# 77. Copy and Layout Relationship

Do not finalize layout independently from copy.

Headline length, paragraph width, card text, metric length, and CTA labels affect composition.

If copy changes substantially, reassess layout rather than forcing it into the previous geometry.

**Reference:** Notion and Stripe.

---

# 78. Content Hierarchy in Cards

Card metadata must never visually outrank the card's actual idea.

Recommended order of visual weight:

1. main title / metric;
2. key visual;
3. supporting copy;
4. metadata;
5. tags.

Badges and labels should remain secondary.

**Reference:** Stripe.

---

# 79. Badge Discipline

Badges are for:

- status;
- category;
- concise metadata;
- rare emphasis.

Do not use badges as decorative filler.

Avoid large clusters of badges.

**Reference:** Notion restraint.

---

# 80. Separators

Prefer whitespace before adding separators.

Use lines only when they help explain grouping or structure.

Do not place dividers between every piece of content.

**Reference:** Notion.

---

# 81. Background Grids and Patterns

Subtle grid patterns may be used sparingly if they reinforce the technical/product identity.

Requirements:

- very low contrast;
- not behind dense body text;
- not repeated on every section;
- must not create moiré or visual noise.

**Reference:** Stripe-inspired technical visual language.

---

# 82. Ambient Lighting

Ambient light may support important visual areas.

Recommended behavior:

- large radius;
- soft edge;
- low saturation;
- low-to-medium opacity;
- positioned to support focal points.

Avoid visible "glowing blobs".

**Reference:** Stripe and Raycast.

---

# 83. Micro-Interaction Consistency

Buttons, links, cards, nav items, and icon controls must share a coherent interaction language.

Define reusable behavior for:

- hover;
- focus;
- active;
- pressed;
- disabled.

Do not invent interaction behavior component by component.

**Reference:** Raycast.

---

# 84. Button Hierarchy

Use a limited button system.

Recommended:

- Primary
- Secondary
- Ghost / Text
- Icon-only when appropriate

Primary buttons must be scarce.

Avoid having several buttons with equal visual prominence in one section.

**Reference:** Stripe.

---

# 85. Button Motion

Button motion should feel tactile but restrained.

Appropriate:

- subtle background transition;
- subtle border transition;
- 1px movement;
- small icon translation.

Avoid:

- large scaling;
- bounce;
- glow bursts;
- dramatic shadows.

**Reference:** Raycast.

---

# 86. Link Treatment

Inline links should remain readable as links without introducing excessive visual noise.

Use consistent:

- color;
- underline behavior;
- hover transition;
- focus state.

Do not invent a new link treatment in every section.

**Reference:** Notion.

---

# 87. Media Frames

Screenshots and product visuals should use a consistent framing language.

Define:

- radius;
- border;
- shadow;
- background;
- caption behavior.

Avoid a different screenshot frame for each project unless conceptually necessary.

**Reference:** Stripe.

---

# 88. Media Priority

If a real product visual exists, prefer it over abstract decoration.

Use abstract visuals only when they clarify:

- architecture;
- flow;
- system relationships;
- invisible infrastructure.

**Reference:** Stripe product storytelling.

---

# 89. Navigation Hierarchy

Navigation should support orientation, not become a secondary hero.

Limit visible top-level navigation.

Use concise labels.

Keep language switching, theme controls, and utility actions visually subordinate to primary navigation.

**Reference:** Stripe and Raycast.

---

# 90. Long-Page Rhythm

For a long portfolio page, alternate intensity.

A useful pattern:

- strong narrative section;
- quieter evidence section;
- visual section;
- compact proof section;
- strong case-study section;
- breathing space.

Do not maintain the same visual intensity from top to bottom.

**Reference:** Stripe.

---

# 91. Repetition Audit

Repeated design patterns should be intentional.

Good repetition:

- same card language;
- same CTA hierarchy;
- same section intro treatment;
- same metric treatment.

Bad repetition:

- every section is three cards;
- every title has gradient text;
- every image has glow;
- every card animates identically regardless of purpose.

**Reference:** Stripe + Notion.

---

# 92. Contrast Strategy

Use contrast deliberately.

Contrast may come from:

- size;
- weight;
- whitespace;
- surface;
- position;
- brightness.

Do not rely only on color.

**Reference:** Notion and Stripe.

---

# 93. Text Contrast

Primary text must remain clearly readable.

Secondary and muted text may use reduced contrast, but never so much that readability suffers.

Do not create hierarchy by making supporting copy too faint.

**Reference:** Notion.

---

# 94. Empty Space

Do not fill empty space merely because it exists.

Empty space may:

- create premium rhythm;
- focus attention;
- separate ideas;
- provide visual rest.

Treat whitespace as a designed element.

**Reference:** Stripe + Notion.

---

# 95. Visual Asymmetry

Controlled asymmetry is encouraged when it improves composition.

Examples:

- 5/7 column split;
- oversized visual opposite compact copy;
- off-center ambient gradient;
- asymmetric metric placement.

Asymmetry must still obey the shared grid.

**Reference:** Stripe.

---

# 96. Large Visual Moments

Reserve oversized visual moments for the strongest content.

Examples:

- hero;
- flagship project;
- system architecture;
- major product screenshot;
- closing CTA.

Not every section deserves a dramatic treatment.

**Reference:** Stripe.

---

# 97. Trust and Credibility

Visual design must not overstate credibility.

Avoid visual tricks that imply scale or prestige not supported by content.

Proof should come from:

- real metrics;
- real products;
- actual responsibilities;
- authentic artifacts;
- clear outcomes.

Design should amplify evidence, not manufacture it.

---

# 98. Portfolio Identity Preservation

When improving the site:

- preserve recognizable personal identity;
- preserve strong existing sections unless there is a clear issue;
- preserve successful content structure;
- preserve intentional brand choices;
- evolve rather than replace.

The goal is refinement, not aesthetic reset.

---

# 99. Design Review Question

For any proposed design change, ask:

> What specific problem does this solve?

Valid answers include:

- improves hierarchy;
- improves readability;
- aligns with grid;
- reduces visual noise;
- increases consistency;
- improves accessibility;
- strengthens product storytelling;
- improves interaction clarity.

"Looks cooler" is not sufficient.

---

# 100. Final Quality Bar

A successful final result should feel:

- unmistakably intentional;
- visually calm;
- highly structured;
- modern;
- premium;
- technically polished;
- product-led;
- consistent across Hebrew and English;
- responsive;
- accessible;
- restrained.

The visitor should not leave thinking:

> "This portfolio has lots of effects."

The visitor should leave thinking:

> "This person has product judgment."

---

# Canonical References

These references define inspiration, not templates to copy.

## Stripe

Primary reference for:

- grid;
- spacing;
- composition;
- editorial product storytelling;
- cards;
- metrics;
- gradients;
- premium SaaS presentation.

Official site:  
https://stripe.com/

## Raycast

Primary reference for:

- motion;
- micro-interactions;
- glass;
- blur;
- layered surfaces;
- subtle delight;
- interaction polish.

Official site:  
https://www.raycast.com/

Design / product updates:  
https://www.raycast.com/blog/

## Notion

Primary reference for:

- typography;
- minimalism;
- information hierarchy;
- reading flow;
- visual restraint.

Official site:  
https://www.notion.com/

---

# Non-Negotiable Summary

1. Content before effects.
2. Hierarchy before styling.
3. Grid before decoration.
4. Spacing is part of the design system.
5. Typography must carry most of the hierarchy.
6. Accent color is scarce.
7. Gradients are lighting.
8. Glass is a layering tool, not a theme.
9. Blur should be felt, not noticed.
10. Cards are optional, not default.
11. Motion must explain, confirm, connect, or reward.
12. Mobile is a separate composition problem.
13. Hebrew RTL is first-class.
14. Accessibility is part of quality.
15. Reuse tokens and components.
16. Remove before adding.
17. Preserve identity.
18. Borrow principles, never components.
19. Prefer product storytelling over frontend showcasing.
20. Do not make the portfolio look more designed. Make it look more intentional.
