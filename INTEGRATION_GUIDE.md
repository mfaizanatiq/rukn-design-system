# 🚀 Rukn Design System - Integration Guide

**Get started in 2 minutes!** This guide will help you integrate Rukn into your project quickly and easily.

---

## ⚡ Quick Start (30 Seconds)

### Step 1: Copy Files
Download and copy these folders to your project:
```
your-project/
  ├── styles/
  │   ├── design-system-variables.css
  │   └── design-system.css
  └── components/ (optional - only if using Web Components)
      ├── rukn-navbar.js
      ├── rukn-footer.js
      ├── rukn-sidebar.js
      └── rukn-ui.js
```

### Step 2: Create Your HTML File
Copy this starter template:

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App with Rukn</title>
  
  <!-- Rukn Design System (Required) -->
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
  
  <!-- Optional: Phosphor Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
  
  <div class="ds-container" style="padding: 2rem;">
    <h1>Hello Rukn! 🏛️</h1>
    
    <!-- Try some components -->
    <button class="btn-primary">Primary Button</button>
    <button class="btn-secondary">Secondary Button</button>
    
    <div class="ds-card" style="margin-top: 2rem; padding: 1.5rem;">
      <h3>Beautiful Glass Card</h3>
      <p>This is using Rukn's glass morphism design.</p>
    </div>
    
    <!-- Theme toggle button -->
    <button onclick="toggleTheme()" class="btn-outline" style="margin-top: 2rem;">
      Toggle Light/Dark Theme
    </button>
  </div>
  
  <script>
    // Simple theme toggle function
    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
    }
    
    // Remember user's theme preference
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark');
    }
  </script>
  
</body>
</html>
```

**That's it!** Open in your browser and you'll see the beautiful dark theme by default. 🎉

---

## 🎨 Theme System

### Default Theme: Dark (Beautiful) ✨
Rukn uses a stunning dark theme by default with:
- Glass morphism effects
- Subtle gradients
- High contrast for readability
- Modern, premium look

### Light Theme Available
Simply remove the `dark` class from the `<html>` tag:

```html
<!-- Dark theme (default) -->
<html lang="en" class="dark">

<!-- Light theme -->
<html lang="en">
```

### Toggle Between Themes

#### Option 1: Simple JavaScript Toggle
```html
<button onclick="document.documentElement.classList.toggle('dark')">
  Toggle Theme
</button>
```

#### Option 2: With LocalStorage (Remembers User Preference)
```javascript
function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  
  // Save preference
  const theme = html.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

