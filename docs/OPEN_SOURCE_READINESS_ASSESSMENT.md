# Rukn Design System — Open Source Readiness Assessment

**Assessed as:** Expert front-end / design-system perspective  
**Focus:** Is it good enough to be open source and easy to integrate?

---

## Executive summary

**Verdict: Yes, with targeted improvements.**

Rukn is a strong candidate for open source: clear tokens, framework-agnostic approach, good docs, and MIT license. To be “world-class” and trivial to adopt, it needs a few fixes (notably Web Component slot behavior), clearer public API surface, and a small set of community/ops additions.

---

## 1. Design tokens and theming

### Strengths

- **W3C-style token set** with a clear `--r-*` prefix (spacing, typography, motion, z-index, shadows). Easy to search and override.
- **Semantic color layer** (`--primary`, `--foreground`, `--background`, etc.) so products can theme without touching raw values.
- **Backward-compatibility aliases** (e.g. `--font-body` → `--r-font-body`) ease migration and integration.
- **Dark/light** via `.dark` and `[data-theme="dark"]`; primary color override and persistence (`ruknSetPrimaryColor`) are a real differentiator.
- **Motion tokens** (e.g. `--r-ease-ios-smooth`, `--r-spring-snappy`) and `prefers-reduced-motion` in `design-system.css` show awareness of motion and accessibility.

### Gaps

- **Dual naming in CSS:** Components use both `--font-body` and `--r-*`. For a public API, pick one convention (e.g. `--r-*` only) and alias the rest so the “contract” is obvious.
- **Token docs vs. code:** `design-system-variables.css` is the source of truth; ensure `DESIGN_TOKENS.md` (or foundation.html) stays in sync so integrators have one place to look.

**Recommendation:** Publish a short “Token contract” (README or INTEGRATION.md): “Override these `--r-*` and semantic variables to theme; the rest are implementation detail.”

---

## 2. Component architecture

### Strengths

- **Dual surface:** CSS-only (e.g. `btn-primary`, `ds-card`) plus optional Web Components (`<rukn-button>`, `<rukn-card>`) fits different adoption paths.
- **No Shadow DOM** keeps global design tokens and page CSS applicable; simpler theming and smaller mental model.
- **Observed attributes** (`variant`, `size`, `loading`, etc.) and re-render on change follow standard custom-element patterns.
- **Single bundle** (`rukn-ui.js`) and optional layout pieces (navbar, sidebar, footer) keep integration simple.

### Critical fix: slot content in light DOM

Web Components that use `<slot></slot>` in `innerHTML` **without** Shadow DOM do not project content. Setting `this.innerHTML = '...<slot></slot>...'` replaces the host’s children, and `<slot>` in the light DOM has no special behavior, so content between tags is lost (e.g. `<rukn-button>Click Me</rukn-button>` can show an empty button).

**Fix applied:** A `ruknApplySlotContent(host, savedChildren)` helper now runs after each component’s `innerHTML` set: the host’s `childNodes` are captured before render, then moved into the slot’s position and the `<slot>` node is removed. This restores correct behavior for `<rukn-button>Label</rukn-button>`, `<rukn-card>`, `<rukn-badge>`, `<rukn-alert>`, `<rukn-modal>`, and `<rukn-icon>` without introducing Shadow DOM.

---

## 3. Accessibility

### Strengths

