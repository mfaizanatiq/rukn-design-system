# RTL & Multilingual Guide

How to build Arabic, Urdu, and multilingual applications with Rukn Design System.

## Quick Setup

### Arabic (RTL)

```html
<html lang="ar" dir="rtl" class="dark">
<head>
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

### Urdu (RTL with Nastaliq)

```html
<html lang="ur" dir="rtl" class="dark">
<head>
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

### English (LTR)

```html
<html lang="en" class="dark">
```

That's it. Rukn handles the rest automatically.

## How It Works

### Automatic Font Switching

Rukn uses CSS `:lang()` selectors to apply the correct font family:

```css
:lang(ar), .arabic-text {
  font-family: var(--r-font-arabic); /* IBM Plex Sans Arabic */
}

:lang(ur), .urdu-text {
  font-family: var(--r-font-urdu); /* Noto Nastaliq Urdu */
  line-height: var(--r-line-height-urdu-base); /* 1.75 — Nastaliq needs more space */
}
```

You don't need to manually switch fonts. Set `lang="ar"` or `lang="ur"` on the `<html>` element and the tokens take over.

### Typography Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--r-font-arabic` | IBM Plex Sans Arabic | Arabic UI text |
| `--r-font-urdu` | Noto Nastaliq Urdu | Urdu Nastaliq calligraphy |
| `--r-line-height-urdu-base` | 1.75 | Urdu body text (Nastaliq requires more vertical space) |
| `--r-line-height-urdu-heading` | 1.5 | Urdu headings |
| `--r-line-height-urdu-body` | 1.8 | Urdu long-form text |

### RTL Layout

When `dir="rtl"` is set on the `<html>` element:

- Flexbox and grid layouts reverse direction automatically
- Padding, margins, and borders adapt via Rukn's RTL CSS rules
- The navbar, sidebar, and all components flip correctly
- Icons with directional meaning (arrows, chevrons) should be mirrored — use CSS `transform: scaleX(-1)` or provide RTL-specific icons

### Language-Aware Web Components

The `<rukn-navbar>` component includes a built-in language switcher:

```html
<rukn-navbar current="home"></rukn-navbar>
```

This renders a dropdown with English, Arabic (العربية), and Urdu (اردو). Selecting a language:

1. Sets `lang` and `dir` on the `<html>` element
2. Dispatches a `rukn:languagechange` custom event
3. All Rukn Web Components update their labels automatically
4. The selection persists to `localStorage`

### Runtime Language Switching

To switch language programmatically:

```javascript
// Switch to Arabic
document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';
document.dispatchEvent(new CustomEvent('rukn:languagechange', {
  detail: { language: 'ar' }
}));
```

All `<rukn-*>` components listen for this event and update their translations.

## Bidirectional Text

For pages with mixed Arabic and English content, use the `dir` attribute on individual elements:

```html
<div dir="rtl" lang="ar">
  <h2>اسم المنتج</h2>
  <p>وصف المنتج بالعربية مع <span dir="ltr" lang="en">Brand Name</span> المميز</p>
</div>
```

## Number Formatting

Arabic locales may use Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩). Use JavaScript's `Intl.NumberFormat` for locale-aware number display:

```javascript
const price = 29.99;

// English
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
// → "$29.99"

// Arabic (Saudi)
new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(price);
// → "٢٩٫٩٩ ر.س."
```

## Adding Translations

Translations live in `components/rukn-navbar.js` in the `DEFAULT_TRANSLATIONS` object. See [CONTRIBUTING.md](../CONTRIBUTING.md#translation-contributions) for details on adding or correcting translations.

## CSS Logical Properties

When contributing new components, prefer CSS logical properties for RTL compatibility:

| Physical (avoid) | Logical (prefer) |
|-------------------|-------------------|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `left: 0` | `inset-inline-start: 0` |
| `border-left` | `border-inline-start` |
