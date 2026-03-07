# Rukn Design System

**The first modern design system built for Arabic, Urdu, and multilingual applications.**

> **Rukn** (رُكن / رکن) means "pillar" in Arabic and Urdu — the structural foundation your multilingual app needs.

[![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)](https://github.com/mfaizanatiq/RuknDesignSystem)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

Every major design system assumes left-to-right English. Arabic and Urdu developers spend weeks wrestling components into RTL layout, fighting font fallbacks, and patching spacing that was never designed for Nastaliq script. **Rukn starts from the opposite end.**

## What makes Rukn different

- **RTL-first** — `dir="rtl"` works out of the box, not as an afterthought. 87+ RTL CSS rules ship by default.
- **Arabic typography tokens** — `--r-font-arabic` pre-wired to IBM Plex Sans Arabic, optimized for UI.
- **Urdu Nastaliq support** — Noto Nastaliq Urdu with dedicated line-height tokens (`--r-line-height-urdu-base: 1.75`) because Nastaliq script demands more vertical space.
- **Language-aware Web Components** — The navbar, alerts, and buttons respond to language changes with built-in `ar`/`ur`/`en` translations.
- **Glass morphism aesthetic** — Frosted glass effects with iOS-inspired motion ("Rukn Motion").
- **Zero dependencies** — Pure CSS + optional vanilla JS Web Components. ~30KB gzipped total.
- **150+ design tokens** — W3C-compliant `--r-` prefix. Colors, spacing, typography, shadows, motion.
- **Dark & Light themes** — Single class toggle. Tokens adapt automatically.
- **Accessible** — WCAG 2.1 AA, `prefers-reduced-motion` support, ARIA labels in all components.

## Quick Start

### For Arabic / RTL applications

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تطبيقي مع ركن</title>
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
</head>
<body>
  <div class="ds-container" style="padding: 2rem;">
    <h1>مرحبا بركن</h1>
    <button class="btn-primary">ابدأ الآن</button>
    <div class="ds-card" style="margin-top: 1rem; padding: 1.5rem;">
      <h3>بطاقة زجاجية</h3>
      <p>مع تأثيرات الزجاج المذهلة</p>
    </div>
  </div>
</body>
</html>
```

### For English / LTR applications

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App with Rukn</title>
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
</head>
<body>
  <div class="ds-container" style="padding: 2rem;">
    <h1>Hello Rukn</h1>
    <button class="btn-primary">Get Started</button>
    <div class="ds-card" style="margin-top: 1rem; padding: 1.5rem;">
      <h3>Glass Card</h3>
      <p>With stunning glass morphism effects.</p>
    </div>
  </div>
</body>
</html>
```

### Install via npm

```bash
npm install @ruknds/core
```

```js
// Import in your bundler
import '@ruknds/core/styles/design-system-variables.css';
import '@ruknds/core/styles/design-system.css';
```

### Or copy the files

```bash
git clone https://github.com/mfaizanatiq/RuknDesignSystem.git
# Copy the styles/ folder to your project — that's it
```

## Components

Rukn provides **30+ component families** as CSS classes. No JavaScript required.

```html
<!-- Buttons -->
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-outline">Outline</button>

<!-- Cards with Glass Effect -->
<div class="ds-card">
  <h3>Card Title</h3>
  <p>Content with glass morphism</p>
</div>

<!-- Form Inputs -->
<input type="text" class="ds-input" placeholder="Enter text">
<textarea class="ds-textarea" placeholder="Message"></textarea>

<!-- Badges -->
<span class="ds-badge ds-badge-primary">New</span>
<span class="ds-badge ds-badge-success">Active</span>
```

**[See all components](./components.html)** | **[Starter template](./starter-template.html)**

### Web Components (optional)

Layer in vanilla JS Web Components for interactive behavior:

```html
<script src="components/rukn-navbar.js" defer></script>
<script src="components/rukn-ui.js" type="module"></script>

<!-- Navbar with built-in language switcher (en/ar/ur) -->
<rukn-navbar current="home"></rukn-navbar>

<!-- Interactive components -->
<rukn-button variant="primary">Click Me</rukn-button>
<rukn-card>Content here</rukn-card>
<rukn-alert variant="info" title="Note">This is an alert</rukn-alert>
```

## Design Tokens

150+ W3C-compliant CSS custom properties with `--r-` prefix:

```css
/* Typography — including Arabic and Urdu */
--r-font-heading: 'Space Grotesk', sans-serif;
--r-font-body: 'Space Grotesk', sans-serif;
--r-font-arabic: 'IBM Plex Sans Arabic', sans-serif;
--r-font-urdu: 'Noto Nastaliq Urdu', serif;

/* Urdu-specific line heights (Nastaliq needs more space) */
--r-line-height-urdu-base: 1.75;
--r-line-height-urdu-heading: 1.5;

/* Rukn Motion — iOS-inspired easing */
--r-ease-ios-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--r-spring-smooth: cubic-bezier(0.5, 1.25, 0.75, 1);
--r-spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Spacing (4px grid) */
--r-space-1: 0.25rem;   /* 4px */
--r-space-4: 1rem;      /* 16px */
--r-space-8: 2rem;      /* 32px */
```

**Full token reference:** [foundation.html](./foundation.html) | [docs/DESIGN_TOKENS.md](./docs/DESIGN_TOKENS.md)

## Theme System

Dark theme is default (optimized for glass morphism). Toggle with a single class:

```html
<!-- Dark theme (default) -->
<html lang="ar" dir="rtl" class="dark">

<!-- Light theme -->
<html lang="ar" dir="rtl">
```

```javascript
// Toggle programmatically
document.documentElement.classList.toggle('dark');
```

## RTL & Multilingual Support

Rukn's RTL support is built into the foundation, not bolted on:

- **Automatic font switching** — `:lang(ar)` and `:lang(ur)` CSS selectors apply the correct font family
- **RTL layout rules** — Flexbox, grid, and spacing adapt to `dir="rtl"` automatically
- **Language-aware Web Components** — `<rukn-navbar>` ships with full English, Arabic, and Urdu translations
- **Runtime language switching** — Dispatch `rukn:languagechange` event to update all components at once

See [docs/RTL_GUIDE.md](./docs/RTL_GUIDE.md) for the complete multilingual development guide.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Documentation

- **[Integration Guide](./INTEGRATION_GUIDE.md)** — Setup for React, Vue, Angular, Svelte, Next.js, Vite
- **[Web Components Reference](./WEB_COMPONENTS_COMPLETE.md)** — All custom elements and their APIs
- **[Design Tokens](./docs/DESIGN_TOKENS.md)** — Complete token reference
- **[RTL Guide](./docs/RTL_GUIDE.md)** — Building multilingual apps with Rukn
- **[Component API](./docs/COMPONENT_API.md)** — All component classes and attributes

## Contributing

We welcome contributions, especially translations and RTL improvements. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, RTL testing guidelines, and how to add translations.

## Author

**M Faizan Atiq**
- [LinkedIn](https://www.linkedin.com/in/mfaizanatiq/)
- [GitHub](https://github.com/mfaizanatiq)

## License

MIT License — see [LICENSE](./LICENSE) for details. Use it anywhere, modify it freely.

---

<div align="center">

**Built on the pillar of language.**

[GitHub](https://github.com/mfaizanatiq/RuknDesignSystem) | [Live Demo](https://rukn.design) | [Report Issues](https://github.com/mfaizanatiq/RuknDesignSystem/issues)

</div>
