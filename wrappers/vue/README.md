# @ruknds/vue

Vue 3 wrappers for [Rukn Design System](https://github.com/mfaizanatiq/RuknDesignSystem) — the first modern design system built for Arabic, Urdu, and multilingual applications.

## Install

```bash
npm install @ruknds/vue @ruknds/core
```

## Setup

```ts
// main.ts
import { createApp } from 'vue';
import { RuknPlugin } from '@ruknds/vue';
import '@ruknds/core/styles/design-system-variables.css';
import '@ruknds/core/styles/design-system.css';

const app = createApp(App);

// Option A: Register all components globally
app.use(RuknPlugin);

// Option B: Import individual components in your SFCs
app.mount('#app');
```

## Usage

```vue
<script setup lang="ts">
import { RuknButton, RuknCard, RuknNavbar, useRuknLanguage } from '@ruknds/vue';

const lang = useRuknLanguage();
const isRTL = computed(() => ['ar', 'ur'].includes(lang.value));
</script>

<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'" :lang="lang">
    <RuknNavbar current="home" brand-text="My App" show-brand-text text-only />

    <main style="padding: 2rem">
      <RuknCard>
        <h2>{{ lang === 'ar' ? 'مرحبا بالعالم' : 'Hello World' }}</h2>
        <RuknButton variant="primary" @click="alert('Clicked!')">
          {{ lang === 'ar' ? 'انقر هنا' : 'Click Here' }}
        </RuknButton>
      </RuknCard>
    </main>
  </div>
</template>
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
| `RuknNavbar` | `current`, `search`, `logo-src`, `brand-text`, `show-brand-text`, `text-only` |
| `RuknSidebar` | `position`, `open` |
| `RuknFooter` | `variant` |

## Composables

### `useRuknLanguage()`

Returns a reactive `ref<string>` with the current language (`'en'`, `'ar'`, `'ur'`). Updates automatically when the navbar language switcher is used.

### `useRuknTheme()`

Returns a reactive `ref<boolean>` — `true` when dark mode is active.

## Plugin vs Tree-shaking

**`RuknPlugin`** registers all 12 components globally — convenient for prototyping.

For production, import only what you need:

```vue
<script setup>
import { RuknButton, RuknCard } from '@ruknds/vue';
</script>
```

## Custom Element Resolution

If you're using Vite, add this to `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('rukn-'),
        },
      },
    }),
  ],
});
```

## License

MIT
