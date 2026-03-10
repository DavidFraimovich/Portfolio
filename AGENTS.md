# AGENTS.md

This file defines the coding standards for this repository.
It is intended for both human contributors and AI coding agents.

## 1) Core Principles

- Keep code simple, readable, and predictable.
- Prefer maintainability over cleverness.
- Minimize regressions and avoid broad, risky rewrites unless explicitly requested.
- Preserve visual consistency with the existing site unless a redesign is requested.
- Performance is a product requirement, not an afterthought.

## 2) Tech and Architecture

- Framework: Next.js App Router.
- Language: TypeScript.
- Content: MDX + JSON content files.
- i18n: bilingual routing (`/en`, `/he`) with RTL support for Hebrew.
- Output target: static export (`output: "export"`).

## 3) Project Structure Rules

- Keep route logic inside `app/`.
- Keep reusable UI in `components/`.
- Keep business/content helpers in `lib/`.
- Keep locale content in `content/`.
- Put static assets in `public/`.
- Do not move folders or rename core files without explicit approval.

## 4) TypeScript Rules

- Prefer explicit types for props, return values, and shared structures.
- Avoid `any`; if unavoidable, isolate and document why.
- Use narrow unions where possible.
- Keep types close to usage unless shared by multiple modules.

## 5) React / Next.js Rules

- Default to Server Components; use Client Components only when needed.
- Avoid unnecessary client-side state and hydration.
- Keep components focused and small.
- Extract repeated UI patterns into reusable components.
- Avoid heavy runtime dependencies unless there is a clear product need.

## 6) Styling Rules

- Use CSS Modules for component-specific styling.
- Use global CSS only for truly global styles/tokens/layout.
- Keep global font families locale-aware: English (`/en`) uses `Lufga`, Hebrew (`/he`) uses `ALMONI`.
- Use `px` units (not `rem`) for spacing/sizing/typography unless explicitly requested otherwise.
- Prefer `clamp()` for responsive typography and major dimensions.
- Keep selectors simple and avoid deep specificity chains.

## 7) Motion and Performance Rules

- Keep animations subtle and purposeful.
- Prefer GPU-friendly properties (`transform`, `opacity`).
- Avoid expensive effects by default, especially in hero/background sections.
- Avoid WebGL/shader backgrounds unless explicitly requested.
- Avoid large animated blur/backdrop-filter stacks.
- Reduce moving element count in hero/background scenes.
- Always provide `prefers-reduced-motion` handling.
- When tuning performance, reduce layers/objects first, then animation complexity.

## 8) Content and i18n Rules

- Any user-facing string change should be validated for both EN and HE flows.
- Preserve semantic RTL behavior (`dir="rtl"`) for Hebrew.
- Keep message meaning equivalent across locales.
- Do not hardcode locale-specific links when locale-aware helpers exist.

## 9) Accessibility Rules

- Use semantic HTML first.
- Preserve heading hierarchy.
- Keep keyboard focus visible (`:focus-visible`).
- Provide meaningful `alt` text for images.
- Add `aria-label` only when native text is not enough.

## 10) Dependency Rules

- Do not add dependencies when native/browser/React solutions are sufficient.
- If adding a dependency, keep scope small and justify why.
- Remove unused dependencies after refactors.

## 11) Validation Rules

- Before finishing, run `npm run build`.
- If lint is interactive/broken in current setup, report that clearly.
- For visual-heavy changes, validate both desktop and mobile layouts.
- For any major UI/layout change, run a fast behavior QA pass with Playwright on Chromium.
- Capture at least desktop + mobile screenshots using different viewport sizes.
- If a regression is found in that pass, fix it immediately and re-run the same Playwright check before handoff.

## 12) Git and Change Safety Rules

- Never revert unrelated user changes.
- Keep diffs targeted to the request.
- Prefer incremental changes over large all-at-once rewrites.
- Mention notable side effects and residual risks in handoff.

## 13) Definition of Done

A change is done when:

- The requested behavior is implemented.
- Build succeeds (`npm run build`).
- No unnecessary dependencies or dead code remain.
- Styles and layout remain stable in EN + HE.
- Performance impact is neutral or improved for runtime-critical sections.
