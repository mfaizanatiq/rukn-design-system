# Contributing to Rukn Design System

Thank you for your interest in contributing to **Rukn DS** — the first modern design system built for Arabic, Urdu, and multilingual applications.

Contributions of all kinds are welcome: bug fixes, new components, RTL improvements, translation corrections, and documentation updates.

---

## Table of Contents

- [Project Setup](#project-setup)
- [Development Workflow](#development-workflow)
- [RTL Testing Guidelines](#rtl-testing-guidelines)
- [Adding a New Component](#adding-a-new-component)
- [Translation Contributions](#translation-contributions)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

---

## Project Setup

Rukn DS has **no build step and no required dependencies** for core development. The CSS and Web Components work directly in any modern browser.

```bash
git clone https://github.com/mfaizanatiq/RuknDesignSystem.git
cd RuknDesignSystem
```

That's it. Open any HTML file directly in your browser to get started.

> **Note:** `npm install` is not required for core CSS/JS development. Node.js is only needed if you want to use the npm package tooling or run `npm test` / `npm run build` scripts.

---

## Development Workflow

1. Edit CSS in `styles/design-system.css` or `styles/design-system-variables.css`.
2. Edit Web Components in `components/rukn-ui.js`, `components/rukn-navbar.js`, or `components/rukn-sidebar.js`.
3. Open the relevant HTML file in your browser to test changes:
   - `components.html` — full component library showcase
   - `index.html` — project homepage
   - `foundation.html` — design tokens and foundations
   - `web-components-demo.html` — Web Components demo
   - `navbar-test.html` / `mobile-navbar-test.html` — navbar-specific testing
4. Refresh the browser after each change (no hot-reload needed).

There is no compilation required. Changes to `.css` and `.js` files are reflected immediately on page refresh.

---

## RTL Testing Guidelines

RTL support is a core feature of Rukn DS, not an afterthought. **Every new component must pass RTL testing before a PR can be merged.**

### Required Tests

For every new or modified component, verify behavior under all three of the following `<html>` configurations:

```html
<!-- Left-to-right (baseline) -->
<html lang="en">

<!-- Arabic RTL -->
<html lang="ar" dir="rtl">

<!-- Urdu RTL -->
<html lang="ur" dir="rtl">
```

### What to Check

- Text direction and alignment are correct in RTL mode.
- Icons, chevrons, and directional elements are mirrored appropriately.
- Spacing, padding, and margins are symmetric or intentionally directional.
- No hardcoded `left`/`right` values break the RTL layout.
- Focus rings, hover states, and animations behave consistently in both directions.

### CSS Logical Properties

Use CSS logical properties wherever possible instead of physical directional values:

| Avoid (physical)     | Prefer (logical)           |
|----------------------|----------------------------|
| `margin-left`        | `margin-inline-start`      |
| `margin-right`       | `margin-inline-end`        |
| `padding-left`       | `padding-inline-start`     |
| `padding-right`      | `padding-inline-end`       |
| `border-left`        | `border-inline-start`      |
| `text-align: left`   | `text-align: start`        |
| `float: left`        | `float: inline-start`      |
| `left: 0`            | `inset-inline-start: 0`    |

Physical properties (`top`, `bottom`, `width`, `height`) are fine to use as-is.

---

## Adding a New Component

Follow these four steps to add a component to Rukn DS:

### Step 1 — CSS class in `styles/design-system.css`

Add the component's styles using the `ds-` prefix for class names and `--r-` prefix for any new design tokens. Use CSS logical properties for directional spacing.

```css
/* Example */
.ds-my-component {
  padding-inline: var(--r-space-4);
  color: var(--r-text-primary);
}
```

### Step 2 — Optional Web Component in `components/rukn-ui.js`

If the component benefits from encapsulation, custom attributes, or built-in i18n, add a Web Component using the `rukn-` prefix. Follow the pattern of existing components in that file.

### Step 3 — Add an example to `components.html`

Add a live example of the new component in the relevant section of `components.html`. Include both an LTR and an RTL demonstration where applicable.

### Step 4 — Update `CHANGELOG.md`

Add an entry under the `## [Unreleased]` section:

```markdown
## [Unreleased]

### Added
- **MyComponent** - Brief description of what it does and key variants
```

---

## Translation Contributions

Built-in translations for English (`en`), Arabic (`ar`), and Urdu (`ur`) live in `components/rukn-navbar.js` inside the `DEFAULT_TRANSLATIONS` object.

To add a missing key or correct an existing translation:

1. Open `components/rukn-navbar.js`.
2. Locate the `DEFAULT_TRANSLATIONS` object.
3. Add or correct the key in the relevant language block (`en`, `ar`, `ur`).
4. Test by switching the `lang` attribute on the `<html>` element in a test page.

```js
// Example structure in DEFAULT_TRANSLATIONS
const DEFAULT_TRANSLATIONS = {
  en: {
    search: 'Search',
    // add your key here
  },
  ar: {
    search: 'بحث',
    // add Arabic translation here
  },
  ur: {
    search: 'تلاش',
    // add Urdu translation here
  },
};
```

If you are a native speaker of Arabic or Urdu, translation corrections and improvements are especially appreciated.

---

## Pull Request Process

1. **One feature or fix per PR.** Keep changes focused and easy to review.
2. **Branch naming:** use a short descriptive name, e.g. `feat/card-component`, `fix/rtl-badge-padding`, `docs/contributing-guide`.
3. **Include screenshots** for any visual change. Provide a before/after pair showing both LTR and RTL layouts.
4. **Update `CHANGELOG.md`** by adding your change under `## [Unreleased]`.
5. **Describe your change** in the PR description: what changed, why, and how it was tested.
6. PRs that introduce new components without RTL test evidence will be asked to include it before merging.

---

## Code Style

| Context        | Convention                                    | Example                        |
|----------------|-----------------------------------------------|--------------------------------|
| CSS classes    | `ds-` prefix, lowercase, hyphen-separated     | `.ds-button`, `.ds-card-body`  |
| Design tokens  | `--r-` prefix, lowercase, hyphen-separated    | `--r-color-primary`, `--r-space-4` |
| Web Components | `rukn-` prefix, lowercase, hyphen-separated   | `<rukn-navbar>`, `<rukn-button>` |
| JavaScript     | Vanilla JS, ES modules, no frameworks         |                                |
| Comments       | Write comments in English                     |                                |

Keep CSS variables scoped to `:root` for global tokens. Avoid `!important` unless overriding third-party styles. Do not introduce external dependencies.

---

## Questions?

Open an issue on GitHub or reach out to the project author:

**M Faizan Atiq** — [mfaizanatiq@gmail.com](mailto:mfaizanatiq@gmail.com)
GitHub: [https://github.com/mfaizanatiq/RuknDesignSystem](https://github.com/mfaizanatiq/RuknDesignSystem)