- **Focus:** `:focus-visible` and visible outline (e.g. `outline: 2px solid hsl(var(--primary) / 0.5)` on buttons, inputs, checkbox, radio, switch, slider) are used consistently.
- **Utilities:** `.sr-only` and `.sr-only-focusable` are present.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` in `design-system.css`.
- **Alert close:** Dismissible alerts use an `aria-label` (and i18n hook).

### Gaps

- **ARIA:** Not every interactive component exposes roles/states (e.g. `role="progressbar"`, `aria-valuenow` for progress; `aria-busy` for loading buttons). Adding these would strengthen WCAG 2.1 AA claims.
- **Navbar/sidebar:** Ensure mobile menu has `aria-expanded` and that focus is trapped or returned appropriately when opened/closed.

**Recommendation:** Add a short “Accessibility” section in the main README and in the component docs (e.g. “Focus visible, reduced motion, and ARIA where applicable”), and add minimal ARIA to progress, loading, and overlay components.

---

## 4. Documentation and DX

### Strengths

- **README:** Quick start, theme toggle, token preview, and “why Rukn” are clear.
- **Integration:** INTEGRATION_GUIDE.md, QUICK_START, THEME_GUIDE, and WEB_COMPONENTS.md give multiple entry points.
- **Component docs:** WEB_COMPONENTS.md lists components with usage examples and framework notes (React, Vue, Angular, Svelte).
- **Project structure:** PROJECT_STRUCTURE.md and COMPONENT_ARCHITECTURE.md make the repo easy to navigate.
- **Changelog:** CHANGELOG.md supports upgrade path and trust.

### Gaps

- **CONTRIBUTING.md** is missing (how to run, test, and submit PRs).
- **API surface:** One place (e.g. “Component API” in README or a dedicated page) that lists every custom element, its attributes, and optional JS API (e.g. `ruknModal.open()`, `ruknSetPrimaryColor`) would make integration and discovery easier.
- **Version in docs:** Some docs reference “2.0.0” or “v2”; aligning version mentions with package.json avoids confusion.

**Recommendation:** Add CONTRIBUTING.md (clone, install, scripts, lint, how to add a component). Add a single “API reference” section or page for all components and global helpers.

---

## 5. Integration and distribution

### Strengths

- **package.json:** `@ruknds/core`, `exports` for main, styles, and components; `type: "module"`; `files` and `keywords` are appropriate for npm.
- **Consumption:** Copy CSS + optional JS, or npm install, or CDN (docs mention unpkg). No build step required for CSS-only or script-tag usage.
- **TypeScript:** `types.d.ts` exists and covers CSS variables and modal/drawer helpers; extending it to custom elements (e.g. `rukn-button` attributes) would help TS users.

### Gaps

- **Exports:** `exports` could explicitly list `./styles/design-system.css` and `./styles/design-system-variables.css` so bundlers can resolve them predictably.
- **No build step:** There is no minified/bundled build; what you ship is source. For a small codebase this is fine, but a single minified `rukn-ui.min.js` (and optional single CSS bundle) would suit CDN and “drop-in” users.

**Recommendation:** Document the exact import paths for CSS and JS (npm and CDN). Optionally add a small build script that outputs minified assets and list them in `files` and docs.

---

## 6. Code quality and consistency

### Strengths

- **Naming:** Component classes and tag names (`rukn-button`, `rukn-card`) are consistent; design tokens use a clear prefix.
- **No framework lock-in:** Vanilla JS and standard CSS; no React/Vue runtime.

### Gaps

- **Inline styles in components:** Some layout components use `style="..."` in template strings. Prefer design tokens and classes (e.g. `var(--r-space-4)`) or shared utility classes so overrides and theming stay in CSS.
- **Event listener lifecycle:** Some components add document-level listeners (e.g. `rukn:languagechange`) without removing them in `disconnectedCallback`, which can leak when elements are removed from the DOM.

**Recommendation:** Prefer token-based classes over inline styles where possible. Use `disconnectedCallback` to remove any global or document listeners added in `connectedCallback`.

---

## 7. Open source and community

### Strengths

- **License:** MIT is permissive and standard.
- **Repository and links:** README points to repo, issues, and author; structure is clear for contributors.

### Gaps

- **CONTRIBUTING.md:** Missing; new contributors don’t have a single place for setup and PR process.
- **Code of conduct:** Not present; many OSS projects add a short CoC for community safety.
- **Security:** No SECURITY.md or “how to report a vulnerability” yet; low risk for a CSS/JS library but good practice.

**Recommendation:** Add CONTRIBUTING.md, a short Code of Conduct, and optionally SECURITY.md (e.g. “open an issue or contact maintainer for security concerns”).

---

## 8. Summary: “Good enough to open source?”

| Area              | Ready? | Notes                                                                 |
|-------------------|--------|-----------------------------------------------------------------------|
| Design tokens     | Yes    | Strong set; clarify public token contract.                            |
| Theming           | Yes    | Semantic colors + primary override; document the contract.            |
| Components (CSS)  | Yes    | Rich set; consistent focus and reduced motion.                       |
| Web Components    | Fix    | Slot content must be preserved (light DOM fix or Shadow DOM).        |
| Accessibility     | Mostly | Focus and reduced motion good; add ARIA where needed.                 |
| Documentation     | Yes    | Multiple guides; add CONTRIBUTING + single API reference.             |
| Integration       | Yes    | npm/exports and docs; optional minified build.                        |
| License & community | Mostly | MIT; add CONTRIBUTING, CoC, optional SECURITY.                      |

**Bottom line:** The design system is **good enough to open source** and **can be easy to integrate** once:

1. **Slot behavior is fixed** so `<rukn-button>Label</rukn-button>` and similar components show content.
2. **Public API is documented** (tokens to override, components, attributes, JS helpers).
3. **Contributor experience** is clarified (CONTRIBUTING, CoC, optional SECURITY).

After that, Rukn is in a strong position as a lightweight, framework-agnostic, token-driven design system that’s easy to adopt and to contribute to.
