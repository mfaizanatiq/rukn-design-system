# Rukn — Design System Guide for AI Agents

This document is the **single instruction set** agents should follow when building UI with Rukn. Humans welcome too.

---

## AI-readiness checklist

Use this to evaluate whether a design system is agent-friendly. **Bold** = Rukn status today.

### Must have (Rukn ships these)

| # | Requirement | Rukn |
|---|-------------|------|
| 1 | **Predictable class vocabulary** — stable names agents can memorize | ✅ `btn-primary`, `ds-card`, `ds-input`, `ds-badge-*` |
| 2 | **Documented Web Components** — tags, attributes, defaults | ✅ `<rukn-navbar>`, `<rukn-button>`, etc. → [`docs/COMPONENT_API.md`](./docs/COMPONENT_API.md) |
| 3 | **Semantic design tokens** — consistent `--r-*` prefix | ✅ [`docs/DESIGN_TOKENS.md`](./docs/DESIGN_TOKENS.md), [`styles/design-system-variables.css`](./styles/design-system-variables.css) |
| 4 | **Copy-paste bootstrap** — no bundler required | ✅ CDN 2-line install in [`README.md`](./README.md) |
| 5 | **Live component gallery** — ground truth for visuals | ✅ [`components.html`](./components.html) |
| 6 | **Zero runtime dependencies** — plain HTML/CSS/JS | ✅ No React/Vue required |
| 7 | **TypeScript declarations** — JSX / attribute hints | ✅ [`types.d.ts`](./types.d.ts) |
| 8 | **RTL / multilingual rules documented** | ✅ [`docs/RTL_GUIDE.md`](./docs/RTL_GUIDE.md) |
| 9 | **Agent entry point** — one file to read first | ✅ [`AGENTS.md`](./AGENTS.md) + this file |
| 10 | **Open source repo** — agents can read source | ✅ MIT, full source on GitHub |

### Should have

| # | Requirement | Rukn |
|---|-------------|------|
| 11 | **Per-component minimal examples** in one file | ✅ Gallery in `components.html` + examples in `DESIGN.md` / `components.json` |
| 12 | **Machine-readable manifest** (`components.json`) | ✅ [`components.json`](./components.json) |
| 13 | **Cursor rules / agent rules package** | ✅ [`.cursor/rules/rukn-design-system.mdc`](./.cursor/rules/rukn-design-system.mdc) |
| 14 | **`llms.txt`** index at site root | ✅ [`llms.txt`](./llms.txt) |
| 15 | **MCP server** for token + component lookup | 🔜 Roadmap |

### Nice to have

| # | Requirement | Rukn |
|---|-------------|------|
| 16 | Figma Code Connect mappings | 🔜 Planned |
| 17 | Automated visual regression for agent output | ❌ Not yet |
| 18 | Prompt templates per screen type | ⚠️ Examples below |

---

## Bootstrap templates

### Minimal page (LTR, English, dark)

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
  <script src="components/rukn-navbar.js" defer></script>
  <script src="components/rukn-ui.js" type="module"></script>
</head>
<body>
  <rukn-navbar current="home"></rukn-navbar>
  <main class="ds-container" style="padding: var(--r-space-8);">
    <h1>Page title</h1>
    <button class="btn-primary">Action</button>
  </main>
