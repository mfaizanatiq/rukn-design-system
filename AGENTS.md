# Rukn Design System — Agent Instructions

**Read this file first.** Rukn is an AI-ready, RTL-first design system for Arabic, Urdu, and multilingual web apps.

## Start here

| Priority | File | Purpose |
|----------|------|---------|
| 1 | [`DESIGN.md`](./DESIGN.md) | **Primary agent guide** — bootstrap, rules, component catalog, examples |
| 2 | [`components.json`](./components.json) | Machine-readable catalog (classes, tags, attributes, prompt template) |
| 3 | [`docs/COMPONENT_API.md`](./docs/COMPONENT_API.md) | Full CSS class + Web Component attribute reference |
| 4 | [`docs/DESIGN_TOKENS.md`](./docs/DESIGN_TOKENS.md) | Token names (`--r-*`), typography, spacing, colors |
| 5 | [`docs/RTL_GUIDE.md`](./docs/RTL_GUIDE.md) | Arabic/Urdu RTL setup and multilingual rules |
| 6 | [`types.d.ts`](./types.d.ts) | TypeScript / JSX autocomplete for Web Components |
| 7 | [`components.html`](./components.html) | Live component gallery (visual reference) |
| 8 | [`/storybook/`](https://ruknds.netlify.app/storybook/) | Interactive Storybook (theme + locale) |
| 9 | [`llms.txt`](./llms.txt) | Site index for LLM crawlers |
| 10 | [`.cursor/rules/rukn-design-system.mdc`](./.cursor/rules/rukn-design-system.mdc) | Cursor always-on project rules |

## Quick bootstrap

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mfaizanatiq/RuknDesignSystem@master/dist/rukn.min.css">
<script src="https://cdn.jsdelivr.net/gh/mfaizanatiq/RuknDesignSystem@master/dist/rukn.min.js" defer></script>
```

Or source files (preferred for development):

```html
<link rel="stylesheet" href="styles/design-system-variables.css">
<link rel="stylesheet" href="styles/design-system.css">
<script src="components/rukn-navbar.js" defer></script>
<script src="components/rukn-ui.js" type="module"></script>
```

## Agent workflow

1. **Read** `DESIGN.md` for rules and the component catalog.
2. **Compose** UI using Rukn primitives — do not invent custom CSS unless extending tokens.
3. **Set** `lang` and `dir` on `<html>` for Arabic/Urdu (`lang="ar" dir="rtl"`).
4. **Use** `class="dark"` on `<html>` (Rukn defaults to dark mode).
5. **Verify** output against [`components.html`](./components.html) or [Storybook](https://ruknds.netlify.app/storybook/) patterns.

## Do not

- Invent class names outside the Rukn vocabulary (`btn-*`, `ds-*`, `rukn-*`).
- Use Tailwind, Bootstrap, or another UI library alongside Rukn unless explicitly asked.
- Hardcode colors — use semantic tokens (`hsl(var(--primary))`, `hsl(var(--foreground))`).
- Skip RTL setup for Arabic/Urdu content.
- Add npm dependencies for basic UI — Rukn is zero-dependency.

## Package

- npm: `@ruknds/core`
- Repo: https://github.com/mfaizanatiq/RuknDesignSystem
- Live docs: https://ruknds.netlify.app