// Load saved preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
});
```

#### Option 3: Respect System Preference
```javascript
// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply on load
if (prefersDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
```

---

## 🧩 Using Components

### CSS Components (No JavaScript Required)

#### Buttons
```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-outline">Outline</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-destructive">Delete</button>

<!-- Sizes -->
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
```

#### Form Inputs
```html
<input type="text" class="ds-input" placeholder="Enter text">
<textarea class="ds-textarea" placeholder="Message"></textarea>
<select class="ds-select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Cards
```html
<div class="ds-card">
  <h3>Card Title</h3>
  <p>Beautiful glass morphism card with blur effects.</p>
  <button class="btn-primary">Action</button>
</div>
```

#### Form Controls
```html
<!-- Checkbox -->
<label class="ds-checkbox-wrapper">
  <input type="checkbox" class="ds-checkbox">
  <span>Accept terms</span>
</label>

<!-- Radio -->
<label class="ds-radio-wrapper">
  <input type="radio" class="ds-radio" name="option">
  <span>Option 1</span>
</label>

<!-- Switch -->
<label class="ds-switch-wrapper">
  <input type="checkbox" class="ds-switch">
  <span>Enable feature</span>
</label>
```

#### Badges
```html
<span class="ds-badge ds-badge-primary">New</span>
<span class="ds-badge ds-badge-success">Active</span>
<span class="ds-badge ds-badge-warning">Beta</span>
<span class="ds-badge ds-badge-error">Error</span>
```

### Layout System

#### Container
```html
<div class="ds-container">
  <!-- Content centered, max-width 1280px -->
</div>

<!-- Different sizes -->
<div class="ds-container ds-container-sm">Narrow</div>
<div class="ds-container ds-container-lg">Wide</div>
```

#### Grid
```html
<!-- 3 columns -->
<div class="ds-grid ds-grid-cols-3 ds-gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Responsive: 1 col mobile, 2 col tablet, 3 col desktop -->
<div class="ds-grid ds-grid-cols-1 ds-md-grid-cols-2 ds-lg-grid-cols-3 ds-gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Flexbox
```html
<div class="ds-flex ds-justify-between ds-items-center ds-flex-gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## 🌐 Web Components (Optional)

For navigation and complex components, use our Web Components:

### Step 1: Include Scripts
```html
<head>
  <!-- CSS (Required) -->
  <link rel="stylesheet" href="styles/design-system-variables.css">
  <link rel="stylesheet" href="styles/design-system.css">
  
  <!-- Web Components (Optional) -->
  <script src="components/rukn-navbar.js" defer></script>
  <script src="components/rukn-footer.js" defer></script>
  <script src="components/rukn-ui.js" type="module"></script>
</head>
```

### Step 2: Use Custom Elements
```html
<body>
  <rukn-navbar current="home"></rukn-navbar>
  
  <main>
    <h1>Your content</h1>
    <rukn-button variant="primary">Click me</rukn-button>
  </main>
  
  <rukn-footer></rukn-footer>
</body>
```

**Benefits:**
- ✅ Works in React, Vue, Angular, Svelte, or vanilla HTML
- ✅ Zero dependencies
- ✅ Only ~3KB gzipped
- ✅ Native browser standard

---

## 🔧 Framework Integration

### React
```jsx
import './styles/design-system-variables.css';
import './styles/design-system.css';

function App() {
  return (
    <div className="ds-container">
      <button className="btn-primary">React Button</button>
      <input className="ds-input" placeholder="Type here" />
    </div>
  );
}
```

### Vue
```vue
<template>
  <div class="ds-container">
    <button class="btn-primary">Vue Button</button>
    <input class="ds-input" placeholder="Type here" />
  </div>
</template>

<style>
@import './styles/design-system-variables.css';
@import './styles/design-system.css';
</style>
```

### Next.js
```javascript
// app/layout.js or pages/_app.js
import '../styles/design-system-variables.css';
import '../styles/design-system.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
```

### Angular
In `angular.json`:
```json
{
  "styles": [
    "src/styles/design-system-variables.css",
    "src/styles/design-system.css"
  ]
}
```

### Vite
```javascript
// main.js
import './styles/design-system-variables.css';
import './styles/design-system.css';
```

---

## 🎨 Customization

### Override Colors
Create a custom CSS file after Rukn's CSS:

```css
/* custom-theme.css */
:root {
  --primary: 280 100% 70%;  /* Purple instead of red */
  --accent: 180 80% 50%;    /* Cyan accent */
}

.dark {
  --primary: 280 100% 75%;  /* Lighter purple for dark mode */
}
```

```html
<link rel="stylesheet" href="styles/design-system-variables.css">
<link rel="stylesheet" href="styles/design-system.css">
<link rel="stylesheet" href="custom-theme.css">
```

### Override Typography
```css
:root {
  --r-font-heading: 'Your Font', sans-serif;
  --r-font-body: 'Your Body Font', sans-serif;
}
```

### Override Border Radius
```css
:root {
  --r-radius-lg: 1rem;  /* More rounded */
}
```

### View All Design Tokens
Open `foundation.html` in your browser to see all customizable tokens with a live color picker!

---

## 📱 Responsive Design

All Rukn components are mobile-first and responsive by default. Use these breakpoints:

```css
/* Mobile first (default) */
.my-element { width: 100%; }

/* Tablet and up (768px+) */
@media (min-width: 768px) {
  .my-element { width: 50%; }
}

/* Desktop and up (1024px+) */
@media (min-width: 1024px) {
  .my-element { width: 33.333%; }
}
```

Or use Rukn's responsive grid:
```html
<div class="ds-grid ds-grid-cols-1 ds-md-grid-cols-2 ds-lg-grid-cols-3">
  <!-- Automatically responsive -->
</div>
```

---

## ♿ Accessibility

Rukn includes built-in accessibility features:
- ✅ Respects `prefers-reduced-motion`
- ✅ WCAG 2.1 AA compliant color contrast
- ✅ Focus visible styles
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support

---

## 🐛 Troubleshooting

### Styles not working?
1. ✅ Check file paths are correct
2. ✅ Load `design-system-variables.css` BEFORE `design-system.css`
3. ✅ Verify CSS files loaded (check browser DevTools Network tab)
4. ✅ Clear browser cache

### Colors look wrong?
1. ✅ Make sure you're using HSL format: `--primary: 352 95% 58%;`
2. ✅ Don't use `hsl()` wrapper or hex colors
3. ✅ Apply with `hsl(var(--primary))` in your CSS

### Theme toggle not working?
1. ✅ Check that `dark` class is being added/removed from `<html>`
2. ✅ Verify no CSS conflicts overriding theme variables
3. ✅ Open DevTools and inspect the `<html>` element

### Need more help?
- 📖 Read the full [README.md](./README.md)
- 🧩 See [components.html](./components.html) for live examples
- 🎨 View [foundation.html](./foundation.html) for design tokens
- 🐛 [Report issues](https://github.com/mfaizanatiq/RuknDesignSystem/issues) on GitHub

---

## 📊 What You Get

| Feature | Included | Size |
|---------|----------|------|
| 🎨 150+ Design Tokens | ✅ | Included in CSS |
| 🪟 Glass Morphism | ✅ | Included in CSS |
| 📱 Responsive Layout | ✅ | Included in CSS |
| 🎯 UI Components | ✅ | Included in CSS |
| 🧩 Web Components | Optional | +3KB |
| ⚡ Total Bundle | CSS + JS | ~30KB gzipped |

---

## 🎯 Next Steps

1. ✅ Copy the starter template above
2. ✅ Customize the primary color if needed
3. ✅ Explore components in `components.html`
4. ✅ Check design tokens in `foundation.html`
5. ✅ Build something beautiful! 🚀

---

## 💡 Pro Tips

- **Start Simple:** Use CSS components first, add Web Components later if needed
- **Dark by Default:** The dark theme is optimized for glass morphism
- **Customize Early:** Override colors at the start to match your brand
- **Use Tokens:** Reference design tokens (`--r-space-4`) instead of hardcoding values
- **Mobile First:** Design for mobile, then enhance for desktop

---

**Ready to build?** Copy the starter template and start creating! 🏛️

Need inspiration? Check out [components.html](./components.html) for dozens of examples.

---

<div align="center">

**Built with ❤️ for designers and engineers**

[GitHub](https://github.com/mfaizanatiq/RuknDesignSystem) • [Documentation](./README.md) • [Live Demo](https://rukn.design)

</div>

