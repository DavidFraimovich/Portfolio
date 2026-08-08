# Design System Wave 1 Execution Plan

Status: active  
Branch: `codex/design-system-wave-1`  
Design source of truth: `DESIGN_CONSTITUTION.MD`

Stage 0 status: complete (2026-08-08)

## Objective

Evolve the existing portfolio toward the design constitution without redesigning the parts that already work. This branch deliberately combines the first foundations with a larger, coherent product-facing scope:

1. P0 correctness: RTL, accessibility, motion, and responsive behavior.
2. Home narrative and hierarchy.
3. Minimal layout primitives required by the Home and shared shell.

The implementation must remain incremental. Existing selectors stay available as bridges until all consumers in this branch have migrated and passed QA.

## Explicit scope decisions

### In scope

- Semantic design tokens and legacy aliases.
- Canonical spacing, typography, radius, shadow, grid, and motion scales.
- `PageContainer`, `Section`, and `SectionHeader` in compatibility-first form.
- Home section ownership, hierarchy, capabilities presentation, and selected-work ordering.
- P0 RTL, keyboard, contrast, focus, heading, portal-locale, and responsive defects in the shared shell and Home.
- Motion cleanup for Skills, Product Goals, Windmills, controls, and reveals where it improves clarity or accessibility.
- EN/HE and light/dark/system validation.

### Explicitly out of scope

- Any Signy redesign, native conversion, content migration, or direct edit to:
  - `components/SignyNotionEmbed.tsx`
  - `components/SignyNotionEmbed.module.css`
  - `lib/signy.ts`
  - Signy MDX content
- Removing, stopping, retiming, or restyling `BubbleBackground`. Its current animation is an owner-approved exception and must remain unchanged in this branch.
- Broad migration of bespoke case-study layouts.
- Removing global `.card`, `.cta`, `.grid`, `.hero`, `.pill`, or `.section-title` bridges.
- Building a generic `CaseStudyPage`, `GenericHero`, or a large UI library without a current consumer.
- Font replacement or font-file introduction until files and licensing are confirmed.

## Global guardrails

- Preserve Hero copy, portrait, CTA relationship, Product Playbook content, Case Studies editorial composition, Resume narrative, and Windmills brand moment.
- Do not invent new product claims, metrics, or evidence.
- Do not add a new dependency without a separate decision.
- Prefer semantic tokens; project-specific accents remain local.
- Full-bleed is allowed for background and media, while primary text returns to the canonical container.
- A stage is complete only after EN/HE, desktop/mobile, light/dark, keyboard, and build checks appropriate to that stage pass.

## Stage 0 — Foundations and pixel-parity bridge

Goal: introduce the migration contract and repair isolated defects without intentionally changing composition or visual hierarchy.

### 0.1 Branch and scope

- [x] Create `codex/design-system-wave-1` from `main`.
- [x] Preserve the pre-existing untracked `DESIGN_CONSTITUTION.MD`.
- [x] Save this execution plan.
- [x] Confirm the final Stage 0 diff contains no Signy or BubbleBackground changes.

### 0.2 Semantic color contract

- [x] Add canonical dark values:
  - `--background`, `--background-soft`
  - `--surface`, `--surface-elevated`, `--surface-interactive-hover`
  - `--text-primary`, `--text-content`, `--text-secondary`, `--text-muted`, `--text-strong`
  - `--border-subtle`, `--border-default`, `--border-strong`
  - `--accent`, `--accent-bright`, `--accent-surface`, `--accent-surface-strong`
  - `--accent-border`, `--accent-border-strong`, `--focus-ring`
- [x] Define the same semantic contract for explicit light and system light.
- [x] Make the canonical tokens the literal-value source.
- [x] Convert the existing global names to aliases toward the canonical contract.
- [x] Keep existing component tokens such as `--btn-*`, `--chip-*`, and project accents unchanged.

### 0.3 Foundation scales

- [x] Add spacing scale: `0, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120, 160`.
- [x] Add section and content-flow aliases.
- [x] Add typography roles: Display, H1, H2, H3, Body Large, Body, Small, Caption.
- [x] Keep the existing EN/HE tracking tokens as the locale-aware tracking contract.
- [x] Add radius scale: `8, 12, 16, 24, pill, circle`.
- [x] Add `1px` border-width token.
- [x] Add `xs/sm/md` shadow targets without migrating existing shadows yet.
- [x] Add motion durations, easing, distances, and subtle hover scale.
- [x] Add grid/container targets without changing current layout widths yet.