</body>
</html>
```

### Arabic RTL page

```html
<html lang="ar" dir="rtl" class="dark">
```

Add font:

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Urdu RTL page (Nastaliq)

```html
<html lang="ur" dir="rtl" class="dark">
```

Add font:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Agent rules

### Always

- Use Rukn class names and components from the catalog below.
- Set `lang` and `dir` on `<html>` for the target locale.
- Use `class="dark"` unless the user asks for light mode.
- Use semantic tokens: `hsl(var(--primary))`, `hsl(var(--foreground))`, `var(--r-space-4)`.
- Prefer Web Components for layout chrome: `<rukn-navbar>`, `<rukn-sidebar>`, `<rukn-footer>`.
- Wrap page content in `.ds-container` or `.page-container` patterns from [`index.html`](./index.html).

### Never

- Do not invent `btn-*`, `ds-*`, or `rukn-*` names not in the API.
- Do not import Tailwind/Bootstrap/MUI unless explicitly requested.
- Do not use inline hex colors when a token exists.
- Do not build custom navbars when `<rukn-navbar>` covers the use case.
- Do not omit `dir="rtl"` for Arabic/Urdu layouts.

---

## Component catalog

**Live examples:** [`components.html`](./components.html)  
**Full API:** [`docs/COMPONENT_API.md`](./docs/COMPONENT_API.md)  
**Source:** [`components/`](./components/)

### CSS primitives (class-based)

| Component | Classes | Doc anchor |
|-----------|---------|------------|
| Button | `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-destructive`, `btn-sm`, `btn-lg` | [components.html#buttons](./components.html#buttons) |
| Input | `ds-input`, `ds-textarea`, `ds-select` | [components.html#inputs](./components.html#inputs) |
| Checkbox / Switch | `ds-checkbox`, `ds-checkbox-wrapper`, `ds-switch`, `ds-switch-wrapper` | [components.html#inputs](./components.html#inputs) |
| Card | `ds-card`, `ds-glass` | [components.html#cards](./components.html#cards) |
| Badge | `ds-badge`, `ds-badge-primary`, `ds-badge-success`, `ds-badge-warning`, `ds-badge-destructive`, `ds-badge-neutral` | [components.html#cards](./components.html#cards) |
| Alert | `ds-alert` | [components.html](./components.html) |
| Table | `ds-table` | [components.html](./components.html) |
| Layout | `ds-container`, `ds-grid`, `ds-flex`, `ds-grid-cols-*` | [foundation.html](./foundation.html) |
| Navbar (CSS) | `ds-navbar`, `ds-navbar-container`, `ds-navbar-brand` | [components.html](./components.html) |

### Web Components

| Tag | Key attributes | Source | Register via |
|-----|----------------|--------|----------------|
| `<rukn-navbar>` | `current="home\|foundation\|components"`, `search` | [`components/rukn-navbar.js`](./components/rukn-navbar.js) | `rukn-navbar.js` |
| `<rukn-footer>` | — | [`components/rukn-footer.js`](./components/rukn-footer.js) | `rukn-footer.js` |
| `<rukn-sidebar>` | `type="foundation\|components"` | [`components/rukn-sidebar.js`](./components/rukn-sidebar.js) | `rukn-sidebar.js` |
| `<rukn-button>` | `variant`, `size`, `loading`, `disabled`, `icon` | [`components/rukn-button.js`](./components/rukn-button.js) | `rukn-ui.js` |
| `<rukn-badge>` | `variant` | [`components/rukn-badge.js`](./components/rukn-badge.js) | `rukn-ui.js` |
| `<rukn-card>` | `glass` | [`components/rukn-card.js`](./components/rukn-card.js) | `rukn-ui.js` |
| `<rukn-alert>` | `variant`, `title`, `dismissible` | [`components/rukn-alert.js`](./components/rukn-alert.js) | `rukn-ui.js` |
| `<rukn-input>` | standard input attrs | [`components/rukn-input.js`](./components/rukn-input.js) | `rukn-ui.js` |
| `<rukn-modal>` | `modal-id`, `title` | [`components/rukn-modal.js`](./components/rukn-modal.js) | `rukn-ui.js` |
| `<rukn-spinner>` | `size` | [`components/rukn-spinner.js`](./components/rukn-spinner.js) | `rukn-ui.js` |
| `<rukn-progress>` | `value`, `indeterminate` | [`components/rukn-progress.js`](./components/rukn-progress.js) | `rukn-ui.js` |
| `<rukn-icon>` | Lucide icon name | [`components/rukn-icon.js`](./components/rukn-icon.js) | `rukn-ui.js` |

**Import map:**

```html
<!-- Layout -->
<script src="components/rukn-navbar.js" defer></script>
<script src="components/rukn-sidebar.js" defer></script>
<script src="components/rukn-footer.js" defer></script>
<!-- All UI components -->
<script src="components/rukn-ui.js" type="module"></script>
```

---

## Token quick reference

Full list: [`docs/DESIGN_TOKENS.md`](./docs/DESIGN_TOKENS.md)

| Category | Examples |
|----------|----------|
| Color | `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--border`, `--success`, `--warning`, `--destructive` |
| Spacing | `--r-space-1` … `--r-space-16` |
| Radius | `--r-radius-sm`, `--r-radius-md`, `--r-radius-lg`, `--r-radius-xl`, `--r-radius-2xl` |
| Typography | `--r-font-heading`, `--r-font-body`, `--r-font-arabic`, `--r-font-urdu`, `--r-font-mono` |
| Motion | `--r-transition-fast`, `--r-transition-base` |

Usage:

```css
color: hsl(var(--foreground));
background: hsl(var(--primary) / 0.1);
padding: var(--r-space-4);
border-radius: var(--r-radius-lg);
```

---

## Composition examples for agents

### Dashboard shell

```html
<rukn-navbar current="home"></rukn-navbar>
<main class="ds-container" style="padding: var(--r-space-8);">
  <div class="ds-grid ds-grid-cols-1 ds-md-grid-cols-3" style="gap: var(--r-space-4);">
    <div class="ds-card" style="padding: var(--r-space-5);">
      <h3>Metric</h3>
      <p class="ds-text-2xl">1,240</p>
    </div>
  </div>
