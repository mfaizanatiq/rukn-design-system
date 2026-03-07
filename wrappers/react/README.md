# @ruknds/react

React wrappers for [Rukn Design System](https://github.com/mfaizanatiq/RuknDesignSystem) — the first modern design system built for Arabic, Urdu, and multilingual applications.

## Install

```bash
npm install @ruknds/react @ruknds/core
```

## Setup

```tsx
// main.tsx or App.tsx
import '@ruknds/core/styles/design-system-variables.css';
import '@ruknds/core/styles/design-system.css';
```

## Usage

```tsx
import { RuknButton, RuknCard, RuknNavbar, useRuknLanguage } from '@ruknds/react';

function App() {
  const lang = useRuknLanguage();

  return (
    <div dir={['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr'} lang={lang}>
      <RuknNavbar current="home" brandText="My App" showBrandText textOnly />

      <main style={{ padding: '2rem' }}>
        <RuknCard>
          <h2>{lang === 'ar' ? 'مرحبا بالعالم' : 'Hello World'}</h2>
          <RuknButton variant="primary" onClick={() => alert('Clicked!')}>
            {lang === 'ar' ? 'انقر هنا' : 'Click Here'}
          </RuknButton>
        </RuknCard>
      </main>
    </div>
  );
}
```

## Components

| Component | Props |
|-----------|-------|
| `RuknButton` | `variant`, `size`, `disabled`, `loading` |
| `RuknBadge` | `variant` |
| `RuknCard` | `variant` |
| `RuknAlert` | `variant`, `title`, `dismissible` |
| `RuknSpinner` | `size`, `variant` |
| `RuknProgress` | `value`, `variant`, `label` |
| `RuknModal` | `open`, `title`, `size` |
| `RuknInput` | `type`, `placeholder`, `disabled`, `error` |
| `RuknIcon` | `name`, `size` |
| `RuknNavbar` | `current`, `search`, `logoSrc`, `brandText`, `showBrandText`, `textOnly` |
| `RuknSidebar` | `position`, `open` |
| `RuknFooter` | `variant` |

## Hooks

### `useRuknLanguage()`

Returns the current Rukn language (`'en'`, `'ar'`, or `'ur'`). Automatically updates when the navbar language switcher is used.

### `useRuknTheme()`

Returns `true` when dark mode is active. Reacts to theme toggle changes.

## How it works

These are thin wrappers around Rukn's vanilla Web Components. They:

1. Map camelCase React props to kebab-case DOM attributes
2. Handle boolean attributes correctly
3. Provide full TypeScript types with autocompletion
4. Forward refs to the underlying custom element

No Shadow DOM, no virtual DOM overhead — just standard Web Components with React ergonomics.

## License

MIT