### 0.4 Isolated correctness fixes

- [x] Correct the reversed Technical Skills title clamp to `clamp(40px, 5.8vw, 52px)`.
- [x] Align Smart Campus gallery variable names with the shared gallery contract.
- [x] Record the remaining portal inheritance issue: variables set on the case-study root do not reach the gallery dialog rendered under `document.body`. Resolve this later with the portal/Responsive work; do not broaden Stage 0.
- [x] Record, but do not fix in Stage 0:
  - invalid `min(100vw - 24px, 1120px)` in Not Found;
  - shared gallery use of `100vh` instead of dynamic viewport units.

### 0.5 Stage 0 verification gate

- [x] No newly unresolved `var()` references.
- [x] Legacy aliases compute to the same values as before in dark, explicit light, and system light.
- [x] No reversed `clamp()` remains.
- [x] `git diff --check` passes.
- [x] `npm run build` passes.
- [x] Visual smoke: EN dark desktop, HE dark desktop, EN light mobile, HE light mobile.
- [x] No intentional container, spacing, radius, shadow, Home narrative, Signy, or BubbleBackground change appears in the diff.

## Stage 1 — Layout primitives in bridge mode

Goal: establish shared alignment without a big-bang layout change.

### 1.1 `PageContainer`

- [ ] Add `components/ui/PageContainer.tsx` and its CSS Module.
- [ ] Support only `standard`, `wide`, and `reading` sizes.
- [ ] Start with a compatibility mode matching the existing `1100px / 92vw` behavior.
- [ ] Add canonical target sizes without activating them globally.
- [ ] Migrate the shared shell and one Home section at a time.

### 1.2 `Section`

- [ ] Add contained/full-bleed behavior.
- [ ] Keep primary text aligned to `PageContainer` inside full-bleed sections.
- [ ] Support only compact, standard, and major vertical rhythm.
- [ ] Do not encode gradients, glows, or project art direction in the primitive.

### 1.3 `SectionHeader`

- [ ] Support eyebrow, title, description, and optional action.
- [ ] Enforce semantic heading level at the call site.
- [ ] Do not expose decorative style props.

### 1.4 Stage 1 gate

- [ ] Nav, standard Home content, and Footer share intentional alignment anchors.
- [ ] Hero remains full bleed.
- [ ] Resume, Case Studies, and Signy show no unintended layout change.
- [ ] No horizontal overflow at 320px.
- [ ] Legacy global layout selectors remain available.

## Stage 2 — Home narrative and semantics

Goal: make the Home read as a product-leadership story rather than a skill inventory.

### 2.1 Ownership and hierarchy

- [ ] Remove the second H1 from Skills.
- [ ] Stop `SkillsRibbon` from owning Product Goals and Technical Skills as nested sections.
- [ ] Let `app/[locale]/page.tsx` own the explicit section order.
- [ ] Preserve Hero and Product Playbook copy.

### 2.2 Selected work

- [ ] Replace `slice(0, 3)` with one curated presentation source.
- [ ] Show problem, decision, and impact where content supports them.
- [ ] Do not add unsupported outcomes.

### 2.3 Capabilities

- [ ] Replace the 54-item repeated marquee with concise capability groups:
  - Product
  - Engineering
  - AI/Data
  - Design
- [ ] Keep technical tools as supporting evidence rather than a dominant badge wall.
- [ ] Remove duplicated DOM content used solely for infinite marquee animation.

### 2.4 Product Goals

- [ ] Decide whether the section communicates methodology or proof.
- [ ] Remove random KPI chips as apparent evidence.
- [ ] Remove pointer-only instructions and hover-only meaning.
- [ ] Preserve the contact CTA as an independent semantic link.

### 2.5 Stage 2 gate

- [ ] Exactly one H1.
- [ ] One primary message per section.
- [ ] Evidence appears before or alongside capability claims.
- [ ] No badge wall, infinite skills marquee, or unsupported KPI display.
- [ ] EN/HE have equivalent meaning and intentional order.