</main>
<rukn-footer></rukn-footer>
```

### Arabic settings page

```html
<html lang="ar" dir="rtl" class="dark">
<!-- ... head with Rukn CSS ... -->
<rukn-navbar current="home"></rukn-navbar>
<main class="ds-container" style="padding: var(--r-space-8);">
  <h1>الإعدادات</h1>
  <div class="ds-card" style="padding: var(--r-space-6); display: flex; flex-direction: column; gap: var(--r-space-4);">
    <input type="text" class="ds-input" placeholder="البريد الإلكتروني" aria-label="البريد الإلكتروني">
    <button class="btn-primary">حفظ</button>
  </div>
</main>
```

### Prompt template (give this to your agent)

```
Use Rukn Design System (read DESIGN.md and docs/COMPONENT_API.md).

Build: [describe screen]
Locale: [en | ar | ur]
Direction: [ltr | rtl]
Theme: dark

Rules:
- Use btn-*, ds-*, rukn-* primitives only
- Include rukn-navbar if it's an app page
- Set lang and dir on <html>
- No extra CSS frameworks
```

---

## Reference demos

| Demo | Path | Shows |
|------|------|-------|
| Marketing home | [`index.html`](./index.html) | Hero, bento, RTL branding |
| Component gallery | [`components.html`](./components.html) | Every component, searchable |
| Design tokens | [`foundation.html`](./foundation.html) | Colors, type, spacing |
| Arabic bookstore | [`demo/maktaba.html`](./demo/maktaba.html) | Full RTL e-commerce |
| Minimal starter | [`starter-template.html`](./starter-template.html) | Blank scaffold |

---

## File map (for repo-aware agents)

```
AGENTS.md                            # Agent entry point
DESIGN.md                            # Full agent guide + checklist
components.json                      # Machine-readable catalog
llms.txt                             # LLM site index
.cursor/rules/rukn-design-system.mdc # Cursor always-on rules
styles/design-system-variables.css   # Tokens
styles/design-system.css             # All component CSS
components/rukn-ui.js                # UI Web Components bundle
components/rukn-navbar.js            # Navbar + i18n + theme
components/rukn-sidebar.js           # Docs sidebar
components/rukn-footer.js            # Footer
docs/COMPONENT_API.md                # API reference
docs/DESIGN_TOKENS.md                # Token reference
docs/RTL_GUIDE.md                    # RTL / multilingual
types.d.ts                           # TypeScript types
dist/rukn.min.css + dist/rukn.min.js # CDN bundle
```

---

## Version

Rukn **v2.2.0** — MIT License — https://ruknds.netlify.app
