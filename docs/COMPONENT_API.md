# Component API Reference

Complete reference for all Rukn Design System CSS classes and Web Component attributes.

## CSS Component Classes

### Buttons

| Class | Description |
|-------|-------------|
| `btn-primary` | Primary action button |
| `btn-secondary` | Secondary action button |
| `btn-outline` | Outlined button |
| `btn-ghost` | Ghost/transparent button |
| `btn-destructive` | Destructive/danger button |
| `btn-sm` | Small size modifier |
| `btn-lg` | Large size modifier |

### Form Inputs

| Class | Description |
|-------|-------------|
| `ds-input` | Text input field |
| `ds-textarea` | Multi-line text input |
| `ds-checkbox` | Checkbox input (wrap in `ds-checkbox-wrapper`) |
| `ds-switch` | Toggle switch (wrap in `ds-switch-wrapper`) |
| `ds-select` | Select dropdown |

### Cards & Surfaces

| Class | Description |
|-------|-------------|
| `ds-card` | Card surface with glass morphism |
| `ds-glass` | Glass morphism effect on any element |

### Badges

| Class | Description |
|-------|-------------|
| `ds-badge` | Base badge class |
| `ds-badge-primary` | Primary colored badge |
| `ds-badge-success` | Success/green badge |
| `ds-badge-warning` | Warning/yellow badge |
| `ds-badge-destructive` | Destructive/red badge |
| `ds-badge-neutral` | Neutral/gray badge |

### Feedback

| Class | Description |
|-------|-------------|
| `ds-alert` | Alert container |
| `ds-spinner` | Loading spinner |
| `ds-progress` | Progress bar |
| `ds-toast` | Toast notification |

### Layout

| Class | Description |
|-------|-------------|
| `ds-container` | Max-width content container |
| `ds-grid` | CSS grid container |
| `ds-grid-cols-1` through `ds-grid-cols-4` | Grid column counts |
| `ds-md-grid-cols-2` | Responsive grid (medium breakpoint) |
| `ds-lg-grid-cols-3` | Responsive grid (large breakpoint) |
| `ds-flex` | Flexbox container |

### Navigation

| Class | Description |
|-------|-------------|
| `ds-navbar` | Navigation bar |
| `ds-sidebar` | Sidebar navigation |
| `ds-breadcrumb` | Breadcrumb navigation |
| `ds-tabs` | Tab navigation |
| `ds-pagination` | Pagination controls |

### Data Display

| Class | Description |
|-------|-------------|
| `ds-table` | Table styling |
| `ds-avatar` | Avatar component |
| `ds-accordion` | Accordion/collapsible sections |
| `ds-dropdown` | Dropdown menu |
| `ds-empty-state` | Empty state placeholder |

---

## Web Components

### `<rukn-navbar>`

Navigation bar with built-in dark mode toggle, language switcher, and mobile menu.

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `current` | `"home" \| "foundation" \| "components"` | — | Active page indicator |
| `search` | `boolean` | `false` | Show search button |
| `logo-src` | `string` | — | Logo image source |
| `logo-alt` | `string` | — | Logo alt text |
| `brand-text` | `string` | `"Rukn"` | Brand text |
| `brand-href` | `string` | `"/"` | Brand link URL |
| `show-brand-text` | `boolean` | `true` | Show/hide brand text |
| `logo-only` | `boolean` | `false` | Show only logo |
| `text-only` | `boolean` | `false` | Show only text |

**Events dispatched:**
- `rukn:languagechange` — When language is switched (detail: `{ language: "ar" | "ur" | "en" }`)
- `rukn:themechange` — When dark/light mode is toggled

### `<rukn-button>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | `"primary"` | Button style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `icon` | `string` | — | Lucide icon name |

### `<rukn-card>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `glass` | `boolean` | `false` | Enable glass morphism variant |

### `<rukn-badge>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `"primary" \| "success" \| "warning" \| "destructive" \| "neutral"` | `"primary"` | Badge color variant |

### `<rukn-alert>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "destructive"` | `"info"` | Alert type |
| `title` | `string` | — | Alert title |
| `dismissible` | `boolean` | `false` | Show close button |

### `<rukn-spinner>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Spinner size |
| `variant` | `string` | — | Color variant |

### `<rukn-progress>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | `0` | Progress percentage (0-100) |
| `variant` | `string` | — | Color variant |
| `indeterminate` | `boolean` | `false` | Indeterminate loading state |

### `<rukn-modal>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `modal-id` | `string` | — | Unique identifier for the modal |
| `title` | `string` | — | Modal title |

### `<rukn-sidebar>`

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `"foundation" \| "components"` | — | Sidebar content variant |

---

## JavaScript API

### Color System

```javascript
// Set primary color at runtime (persists to localStorage)
window.ruknSetPrimaryColor('#FF4154');
window.ruknSetPrimaryColor('#FF4154', false); // don't persist

// Get current primary color
const color = window.ruknGetPrimaryColor();
// → { hex: '#FF4154', hsl: { h: 352, s: 100, l: 63 } }

// Color conversion utilities
window.ruknHexToHsl('#FF4154');
window.ruknHslToHexString(352, 100, 63);
```

### Modal/Drawer Helpers

```javascript
import { openModal, closeModal, openDrawer, closeDrawer } from '@ruknds/core/helpers';

openModal('my-modal');
closeModal('my-modal');
openDrawer('my-drawer');
closeDrawer('my-drawer');
```