## Stage 3 — RTL and responsive integration

Goal: make the new structure intentional across language and viewport modes.

### 3.1 Document and portal locale

- [ ] Ensure exported `/en` HTML is `en/ltr` and exported `/he` HTML is `he/rtl` without depending solely on hydration.
- [ ] Pass explicit locale context to Mobile Nav, gallery dialogs, and Footer dialogs.
- [ ] Ensure portal font family matches the locale.

### 3.2 BiDi

- [ ] Isolate emails, URLs, dates, percentages, acronyms, and mixed-language metrics.
- [ ] Verify punctuation and directional icons.
- [ ] Use `bdi`, `dir="auto"`, or focused `dir="ltr"` rather than broad forced direction.

### 3.3 Responsive defects

- [ ] Resolve Home Hero collision with the fixed navigation.
- [ ] Resolve Windmills/Footer overlap.
- [ ] Align visual and DOM order in the mobile Footer.
- [ ] Enforce 18–24px mobile page gutter.
- [ ] Replace shared gallery `100vh` with a dynamic viewport-safe solution.
- [ ] Correct the Not Found `min()` syntax.
- [ ] Ensure mobile H1 roles stay within the approved range.
- [ ] Remove reliance on overflow clipping to conceal layout defects.

### 3.4 Stage 3 gate

- [ ] 1440, 1024, 768, 390, and 320px pass without clipping or hidden overflow.
- [ ] 200% zoom passes without two-dimensional scrolling or content loss.
- [ ] RTL order, alignment, arrows, and mixed strings are intentional.
- [ ] Signy passes smoke testing despite having no direct changes.

## Stage 4 — Accessibility

### 4.1 Shared shell

- [ ] Add a skip link targeting the single `main` landmark.
- [ ] Add `aria-current="page"` to current navigation items.
- [ ] Localize accessible names for Nav, language, and theme controls.
- [ ] Choose and implement a complete keyboard model for ThemeSwitcher.

### 4.2 Mobile Nav

- [ ] Move focus into the opened drawer.
- [ ] Trap focus and make the background inert.
- [ ] Close on Escape and restore focus to the trigger.
- [ ] Use appropriate dialog and navigation semantics.

### 4.3 Content and controls

- [ ] Keep Product Goals meaningful without pointer access.
- [ ] Normalize the Home heading tree.
- [ ] Fix verified light-theme contrast failures.
- [ ] Preserve existing gallery and Footer-dialog focus behavior.

### 4.4 Stage 4 gate

- [ ] Complete keyboard-only Home and navigation flow.
- [ ] Focus is visible in both themes.
- [ ] Normal text meets 4.5:1; large text and controls meet 3:1.
- [ ] No interactive `div`, nested interactive control, or focus escape remains.

## Stage 5 — Motion, excluding BubbleBackground

The existing BubbleBackground implementation is frozen for this branch.

- [ ] Remove the infinite Skills marquee as part of the narrative change.
- [ ] Remove random/pulsing Product Goals motion that does not communicate state.
- [ ] Keep hover feedback around the canonical 180ms duration and 1px movement.
- [ ] Keep reveals within the defined distance and duration ranges.
- [ ] Review Windmills repeat behavior without changing its visual identity.
- [ ] Respect reduced-motion for all modified components except the explicitly frozen BubbleBackground.

## Stage 6 — Integration and completion gate

- [ ] `npm run build` passes.
- [ ] Full smoke of every static route at 375px and 1440px.
- [ ] Deep QA of Home, Resume, Case Studies list, representative generic/specialized cases, and 404.
- [ ] EN/HE, light/dark/system, keyboard-only, reduced-motion, and 200% zoom pass.
- [ ] No direct Signy or BubbleBackground diff.
- [ ] No legacy global primitive removed prematurely.
- [ ] Review final diff against this scope before commit.

## Estimated effort

- Stage 0: 1–2 days
- Stage 1: 2–3 days
- Stage 2: 3–5 days
- Stage 3: 2–4 days
- Stage 4: 2–3 days
- Stage 5: 1–2 days
- Stage 6: 1–2 days

Total for this branch: approximately 12–21 focused workdays, including bilingual visual and accessibility QA.
