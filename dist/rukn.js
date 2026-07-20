/* Rukn Design System v2.2.0 | MIT License | https://rukn.design */
(function (global) {
  'use strict';

// ── rukn-ui.js ──
/**
 * Rukn UI - Complete Web Component Library
 * 100% Vanilla JavaScript - Zero Dependencies
 * 
 * Size: ~15KB minified, ~5KB gzipped
 * Browser Support: Chrome 67+, Firefox 63+, Safari 10.1+, Edge 79+
 * 
 * Usage:
 *   <script src="components/rukn-ui.js" type="module"></script>
 *   
 *   <!-- Then use components -->
 *   <rukn-button variant="primary">Click Me</rukn-button>
 *   <rukn-card>
 *     <h3>Card Title</h3>
 *     <p>Card content</p>
 *   </rukn-card>
 * 
 * Works in: Vanilla HTML, React, Vue, Angular, Svelte, and any framework
 * 
 * NOTE: Layout components (navbar, sidebar, footer) are separate files.
 * Import them individually if needed:
 *   <script src="components/rukn-navbar.js"></script>
 *   <script src="components/rukn-sidebar.js"></script>
 *   <script src="components/rukn-footer.js"></script>
 */

/* ========================================
   COLOR SYSTEM UTILITIES
   ======================================== */

const PRIMARY_COLOR_STORAGE_KEY = 'rukn-primary-color';

/**
 * Moves the host's original children into the <slot> position (light DOM).
 * Slots only work in Shadow DOM; without it, setting innerHTML wipes children.
 * Call after setting innerHTML: pass the host and the childNodes captured before.
 */
function ruknApplySlotContent(host, savedChildren) {
  if (!savedChildren || savedChildren.length === 0) return;
  const slot = host.querySelector('slot');
  if (!slot) return;
  const parent = slot.parentNode;
  savedChildren.forEach((n) => parent.insertBefore(n, slot));
  slot.remove();
}

function ruknHexToHsl(hex) {
  const sanitized = hex.replace('#', '');
  if (sanitized.length !== 6) {
    return { h: 0, s: 100, l: 50 };
  }
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      default:
        h = (rNorm - gNorm) / d + 4;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function ruknHslToHexString(hslString) {
  const [hStr, sStr, lStr] = hslString.split(' ');
  const h = parseFloat(hStr);
  const s = parseFloat(sStr);
  const l = parseFloat(lStr);

  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (h >= 0 && h < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (h < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (h < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (h < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (h < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);

  const toHex = (value) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function ruknComputeForeground(l) {
  return l > 72 ? '0 0% 12%' : '0 0% 98%';
}

function ruknShiftHue(h, shift) {
  const newHue = (h + shift) % 360;
  return newHue < 0 ? newHue + 360 : newHue;
}

function ruknApplyPrimaryColor(hex, persist = false) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;
  const { h, s, l } = ruknHexToHsl(hex);
  const primaryHsl = `${h} ${s}% ${l}%`;
  root.style.setProperty('--primary', primaryHsl);
  root.style.setProperty('--primary-foreground', ruknComputeForeground(l));
  if (body) {
    body.style.setProperty('--primary', primaryHsl);
    body.style.setProperty('--primary-foreground', ruknComputeForeground(l));
  }

  const accentHue = ruknShiftHue(h, 20);
  const accentLight = Math.min(96, l + 15);
  const accentSat = Math.max(25, s - 10);
  root.style.setProperty('--accent', `${accentHue} ${accentSat}% ${accentLight}%`);
  root.style.setProperty('--accent-foreground', ruknComputeForeground(accentLight));
  if (body) {
    body.style.setProperty('--accent', `${accentHue} ${accentSat}% ${accentLight}%`);
    body.style.setProperty('--accent-foreground', ruknComputeForeground(accentLight));
  }

  const ringLight = Math.min(98, l + 18);
  root.style.setProperty('--ring', `${h} ${s}% ${ringLight}%`);
  if (body) {
    body.style.setProperty('--ring', `${h} ${s}% ${ringLight}%`);
  }

  if (persist) {
    try {
      window.localStorage.setItem(PRIMARY_COLOR_STORAGE_KEY, hex);
    } catch {
      // localStorage unavailable — color not persisted
    }
  }
}

if (typeof window !== 'undefined') {
  try {
    const storedColor = window.localStorage.getItem(PRIMARY_COLOR_STORAGE_KEY);
    if (storedColor) {
      ruknApplyPrimaryColor(storedColor, false);
    }
  } catch {
    // localStorage unavailable — use default color
  }

  window.ruknSetPrimaryColor = (hex, persist = true) => {
    ruknApplyPrimaryColor(hex, persist);
  };

  window.ruknGetPrimaryColor = () => {
    if (typeof document === 'undefined') {
      return { hex: '#ff4154', hsl: '352 95% 58%' };
    }
    const root = document.documentElement;
    const currentHsl = getComputedStyle(root).getPropertyValue('--primary').trim();
    return {
      hex: ruknHslToHexString(currentHsl),
      hsl: currentHsl
    };
  };
}

/* ========================================
   BUTTON COMPONENT
   ======================================== */

class RuknButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
  }

  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    this._langChangeHandler = () => {
      if (this.hasAttribute('loading')) {
        this._applyTranslations();
      }
    };
    document.addEventListener('rukn:languagechange', this._langChangeHandler);
    this.render();
  }

  disconnectedCallback() {
    document.removeEventListener('rukn:languagechange', this._langChangeHandler);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');
    const icon = this.getAttribute('icon');

    const classes = [
      `btn-${variant}`,
      `btn-${size}`,
      loading ? 'btn-loading' : ''
    ].filter(Boolean).join(' ');

    this.innerHTML = `
      <button class="${classes}" ${disabled ? 'disabled' : ''}>
        ${icon ? `<i class="${icon}" style="margin-right: 8px;"></i>` : ''}
        ${loading ? '<span data-i18n="component.button.loading" style="display: none;">Loading...</span>' : ''}
        <slot></slot>
      </button>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));

    if (loading) {
      this._applyTranslations();
    }
  }
  
  _applyTranslations() {
    const lang = document.documentElement.lang || 'en';
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : {};
    const fallback = translations.en || {};
    const current = translations[lang] || fallback;
    
    this.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = current[key] ?? fallback[key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });
  }
}

if (!customElements.get('rukn-button')) {
  customElements.define('rukn-button', RuknButton);
}

/* ========================================
   BADGE COMPONENT
   ======================================== */

class RuknBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
  }

  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'neutral';

    this.innerHTML = `
      <span class="ds-badge ds-badge-${variant}">
        <slot></slot>
      </span>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));
  }
}

if (!customElements.get('rukn-badge')) {
  customElements.define('rukn-badge', RuknBadge);
}

/* ========================================
   CARD COMPONENT
   ======================================== */

class RuknCard extends HTMLElement {
  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    const glass = this.hasAttribute('glass');
    const className = glass ? 'ds-glass' : 'ds-card';

    this.innerHTML = `
      <div class="${className}">
        <slot></slot>
      </div>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));
  }
}

if (!customElements.get('rukn-card')) {
  customElements.define('rukn-card', RuknCard);
}

/* ========================================
   ALERT COMPONENT
   ======================================== */

class RuknAlert extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'dismissible'];
  }

  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'info';
    const title = this.getAttribute('title') || '';
    const dismissible = this.hasAttribute('dismissible');

    const icons = {
      info: 'ℹ',
      success: '✓',
      warning: '⚠',
      error: '✕',
      destructive: '✕'
    };

    this.innerHTML = `
      <div class="ds-alert ds-alert-${variant}">
        <div class="ds-alert-icon">${icons[variant]}</div>
        <div class="ds-alert-content">
          ${title ? `<div class="ds-alert-title">${title}</div>` : ''}
          <div class="ds-alert-description">
            <slot></slot>
          </div>
        </div>
        ${dismissible ? '<button class="ds-alert-close" data-i18n-aria-label="component.alert.close" aria-label="Close">✕</button>' : ''}
      </div>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));

    if (dismissible) {
      const closeBtn = this.querySelector('.ds-alert-close');
      closeBtn?.addEventListener('click', () => {
        this.style.animation = 'ds-fade-in 0.2s ease-out reverse';
        setTimeout(() => this.remove(), 200);
      });
      this._applyTranslations(closeBtn);
    }
    
    this._applyTranslations();
  }
  
  _applyTranslations(element = null) {
    const lang = document.documentElement.lang || 'en';
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : {};
    const fallback = translations.en || {};
    const current = translations[lang] || fallback;
    
    const target = element || this;
    target.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (!key) return;
      const value = current[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });
  }
}

if (!customElements.get('rukn-alert')) {
  customElements.define('rukn-alert', RuknAlert);
}

/* ========================================
   SPINNER COMPONENT
   ======================================== */

class RuknSpinner extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'variant'];
  }
  
  connectedCallback() {
    this.render();
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  render() {
    const size = this.getAttribute('size') || '';
    const variant = this.getAttribute('variant') || 'primary';
    
    const classes = [
      'ds-spinner',
      size ? `ds-spinner-${size}` : '',
      variant !== 'primary' ? `ds-spinner-${variant}` : ''
    ].filter(Boolean).join(' ');
    
    this.innerHTML = `<div class="${classes}"></div>`;
  }
}

if (!customElements.get('rukn-spinner')) {
  customElements.define('rukn-spinner', RuknSpinner);
}

/* ========================================
   PROGRESS COMPONENT
   ======================================== */

class RuknProgress extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'variant', 'indeterminate'];
  }
  
  connectedCallback() {
    this.render();
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  render() {
    const value = parseInt(this.getAttribute('value') || '0');
    const variant = this.getAttribute('variant') || '';
    const indeterminate = this.hasAttribute('indeterminate');
    
    const classes = [
      'ds-progress',
      variant ? `ds-progress-${variant}` : '',
      indeterminate ? 'ds-progress-indeterminate' : ''
    ].filter(Boolean).join(' ');
    
    this.innerHTML = `
      <div class="${classes}">
        <div class="ds-progress-bar" style="width: ${indeterminate ? '40%' : value + '%'}"></div>
      </div>
    `;
  }
  
  // Helper method to update progress
  setValue(value) {
    this.setAttribute('value', value);
  }
}

if (!customElements.get('rukn-progress')) {
  customElements.define('rukn-progress', RuknProgress);
}

/* ========================================
   MODAL COMPONENT
   ======================================== */

class RuknModal extends HTMLElement {
  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    this._langChangeHandler = () => {
      this._applyTranslations();
    };
    document.addEventListener('rukn:languagechange', this._langChangeHandler);

    const id = this.getAttribute('modal-id') || 'modal';
    const title = this.getAttribute('title') || '';

    this.innerHTML = `
      <div class="ds-modal-overlay" id="${id}-overlay" style="display: none;"></div>
      <div class="ds-modal" id="${id}" style="display: none;">
        <div class="ds-modal-content ds-modal-scroll">
          ${title ? `
          <div class="ds-modal-header ds-modal-header-left">
            <h3 class="ds-modal-title">${title}</h3>
          </div>
          ` : ''}
          <div>
            <slot></slot>
          </div>
        </div>
        <button class="ds-modal-close" data-i18n-aria-label="component.modal.close" aria-label="Close" onclick="this.closest('rukn-modal').close()">✕</button>
      </div>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));

    this._applyTranslations();
  }

  disconnectedCallback() {
    document.removeEventListener('rukn:languagechange', this._langChangeHandler);
  }
  
  _applyTranslations() {
    const lang = document.documentElement.lang || 'en';
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : {};
    const fallback = translations.en || {};
    const current = translations[lang] || fallback;
    
    this.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (!key) return;
      const value = current[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });
  }
  
  open() {
    const modal = this.querySelector('.ds-modal');
    const overlay = this.querySelector('.ds-modal-overlay');
    
    if (modal && overlay) {
      modal.style.display = 'flex';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }
  
  close() {
    const modal = this.querySelector('.ds-modal');
    const overlay = this.querySelector('.ds-modal-overlay');
    
    if (modal && overlay) {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
}

if (!customElements.get('rukn-modal')) {
  customElements.define('rukn-modal', RuknModal);
}

/* ========================================
   INPUT COMPONENT
   ======================================== */

class RuknInput extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'type', 'value', 'disabled'];
  }
  
  connectedCallback() {
    this.render();
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  render() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';
    const value = this.getAttribute('value') || '';
    const disabled = this.hasAttribute('disabled');
    
    this.innerHTML = `
      <input 
        type="${type}" 
        class="ds-input" 
        placeholder="${placeholder}"
        value="${value}"
        ${disabled ? 'disabled' : ''}
      >
    `;
  }
  
  get value() {
    return this.querySelector('input')?.value || '';
  }
  
  set value(val) {
    const input = this.querySelector('input');
    if (input) input.value = val;
  }
}

if (!customElements.get('rukn-input')) {
  customElements.define('rukn-input', RuknInput);
}

/* ========================================
   ICON PLACEHOLDER COMPONENT
   ======================================== */

class RuknIcon extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'circle'];
  }

  connectedCallback() {
    this._originalSlotContent = Array.from(this.childNodes).map(n => n.cloneNode(true));
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || '';
    const size = this.getAttribute('size') || 'md';
    const circle = this.hasAttribute('circle');

    const classes = [
      'ds-icon-placeholder',
      size ? `ds-icon-placeholder-${size}` : '',
      variant ? `ds-icon-placeholder-${variant}` : '',
      circle ? 'ds-icon-placeholder-circle' : ''
    ].filter(Boolean).join(' ');

    this.innerHTML = `
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
    ruknApplySlotContent(this, (this._originalSlotContent || []).map(n => n.cloneNode(true)));
  }
}

if (!customElements.get('rukn-icon')) {
  customElements.define('rukn-icon', RuknIcon);
}

if (typeof window !== 'undefined') {
  window.ruknComponents = {
    ...(window.ruknComponents || {}),
    RuknButton,
    RuknBadge,
    RuknCard,
    RuknAlert,
    RuknSpinner,
    RuknProgress,
    RuknModal,
    RuknInput,
    RuknIcon
  };
}

// Export for convenience (if used as module)


// ── rukn-footer.js ──
/**
 * Rukn Footer - Web Component
 * 100% Vanilla JavaScript - No frameworks
 * SEO-Friendly: Uses semantic HTML5 footer with proper navigation and structured content
 * 
 * Usage:
 *   <rukn-footer></rukn-footer>
 */

class RuknFooter extends HTMLElement {
  connectedCallback() {
    // SEO: Set semantic role
    this.setAttribute('role', 'contentinfo');
    this.setAttribute('aria-label', 'Footer');
    
    this.innerHTML = `
      <footer role="contentinfo" style="padding: var(--r-space-12) var(--r-space-6); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="ds-container">
          <div style="margin-bottom: var(--r-space-6);">
            <div style="font-size: var(--r-font-size-2xl); font-weight: var(--r-font-weight-bold); margin-bottom: var(--r-space-2);">
              <span style="color: hsl(var(--primary));" aria-hidden="true">◆</span> 
              <span data-i18n="footer.brand">Rukn Design System</span>
            </div>
            <p class="arabic-text" style="color: hsl(var(--foreground) / 0.6);" lang="ar" aria-label="Rukn in Arabic">رُكن</p>
          </div>
          
          <nav aria-label="Footer navigation" style="display: flex; justify-content: center; gap: var(--r-space-6); margin-bottom: var(--r-space-6); flex-wrap: wrap;">
            <a href="index.html" data-i18n-title="nav.home" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.home">Home</span></a>
            <a href="foundation.html" data-i18n-title="nav.foundation" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.foundation">Foundation</span></a>
            <a href="components.html" data-i18n-title="nav.components" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.components">Components</span></a>
            <a href="index.html#pricing" data-i18n-title="nav.pricing" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.pricing">Pricing</span></a>
            <a href="index.html#roadmap" data-i18n-title="nav.roadmap" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.roadmap">Roadmap</span></a>
            <a href="index.html#about" data-i18n-title="nav.about" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.about">About</span></a>
            <a href="https://www.linkedin.com/in/mfaizanatiq/" target="_blank" rel="noopener noreferrer" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.linkedin">LinkedIn</span></a>
            <a href="https://github.com/mfaizanatiq/RuknDesignSystem" target="_blank" rel="noopener noreferrer" data-i18n-title="nav.github" style="color: hsl(var(--foreground) / 0.7); text-decoration: none; transition: color var(--r-transition-fast);"><span data-i18n="footer.nav.github">GitHub</span></a>
          </nav>
          
          <p style="color: hsl(var(--foreground) / 0.5); font-size: var(--r-font-size-sm);">
            <span data-i18n="footer.built">Built with ❤️ for designers and developers everywhere</span>
          </p>
          
          <p style="color: hsl(var(--foreground) / 0.4); font-size: var(--r-font-size-xs); margin-top: var(--r-space-4);">
            <span data-i18n="footer.license" data-i18n-replace="{year}">MIT Licensed • Open Source Forever • © ${new Date().getFullYear()} Rukn Design System</span>
          </p>
        </div>
      </footer>
    `;
    
    // Apply translations after rendering
    this._applyTranslations();
    
    // Listen for language changes
    document.addEventListener('rukn:languagechange', () => {
      this._applyTranslations();
    });
  }
  
  _applyTranslations() {
    const lang = document.documentElement.lang || 'en';
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : {};
    const fallback = translations.en || {};
    const current = translations[lang] || fallback;
    
    this.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      let value = current[key] ?? fallback[key];
      if (value && el.hasAttribute('data-i18n-replace')) {
        const replace = el.getAttribute('data-i18n-replace');
        if (replace === '{year}') {
          value = value.replace('{year}', new Date().getFullYear());
        }
      }
      if (value !== undefined) {
        el.textContent = value;
      }
    });
    
    this.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (!key) return;
      const value = current[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('title', value);
      }
    });
  }
}

if (!customElements.get('rukn-footer')) {
  customElements.define('rukn-footer', RuknFooter);
}

if (typeof window !== 'undefined') {
  window.ruknComponents = {
    ...(window.ruknComponents || {}),
    RuknFooter
  };
}


// ── rukn-navbar.js ──
/**
 * Rukn Navbar - Web Component
 * 100% Vanilla JavaScript - No frameworks, no dependencies
 * SEO-Friendly: Uses semantic HTML5 nav element with proper ARIA labels
 * 
 * Usage:
 *   <rukn-navbar current="home"></rukn-navbar>
 *   <rukn-navbar current="components" search></rukn-navbar>
 *   <rukn-navbar logo-src="path/to/logo.svg" brand-text="My Brand" brand-href="/"></rukn-navbar>
 * 
 * Attributes:
 *   current        - Active page (home|foundation|components)
 *   search         - Show search bar (boolean attribute)
 *   logo-src       - Path to custom logo image/SVG (default: uses inline Rukn logo)
 *   logo-alt       - Alt text for logo (default: "Rukn Design System Logo")
 *   brand-text     - Brand name text (default: "Rukn")
 *   brand-href     - Brand link URL (default: "index.html")
 *   brand-title    - Brand link title attribute (default: "Rukn Design System - Homepage")
 *   show-brand-text - Show brand text next to logo (default: false, logo-only mode)
 *   logo-only      - Alias for show-brand-text="false" (logo-only mode)
 *   logo-wide      - In logo-only mode, stretch logo to match logo+text width (boolean attribute)
 *   text-only      - Show only text, no logo (boolean attribute)
 */

const RUKN_LANGUAGE_STORAGE_KEY = 'rukn-language';
const RUKN_DARK_MODE_STORAGE_KEY = 'rukn-dark-mode';
const RUKN_SUPPORTED_LANGUAGES = ['en', 'ar', 'ur'];
const RUKN_RTL_LANGUAGES = ['ar', 'ur'];

// Native language names (always shown in their own language)
const RUKN_NATIVE_LANGUAGE_NAMES = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو'
};

const DEFAULT_TRANSLATIONS = {
  en: {
    'language.en': 'English',
    'language.ar': 'Arabic',
    'language.ur': 'Urdu',
    'nav.home': 'Home',
    'nav.foundation': 'Foundation',
    'nav.components': 'Components',
    'nav.pricing': 'Pricing',
    'nav.roadmap': 'Roadmap',
    'nav.about': 'About',
    'nav.github': 'GitHub',
    'nav.darkMode': 'Dark Mode',
    'nav.lightMode': 'Light Mode',
    'index.hero.name': '<strong>Rukn</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'Talk to AI.',
    'index.hero.heading.secondary': 'It builds the rest.',
    'index.hero.message': 'Rukn is AI-ready — structured tokens, predictable class names, and Web Components agents understand. Describe your screen. Ship production UI on our primitives. RTL, Arabic, and Urdu included.',
    'index.hero.subtext': 'Open source. MIT licensed. Built for agents and the developers who ship with them.',
    'index.hero.cta.primary': 'Explore Primitives',
    'index.hero.cta.secondary': 'View on GitHub',
    'index.hero.cta.demo': 'See Demo',
    'index.stats.tokens': 'Design Tokens',
    'index.stats.components': 'Components',
    'index.stats.dependencies': 'Dependencies',
    'index.stats.customizable': 'Customizable',
    'index.section.pricing.title': 'Pricing',
    'index.section.pricing.plan': 'Free',
    'index.section.pricing.subtitle': 'Open source forever',
    'index.section.pricing.body': 'Building the world\'s most modern, open-source design system. MIT licensed, free forever.',
    'index.section.pricing.cta.primary': 'Start Building',
    'foundation.page.title': 'Foundation',
    'foundation.page.subtitle': 'Design tokens, typography, spacing, and layout systems that power Rukn',
    'foundation.badge.tokens': '150+ Design Tokens',
    'foundation.badge.compliant': 'W3C Compliant',
    'foundation.badge.layout': 'Layout Systems',
    'foundation.colors.title': 'Colors',
    'foundation.colors.description': 'Semantic color tokens for consistent theming',
    'components.page.title': 'UI Components',
    'components.page.subtitle': 'Production-ready components with glass morphism and Rukn Motion',
    'components.badge.count': '20+ Components',
    'components.badge.morphism': 'Glass Morphism',
    'components.badge.copy': 'Copy & Paste',
    'components.buttons.title': 'Buttons',
    'components.buttons.description': '7 variants with multiple sizes and states',
    'footer.brand': 'Rukn Design System',
    'footer.built': 'Built with ❤️ for designers and developers everywhere',
    'footer.license': 'MIT Licensed • Open Source Forever • © {year} Rukn Design System',
    'footer.nav.home': 'Home',
    'footer.nav.foundation': 'Foundation',
    'footer.nav.components': 'Components',
    'footer.nav.pricing': 'Pricing',
    'footer.nav.roadmap': 'Roadmap',
    'footer.nav.about': 'About',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'GitHub',
    'sidebar.foundation.title': 'Foundation',
    'sidebar.foundation.colors': 'Colors',
    'sidebar.foundation.typography': 'Typography',
    'sidebar.foundation.spacing': 'Spacing',
    'sidebar.foundation.sizes': 'Sizes',
    'sidebar.foundation.radius': 'Border Radius',
    'sidebar.foundation.surfaces': 'Surfaces',
    'sidebar.foundation.shadows': 'Shadows',
    'sidebar.foundation.borders': 'Border Widths',
    'sidebar.foundation.motion': 'Rukn Motion',
    'sidebar.foundation.layouts': 'Layouts',
    'sidebar.foundation.container': 'Container',
    'sidebar.foundation.grid': 'Grid System',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'Responsive',
    'sidebar.foundation.viewComponents': 'View Components',
    'sidebar.foundation.backHome': 'Back to Home',
    'sidebar.components.title': 'UI Components',
    'sidebar.components.buttons': 'Buttons',
    'sidebar.components.inputs': 'Inputs',
    'sidebar.components.checkbox': 'Checkbox',
    'sidebar.components.radio': 'Radio Group',
    'sidebar.components.switch': 'Switch',
    'sidebar.components.slider': 'Slider',
    'sidebar.components.formfield': 'Form Field',
    'sidebar.components.iconPlaceholder': 'Icon Placeholders',
    'sidebar.components.card': 'Card',
    'sidebar.components.badge': 'Badges',
    'sidebar.components.modal': 'Modal',
    'sidebar.components.drawer': 'Drawer',
    'sidebar.components.navbar': 'Navbar',
    'sidebar.components.feedback': 'Feedback',
    'sidebar.components.tooltip': 'Tooltip',
    'sidebar.components.alert': 'Alert',
    'sidebar.components.toast': 'Toast',
    'sidebar.components.progress': 'Progress',
    'sidebar.components.spinner': 'Spinner',
    'sidebar.components.effects': 'Effects',
    'sidebar.components.glass': 'Glass Morphism',
    'sidebar.components.viewFoundation': 'View Foundation',
    'sidebar.components.backHome': 'Back to Home',
    'sidebar.toggle': 'Toggle sidebar',
    'component.alert.close': 'Close',
    'component.modal.close': 'Close',
    'component.button.loading': 'Loading...',
    'component.input.placeholder': 'Enter text',
    'component.textarea.placeholder': 'Enter message'
  },
  ar: {
    'language.en': 'الإنجليزية',
    'language.ar': 'العربية',
    'language.ur': 'الأردية',
    'nav.home': 'الرئيسية',
    'nav.foundation': 'الأساس',
    'nav.components': 'المكوّنات',
    'nav.pricing': 'التسعير',
    'nav.roadmap': 'خارطة الطريق',
    'nav.about': 'من نحن',
    'nav.github': 'GitHub',
    'nav.darkMode': 'الوضع الداكن',
    'nav.lightMode': 'الوضع الفاتح',
    'index.hero.name': '<strong>ركن</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'تحدّث مع الذكاء الاصطناعي.',
    'index.hero.heading.secondary': 'وهو يبني الباقي.',
    'index.hero.message': 'رُكن جاهز للذكاء الاصطناعي — رموز منظمة، أسماء فئات متوقعة، ومكوّنات ويب يفهمها الوكلاء. صِف شاشتك. أطلق واجهة إنتاجية على أساسياتنا. دعم RTL والعربية والأردية مدمج.',
    'index.hero.subtext': 'مفتوح المصدر. ترخيص MIT. مبني للوكلاء والمطورين الذين يطلقون معهم.',
    'index.hero.cta.primary': 'استكشف الأساسيات',
    'index.hero.cta.secondary': 'عرض على GitHub',
    'index.hero.cta.demo': 'شاهد العرض',
    'index.stats.tokens': 'رموز التصميم',
    'index.stats.components': 'المكوّنات',
    'index.stats.dependencies': 'بدون تبعيات',
    'index.stats.customizable': 'قابل للتخصيص بالكامل',
    'index.section.pricing.title': 'التسعير',
    'index.section.pricing.plan': 'مجاني',
    'index.section.pricing.subtitle': 'مفتوح المصدر إلى الأبد',
    'index.section.pricing.body': 'نبني أحدث منظومة تصميم مفتوحة المصدر في العالم. ترخيص MIT، مجانية إلى الأبد.',
    'index.section.pricing.cta.primary': 'ابدأ البناء',
    'foundation.page.title': 'الأساس',
    'foundation.page.subtitle': 'رموز التصميم، الطباعة، المسافات، وأنظمة التخطيط التي تدعم ركن',
    'foundation.badge.tokens': 'أكثر من 150 رمز تصميم',
    'foundation.badge.compliant': 'متوافق مع W3C',
    'foundation.badge.layout': 'أنظمة التخطيط',
    'foundation.colors.title': 'الألوان',
    'foundation.colors.description': 'رموز لونية دلالية لثيمات متناسقة',
    'components.page.title': 'مكوّنات واجهة المستخدم',
    'components.page.subtitle': 'مكوّنات جاهزة للإنتاج بزجاج مورفي وحركة ركن',
    'components.badge.count': 'أكثر من 20 مكوّن',
    'components.badge.morphism': 'زجاج مورفي',
    'components.badge.copy': 'انسخ والصق',
    'components.buttons.title': 'الأزرار',
    'components.buttons.description': '7 أنواع متعددة الأحجام والحالات',
    'footer.brand': 'نظام تصميم ركن',
    'footer.built': 'مبني بـ ❤️ للمصممين والمطورين في كل مكان',
    'footer.license': 'ترخيص MIT • مفتوح المصدر إلى الأبد • © {year} نظام تصميم ركن',
    'footer.nav.home': 'الرئيسية',
    'footer.nav.foundation': 'الأساس',
    'footer.nav.components': 'المكوّنات',
    'footer.nav.pricing': 'التسعير',
    'footer.nav.roadmap': 'خارطة الطريق',
    'footer.nav.about': 'من نحن',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'GitHub',
    'sidebar.foundation.title': 'الأساس',
    'sidebar.foundation.colors': 'الألوان',
    'sidebar.foundation.typography': 'الطباعة',
    'sidebar.foundation.spacing': 'المسافات',
    'sidebar.foundation.sizes': 'الأحجام',
    'sidebar.foundation.radius': 'نصف قطر الحدود',
    'sidebar.foundation.surfaces': 'الأسطح',
    'sidebar.foundation.shadows': 'الظلال',
    'sidebar.foundation.borders': 'عرض الحدود',
    'sidebar.foundation.motion': 'حركة ركن',
    'sidebar.foundation.layouts': 'التخطيطات',
    'sidebar.foundation.container': 'الحاوية',
    'sidebar.foundation.grid': 'نظام الشبكة',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'متجاوب',
    'sidebar.foundation.viewComponents': 'عرض المكوّنات',
    'sidebar.foundation.backHome': 'العودة للرئيسية',
    'sidebar.components.title': 'مكوّنات واجهة المستخدم',
    'sidebar.components.buttons': 'الأزرار',
    'sidebar.components.inputs': 'الحقول',
    'sidebar.components.checkbox': 'مربع الاختيار',
    'sidebar.components.radio': 'مجموعة الراديو',
    'sidebar.components.switch': 'المفتاح',
    'sidebar.components.slider': 'المنزلق',
    'sidebar.components.formfield': 'حقل النموذج',
    'sidebar.components.iconPlaceholder': 'رموز العناصر النائبة',
    'sidebar.components.card': 'البطاقة',
    'sidebar.components.badge': 'الشارات',
    'sidebar.components.modal': 'النافذة المنبثقة',
    'sidebar.components.drawer': 'الدرج',
    'sidebar.components.navbar': 'شريط التنقل',
    'sidebar.components.feedback': 'التعليقات',
    'sidebar.components.tooltip': 'تلميح',
    'sidebar.components.alert': 'تنبيه',
    'sidebar.components.toast': 'إشعار',
    'sidebar.components.progress': 'التقدم',
    'sidebar.components.spinner': 'الدوار',
    'sidebar.components.effects': 'التأثيرات',
    'sidebar.components.glass': 'زجاج مورفي',
    'sidebar.components.viewFoundation': 'عرض الأساس',
    'sidebar.components.backHome': 'العودة للرئيسية',
    'sidebar.toggle': 'تبديل الشريط الجانبي',
    'component.alert.close': 'إغلاق',
    'component.modal.close': 'إغلاق',
    'component.button.loading': 'جاري التحميل...',
    'component.input.placeholder': 'أدخل النص',
    'component.textarea.placeholder': 'أدخل الرسالة',
    'fileManager.title': 'مدير الملفات',
    'fileManager.close': 'إغلاق مدير الملفات',
    'fileManager.save': 'حفظ الحالي',
    'fileManager.savedFiles': 'الملفات المحفوظة',
    'fileManager.noFiles': 'لا توجد ملفات محفوظة بعد',
    'fileManager.load': 'تحميل',
    'fileManager.delete': 'حذف'
  },
  ur: {
    'language.en': 'انگریزی',
    'language.ar': 'عربی',
    'language.ur': 'اردو',
    'nav.home': 'ہوم',
    'nav.foundation': 'بنیادیں',
    'nav.components': 'اجزاء',
    'nav.pricing': 'قیمتیں',
    'nav.roadmap': 'روڈ میپ',
    'nav.about': 'ہمارے بارے میں',
    'nav.github': 'گٹ ہب',
    'nav.darkMode': 'ڈارک موڈ',
    'nav.lightMode': 'لائٹ موڈ',
    'index.hero.name': '<strong>Rukn</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'AI سے بات کریں۔',
    'index.hero.heading.secondary': 'باقی وہ بنا دے گا۔',
    'index.hero.message': 'رکن AI-ready ہے — منظم ٹوکنز، متوقع کلاس نام، اور ویب کمپوننٹس جو ایجنٹس سمجھتے ہیں۔ اپنی سکرین بیان کریں۔ ہمارے پرائمٹیوز پر پروڈکشن UI شپ کریں۔ RTL، عربی، اور اردو شامل ہیں۔',
    'index.hero.subtext': 'اوپن سورس۔ MIT لائسنس۔ ایجنٹس اور ان ڈویلپرز کے لیے بنایا گیا جو ان کے ساتھ شپ کرتے ہیں۔',
    'index.hero.cta.primary': 'پرائمٹیوز دیکھیں',
    'index.hero.cta.secondary': 'GitHub پر دیکھیں',
    'index.hero.cta.demo': 'ڈیمو دیکھیں',
    'index.stats.tokens': 'ڈیزائن ٹوکنز',
    'index.stats.components': 'اجزاء',
    'index.stats.dependencies': 'انحصارات',
    'index.stats.customizable': 'مکمل طور پر حسبِ ضرورت',
    'index.section.pricing.title': 'قیمتیں',
    'index.section.pricing.plan': 'مفت',
    'index.section.pricing.subtitle': 'ہمیشہ کے لیے اوپن سورس',
    'index.section.pricing.body': 'دنیا کا جدید ترین اوپن سورس ڈیزائن سسٹم۔ MIT لائسنس، ہمیشہ مفت۔',
    'index.section.pricing.cta.primary': 'تعمیر شروع کریں',
    'foundation.page.title': 'بنیاد',
    'foundation.page.subtitle': 'ڈیزائن ٹوکنز، ٹائپوگرافی، اسپیسنگ اور لے آؤٹ سسٹمز جو رکن کو طاقت دیتے ہیں',
    'foundation.badge.tokens': '150+ ڈیزائن ٹوکنز',
    'foundation.badge.compliant': 'W3C کے مطابق',
    'foundation.badge.layout': 'لے آؤٹ سسٹمز',
    'foundation.colors.title': 'رنگ',
    'foundation.colors.description': 'سیمینٹک کلر ٹوکنز جو تھیم کو مستقل رکھتے ہیں',
    'components.page.title': 'یو آئی اجزاء',
    'components.page.subtitle': 'پروڈکشن کے لیے تیار اجزاء، گلاس مورفزم اور رکن موشن کے ساتھ',
    'components.badge.count': '20+ اجزاء',
    'components.badge.morphism': 'گلاس مورفزم',
    'components.badge.copy': 'کاپی اور پیسٹ',
    'components.buttons.title': 'بٹن',
    'components.buttons.description': '7 اقسام مختلف سائز اور حالتوں کے ساتھ',
    'footer.brand': 'رکن ڈیزائن سسٹم',
    'footer.built': 'ڈیزائنرز اور ڈویلپرز کے لیے ❤️ سے بنایا گیا',
    'footer.license': 'MIT لائسنس • ہمیشہ کے لیے اوپن سورس • © {year} رکن ڈیزائن سسٹم',
    'footer.nav.home': 'ہوم',
    'footer.nav.foundation': 'بنیادیں',
    'footer.nav.components': 'اجزاء',
    'footer.nav.pricing': 'قیمتیں',
    'footer.nav.roadmap': 'روڈ میپ',
    'footer.nav.about': 'ہمارے بارے میں',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'گٹ ہب',
    'sidebar.foundation.title': 'بنیاد',
    'sidebar.foundation.colors': 'رنگ',
    'sidebar.foundation.typography': 'ٹائپوگرافی',
    'sidebar.foundation.spacing': 'اسپیسنگ',
    'sidebar.foundation.sizes': 'سائز',
    'sidebar.foundation.radius': 'بارڈر ریڈیئس',
    'sidebar.foundation.surfaces': 'سطحیں',
    'sidebar.foundation.shadows': 'سایے',
    'sidebar.foundation.borders': 'بارڈر کی چوڑائی',
    'sidebar.foundation.motion': 'رکن موشن',
    'sidebar.foundation.layouts': 'لے آؤٹس',
    'sidebar.foundation.container': 'کنٹینر',
    'sidebar.foundation.grid': 'گرڈ سسٹم',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'ریسپانسیو',
    'sidebar.foundation.viewComponents': 'اجزاء دیکھیں',
    'sidebar.foundation.backHome': 'ہوم پر واپس',
    'sidebar.components.title': 'یو آئی اجزاء',
    'sidebar.components.buttons': 'بٹن',
    'sidebar.components.inputs': 'ان پٹس',
    'sidebar.components.checkbox': 'چیک باکس',
    'sidebar.components.radio': 'ریڈیو گروپ',
    'sidebar.components.switch': 'سوئچ',
    'sidebar.components.slider': 'سلائیڈر',
    'sidebar.components.formfield': 'فارم فیلڈ',
    'sidebar.components.iconPlaceholder': 'آئیکن پلیس ہولڈرز',
    'sidebar.components.card': 'کارڈ',
    'sidebar.components.badge': 'بیجز',
    'sidebar.components.modal': 'موڈل',
    'sidebar.components.drawer': 'ڈرائر',
    'sidebar.components.navbar': 'نیویگیشن بار',
    'sidebar.components.feedback': 'فیڈ بیک',
    'sidebar.components.tooltip': 'ٹول ٹپ',
    'sidebar.components.alert': 'الرٹ',
    'sidebar.components.toast': 'ٹوسٹ',
    'sidebar.components.progress': 'پروگریس',
    'sidebar.components.spinner': 'اسپنر',
    'sidebar.components.effects': 'ایفیکٹس',
    'sidebar.components.glass': 'گلاس مورفزم',
    'sidebar.components.viewFoundation': 'بنیاد دیکھیں',
    'sidebar.components.backHome': 'ہوم پر واپس',
    'sidebar.toggle': 'سائیڈ بار کو ٹوگل کریں',
    'component.alert.close': 'بند کریں',
    'component.modal.close': 'بند کریں',
    'component.button.loading': 'لوڈ ہو رہا ہے...',
    'component.input.placeholder': 'متن درج کریں',
    'component.textarea.placeholder': 'پیغام درج کریں'
  }
};

if (typeof window !== 'undefined') {
  if (!window.ruknTranslations) {
    window.ruknTranslations = {};
  }
  Object.keys(DEFAULT_TRANSLATIONS).forEach((lang) => {
    window.ruknTranslations[lang] = {
      ...DEFAULT_TRANSLATIONS[lang],
      ...(window.ruknTranslations[lang] || {})
    };
  });
}

class RuknNavbar extends HTMLElement {
  connectedCallback() {
    // Auto-detect current page from URL if not provided
    let current = this.getAttribute('current') || '';
    if (!current) {
      const path = window.location.pathname;
      const filename = path.split('/').pop() || 'index.html';
      if (filename === 'index.html' || filename === '' || filename.endsWith('/')) {
        current = 'home';
      } else if (filename === 'foundation.html') {
        current = 'foundation';
      } else if (filename === 'components.html') {
        current = 'components';
      }
      // Set the attribute for consistency
      if (current) {
        this.setAttribute('current', current);
      }
    }
    const hasSearch = this.hasAttribute('search');
    
    // Customization attributes
    const logoSrc = this.getAttribute('logo-src');
    const logoAlt = this.getAttribute('logo-alt') || 'Rukn Design System Logo';
    const brandText = this.getAttribute('brand-text') || 'Rukn';
    const brandHref = this.getAttribute('brand-href') || 'index.html';
    const brandTitle = this.getAttribute('brand-title') || 'Rukn Design System - Homepage';
    
    // Display mode: logo-only (default), logo+text, or text-only
    const textOnly = this.hasAttribute('text-only');
    const showBrandText = this.hasAttribute('show-brand-text') || this.hasAttribute('logo-text');
    const logoOnly = !showBrandText && !textOnly; // Default to logo-only
    const logoWide = this.hasAttribute('logo-wide'); // Wide/stretched logo in logo-only mode
    
    // SEO: Set semantic role
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Main navigation');
    
    const dropdownId = `navDropdown-${this._uid}`;
    const toggleId = `navToggle-${this._uid}`;
    const languageSelectIdDesktop = `navLanguage-${this._uid}`;
    const languageSelectIdMobile = `navLanguageMobile-${this._uid}`;

    // Determine logo size and class based on display mode
    let logoSize, logoClass;
    if (logoOnly && logoWide) {
      // Wide logo - stretched to match logo+text width
      logoSize = 'auto';
      logoClass = 'ds-navbar-logo ds-navbar-logo-wide';
    } else if (logoOnly) {
      // Compact logo-only - 32px
      logoSize = '32';
      logoClass = 'ds-navbar-logo ds-navbar-logo-large';
    } else {
      // Logo with text - 24px
      logoSize = '24';
      logoClass = 'ds-navbar-logo';
    }
    
    // Default Rukn logo SVG (inline) - Simplified version
    // For wide logo, use height only and let width be auto
    const logoSvgWidth = logoWide && logoOnly ? '' : `width="${logoSize}"`;
    const logoSvgHeight = logoWide && logoOnly ? 'height="32"' : `height="${logoSize}"`;
    const defaultLogoSvg = `<svg width="${logoWide && logoOnly ? 'auto' : logoSize}" ${logoSvgHeight} viewBox="0 0 662 182" fill="none" xmlns="http://www.w3.org/2000/svg" class="${logoClass}" aria-hidden="true">
      <path d="M161.055 143.174C161.035 110.939 161.015 79.0921 160.994 47.2456C160.99 40.9316 161.671 40.4115 169.842 40.4181C182.507 40.4283 195.172 40.4319 207.838 40.4266C217.143 40.4226 217.613 40.7805 217.619 48.1848C217.635 67.9918 217.465 87.8001 217.711 107.605C217.901 122.936 238.938 132.441 256.007 124.934C264.207 121.328 268.997 115.671 269.031 108.139C269.125 87.8145 269.063 67.4897 269.068 47.165C269.069 41.218 270.059 40.4451 277.691 40.4437C291.189 40.4411 304.688 40.4329 318.187 40.4567C324.364 40.4676 325.581 41.3706 325.583 46.0882C325.604 89.4565 325.605 132.825 325.588 176.193C325.586 180.549 324.147 181.708 319.006 181.692C305.009 181.649 291.012 181.597 277.015 181.53C269.976 181.496 269.018 180.739 269.02 175.149C269.023 161.815 269.085 148.481 269.046 135.147C269.042 133.684 269.729 132.053 268.106 130.703C265.915 131.323 266.029 132.897 265.479 134.178C262.426 141.289 259.969 148.574 255.365 155.236C243.65 172.186 224.763 180.28 200.654 181.417C190.026 181.919 179.33 181.545 168.664 181.549C161.965 181.552 161.074 180.894 161.061 175.797C161.034 165.052 161.055 154.307 161.055 143.174Z" fill="currentColor"/>
      <path d="M553.575 85.6817C553.81 89.9707 553.08 93.9317 554.163 98.0692C556.478 97.0889 556.544 95.686 557.098 94.5278C561.974 84.3459 566.485 74.0374 572.595 64.2543C582.073 49.0785 598.484 41.6725 619.6 40.5835C631.378 39.9761 643.248 40.4848 655.076 40.4005C659.748 40.3672 661.653 42.0517 661.649 45.6083C661.608 89.3512 661.601 133.094 661.675 176.837C661.681 180.379 659.441 181.869 655.322 181.853C640.335 181.796 625.348 181.657 610.362 181.488C606.716 181.448 605.644 179.615 605.661 177.05C605.77 160.486 605.874 143.922 605.871 127.359C605.87 123.485 605.617 119.6 605.188 115.74C604.028 105.302 595.428 98.8531 581.422 97.75C570.615 96.899 558.17 103.571 554.95 111.96C553.944 114.579 553.545 117.253 553.552 119.997C553.6 138.374 553.584 156.752 553.589 175.129C553.59 180.738 552.3 181.716 545.263 181.712C531.606 181.703 517.95 181.73 504.293 181.771C498.953 181.787 497.133 180.219 497.136 175.29C497.151 148.371 497.209 121.452 497.216 94.5338C497.22 78.6156 497.139 62.6974 497.13 46.7792C497.127 41.3878 498.296 40.4873 505.297 40.4711C518.791 40.4397 532.286 40.4379 545.78 40.4506C551.777 40.4562 553.459 41.7449 553.483 46.4696C553.547 59.4112 553.548 72.3531 553.575 85.6817Z" fill="currentColor"/>
      <path d="M69.5052 75.9005C71.7677 70.2902 73.8713 64.9485 77.5616 60.1327C87.4494 47.2288 102.559 41.206 121.462 40.5487C129.447 40.2711 137.46 40.5279 145.457 40.4044C149.868 40.3364 151.783 41.6852 151.724 45.2333C151.559 55.2002 151.802 65.1712 151.632 75.138C151.479 84.0183 146.322 91.0907 137.374 96.3837C128.773 101.471 118.922 103.931 108.023 103.889C101.707 103.865 95.3616 103.357 89.0696 104.237C69.9269 106.914 56.8944 118.683 56.6809 133.823C56.4856 147.674 56.6345 161.528 56.6099 175.38C56.6005 180.663 55.5329 181.543 48.8295 181.559C34.8305 181.591 20.8312 181.583 6.83226 181.548C0.766294 181.532 0.016477 180.914 0.014738 176.052C-0.000765047 132.812 -0.00396952 89.5711 0.00480448 46.3306C0.00584148 41.1906 0.984281 40.4216 7.49066 40.4153C21.3231 40.4018 35.1557 40.4044 48.988 40.4382C55.2909 40.4536 56.5833 41.4585 56.5917 46.3981C56.6229 64.7818 56.6095 83.1655 56.6128 101.549C56.6131 103.34 56.6129 105.13 57.0548 106.97C62.4747 96.9901 65.2583 86.4312 69.5052 75.9005Z" fill="currentColor"/>
      <path d="M334.915 170.35C334.928 115.754 334.943 61.5432 334.957 7.33282C334.959 0.368908 335.422 0.00142914 344.194 0.00315913C357.352 0.00576692 370.509 -0.0148108 383.667 0.0239737C389.554 0.0413272 390.622 0.89489 390.629 5.52999C390.652 22.867 390.674 40.204 390.62 57.5409C390.554 78.9014 378.073 94.8387 355.179 106.171C353.355 107.074 351.431 107.854 349.564 108.704C347.847 109.486 346.142 110.284 344.355 111.111C345.103 112.8 347.167 112.902 348.684 113.497C376.275 124.307 390.35 141.65 390.591 165.696C390.63 169.578 390.611 173.459 390.578 177.34C390.553 180.188 388.712 181.602 384.994 181.592C370.171 181.552 355.348 181.53 340.526 181.525C336.535 181.524 334.771 180.007 334.91 176.947C335.003 174.879 334.92 172.807 334.915 170.35Z" fill="currentColor"/>
      <path d="M447.322 40.4877C459.81 40.4781 471.802 40.448 483.794 40.4709C489.668 40.4821 491.272 42.1962 488.685 46.2221C480.062 59.6431 471.935 73.3126 461.45 85.9188C450.722 98.8177 434.227 105.3 415.329 108.405C410.017 109.277 404.613 109.811 398.499 110.596C407.667 112.854 416.479 113.914 424.884 116.225C441.964 120.92 455.049 129.28 464.092 141.359C472.377 152.425 480.331 163.644 488.27 174.863C491.857 179.931 490.049 181.983 482.647 181.905C468.173 181.754 453.696 181.523 439.224 181.641C434.227 181.681 431.115 180.339 428.844 176.961C414.735 155.977 399.673 135.402 384.425 114.91C382.645 112.518 382.449 110.413 384.3 108.032C400.65 86.9854 415.467 65.2632 431.085 43.894C432.835 41.4999 435.287 40.3698 438.832 40.4874C441.492 40.5756 444.161 40.4947 447.322 40.4877Z" fill="currentColor"/>
    </svg>`;

    // Render logo - use custom logo if provided, otherwise use default SVG
    let logoHtml = '';
    if (!textOnly) {
      if (logoSrc) {
        // Custom logo image
        const imgWidth = logoWide && logoOnly ? '' : `width="${logoSize}"`;
        const imgHeight = logoWide && logoOnly ? 'height="32"' : `height="${logoSize}"`;
        logoHtml = `<img src="${logoSrc}" alt="${logoAlt}" class="${logoClass}" ${imgWidth} ${imgHeight} aria-hidden="true">`;
      } else {
        logoHtml = defaultLogoSvg;
      }
    }
    
    // Render brand text
    const brandTextHtml = (showBrandText || textOnly) 
      ? `<span class="ds-navbar-brand-text">${brandText}</span>`
      : '';

    // Brand class based on mode
    let brandClass = 'ds-navbar-brand';
    if (logoOnly && logoWide) {
      brandClass += ' ds-navbar-brand-logo-only ds-navbar-brand-logo-wide';
    } else if (logoOnly) {
      brandClass += ' ds-navbar-brand-logo-only';
    } else if (textOnly) {
      brandClass += ' ds-navbar-brand-text-only';
    }
    
    this.innerHTML = `
      <nav class="ds-navbar ds-navbar-full" id="navbar-${this._uid}" role="navigation" aria-label="Primary">
        <div class="ds-navbar-container" style="gap: var(--r-space-4);">
          <a href="${brandHref}" class="${brandClass}" title="${brandTitle}" aria-label="${brandText} Home">
            ${logoHtml}
            ${brandTextHtml}
          </a>
          
          ${hasSearch ? `
          <div style="flex: 1; max-width: 600px; position: relative;" role="search">
            <label for="navSearch" class="sr-only">Search documentation</label>
            <i data-lucide="search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: hsl(var(--foreground) / 0.5); font-size: 16px; pointer-events: none;" aria-hidden="true"></i>
            <input 
              type="search" 
              id="navSearch" 
              name="search"
              class="ds-input" 
              placeholder="Quick search..."
              aria-label="Search documentation"
              style="padding: var(--r-space-2) var(--r-space-3) var(--r-space-2) 40px; font-size: var(--r-font-size-sm); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); height: 36px;"
            >
          </div>
          ` : ''}
          
          <nav class="ds-navbar-nav" role="navigation" aria-label="Main menu">
            <div class="ds-navbar-menu">
              <a href="index.html" class="btn-ghost btn-sm ${current === 'home' ? 'active' : ''}" data-i18n="nav.home" ${current === 'home' ? 'aria-current="page"' : ''} title="Home - Rukn Design System">Home</a>
              <a href="foundation.html" class="btn-ghost btn-sm ${current === 'foundation' ? 'active' : ''}" data-i18n="nav.foundation" ${current === 'foundation' ? 'aria-current="page"' : ''} title="Foundation - Design Tokens & System">Foundation</a>
              <a href="components.html" class="btn-ghost btn-sm ${current === 'components' ? 'active' : ''}" data-i18n="nav.components" ${current === 'components' ? 'aria-current="page"' : ''} title="Components - UI Component Library">Components</a>
              <a href="index.html#pricing" class="btn-ghost btn-sm" data-i18n="nav.pricing" title="Pricing - Free & Open Source">Pricing</a>
              <a href="index.html#roadmap" class="btn-ghost btn-sm" data-i18n="nav.roadmap" title="Roadmap - Future Plans">Roadmap</a>
              <a href="index.html#about" class="btn-ghost btn-sm" data-i18n="nav.about" title="About - Our Mission">About</a>
              <a href="https://github.com/mfaizanatiq/RuknDesignSystem" class="btn-primary btn-sm" target="_blank" rel="noopener noreferrer" title="View on GitHub - Open Source Repository" aria-label="View Rukn Design System on GitHub">
                  <i data-lucide="github" style="margin-right: 4px;" aria-hidden="true"></i>
                <span data-i18n="nav.github">GitHub</span>
              </a>
            </div>
            
            <button class="ds-navbar-hamburger" id="${toggleId}" aria-label="Toggle menu" aria-controls="${dropdownId}" aria-expanded="false" aria-haspopup="true">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>

          <div class="ds-navbar-controls" style="display: flex; align-items: center; gap: var(--r-space-2);">
            <!-- Dark Mode Toggle -->
            <div class="ds-theme-toggle" role="group" aria-label="Toggle theme">
              <label class="ds-theme-toggle-wrapper" for="themeToggle-${this._uid}" style="display: flex; align-items: center; gap: var(--r-space-2); cursor: pointer;">
                <input 
                  type="checkbox" 
                  class="ds-switch" 
                  id="themeToggle-${this._uid}"
                  aria-label="Toggle dark mode"
                  style="margin: 0;"
                >
                <span class="ds-theme-toggle-icon" aria-hidden="true" style="font-size: 18px; display: flex; align-items: center;">
                  <i data-lucide="sun" data-theme-icon="light" style="display: none;"></i>
                  <i data-lucide="moon" data-theme-icon="dark"></i>
                </span>
              </label>
            </div>
            
            <!-- Language Switch -->
            <div class="ds-language-switch ds-language-switch-desktop" role="group" aria-label="Select language">
            <label class="sr-only" for="${languageSelectIdDesktop}">Language</label>
            <select class="ds-language-select sr-only" data-device="desktop" id="${languageSelectIdDesktop}" tabindex="-1" aria-hidden="true">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
            <div class="ds-dropdown" data-language-dropdown data-device="desktop">
              <button class="ds-dropdown-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                <span class="ds-dropdown-label">English</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <ul class="ds-dropdown-menu" role="listbox" tabindex="-1">
                <li class="ds-dropdown-option" role="option" data-value="en" tabindex="-1">English</li>
                <li class="ds-dropdown-option" role="option" data-value="ar" tabindex="-1">العربية</li>
                <li class="ds-dropdown-option" role="option" data-value="ur" tabindex="-1">اردو</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </nav>
      
      <div class="ds-navbar-mobile-dropdown" id="${dropdownId}" role="menu" aria-label="Mobile navigation menu" hidden aria-hidden="true">
        <div class="ds-navbar-menu">
          <a href="index.html" class="btn-ghost btn-sm ${current === 'home' ? 'active' : ''}" role="menuitem" ${current === 'home' ? 'aria-current="page"' : ''}><i data-lucide="home" aria-hidden="true"></i> <span data-i18n="nav.home">Home</span></a>
          <a href="foundation.html" class="btn-ghost btn-sm ${current === 'foundation' ? 'active' : ''}" role="menuitem" ${current === 'foundation' ? 'aria-current="page"' : ''}><i data-lucide="box" aria-hidden="true"></i> <span data-i18n="nav.foundation">Foundation</span></a>
          <a href="components.html" class="btn-ghost btn-sm ${current === 'components' ? 'active' : ''}" role="menuitem" ${current === 'components' ? 'aria-current="page"' : ''}><i data-lucide="layers" aria-hidden="true"></i> <span data-i18n="nav.components">Components</span></a>
          <a href="index.html#pricing" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="dollar-sign" aria-hidden="true"></i> <span data-i18n="nav.pricing">Pricing</span></a>
          <a href="index.html#roadmap" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="map" aria-hidden="true"></i> <span data-i18n="nav.roadmap">Roadmap</span></a>
          <a href="index.html#about" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="info" aria-hidden="true"></i> <span data-i18n="nav.about">About</span></a>
          <a href="https://github.com/mfaizanatiq/RuknDesignSystem" class="btn-primary btn-sm" target="_blank" rel="noopener noreferrer" role="menuitem" aria-label="View on GitHub">
            <i data-lucide="github" aria-hidden="true"></i> <span data-i18n="nav.github">GitHub</span>
          </a>
        </div>
        <div class="ds-navbar-controls-mobile" style="display: flex; flex-direction: column; gap: var(--r-space-3); padding: var(--r-space-4); border-top: 1px solid hsl(var(--border));">
          <!-- Dark Mode Toggle Mobile -->
          <div class="ds-theme-toggle" role="group" aria-label="Toggle theme">
            <label class="ds-theme-toggle-wrapper" for="themeToggleMobile-${this._uid}" style="display: flex; align-items: center; gap: var(--r-space-2); cursor: pointer; justify-content: space-between;">
              <span style="display: flex; align-items: center; gap: var(--r-space-2);">
                <span class="ds-theme-toggle-icon" aria-hidden="true" style="font-size: 18px; display: flex; align-items: center;">
                  <i data-lucide="sun" data-theme-icon="light" style="display: none;"></i>
                  <i data-lucide="moon" data-theme-icon="dark"></i>
                </span>
                <span data-i18n="nav.darkMode">Dark Mode</span>
              </span>
              <input 
                type="checkbox" 
                class="ds-switch" 
                id="themeToggleMobile-${this._uid}"
                aria-label="Toggle dark mode"
                style="margin: 0;"
              >
            </label>
          </div>
          
          <!-- Language Switch Mobile -->
          <div class="ds-language-switch ds-language-switch-mobile" role="group" aria-label="Select language">
            <label class="sr-only" for="${languageSelectIdMobile}">Language</label>
            <select class="ds-language-select sr-only" data-device="mobile" id="${languageSelectIdMobile}" tabindex="-1" aria-hidden="true">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
            <div class="ds-dropdown" data-language-dropdown data-device="mobile">
              <button class="ds-dropdown-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                <span class="ds-dropdown-label">English</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <ul class="ds-dropdown-menu" role="listbox" tabindex="-1">
                <li class="ds-dropdown-option" role="option" data-value="en" tabindex="-1">English</li>
                <li class="ds-dropdown-option" role="option" data-value="ar" tabindex="-1">العربية</li>
                <li class="ds-dropdown-option" role="option" data-value="ur" tabindex="-1">اردو</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="ds-navbar-spacer" aria-hidden="true"></div>
    `;
    
    // Initialize mobile menu
    this._initMobileMenu();
    
    // Initialize scroll behavior
    this._initScrollBehavior();

    // Initialize language switch
    this._initLanguageSwitch();
    
    // Initialize dark mode toggle
    this._initDarkModeToggle();

    if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'stroke-width': 1 } });
  }
  
  _initMobileMenu() {
    const toggle = this.querySelector(`#navToggle-${this._uid}`);
    const dropdown = this.querySelector(`#navDropdown-${this._uid}`);
    
    if (toggle && dropdown) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        dropdown.classList.toggle('open');
      });
    }
  }
  
  _initScrollBehavior() {
    const navbar = this.querySelector(`#navbar-${this._uid}`);
    if (!navbar) {
      return;
    }
    
    let ticking = false;
    const scrollThreshold = 50;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Always visible and sticky, just enhance when scrolled
      if (scrollTop > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      ticking = false;
    };
    
    // Initial call to set correct state
    handleScroll();
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    this._cleanupScroll = () => {
      window.removeEventListener('scroll', onScroll);
    };
    
  }
  
  _initLanguageSwitch() {
    const selects = this.querySelectorAll('.ds-language-select');
    const dropdowns = this.querySelectorAll('[data-language-dropdown]');
    if (!selects.length && !dropdowns.length) {
      return;
    }

    const sanitizeLanguage = (value) => {
      if (!value) return 'en';
      const lower = value.toLowerCase();
      const match = RUKN_SUPPORTED_LANGUAGES.find((code) => lower.startsWith(code));
      return match || 'en';
    };

    const closeAllDropdowns = () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.ds-dropdown-trigger');
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    };

    const handleDocumentClick = (event) => {
      if (!this.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    if (this._cleanupLanguageDropdowns) {
      this._cleanupLanguageDropdowns();
    }
    document.addEventListener('click', handleDocumentClick);
    this._cleanupLanguageDropdowns = () => {
      document.removeEventListener('click', handleDocumentClick);
    };

    const applyLanguage = (lang, persist = true) => {
      const normalized = sanitizeLanguage(lang);
      const isRTL = RUKN_RTL_LANGUAGES.includes(normalized);

      document.documentElement.lang = normalized;
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

      if (document.body) {
        document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.body.setAttribute('data-language', normalized);
      }

      this.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

      selects.forEach((select) => {
        if (select.value !== normalized) {
          select.value = normalized;
        }
      });

      this._applyTranslations(normalized);
      this._setDropdownSelection(normalized);
      this._updateLayoutForLanguage(normalized);

      if (persist) {
        try {
          window.localStorage.setItem(RUKN_LANGUAGE_STORAGE_KEY, normalized);
        } catch {
          // localStorage unavailable — preference not persisted
        }
      }

      document.dispatchEvent(new CustomEvent('rukn:languagechange', {
        detail: { language: normalized }
      }));
    };

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector('.ds-dropdown-trigger');
      const options = dropdown.querySelectorAll('.ds-dropdown-option');

      if (trigger) {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          const isOpen = dropdown.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) {
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            if (options.length) options[0].focus({ preventScroll: true });
          }
        });

        trigger.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            trigger.click();
          }
        });
      }

      options.forEach((option) => {
        option.addEventListener('click', (event) => {
          event.preventDefault();
          const value = option.dataset.value;
          closeAllDropdowns();
          applyLanguage(value, true);
          trigger?.focus();
        });

        option.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            applyLanguage(option.dataset.value, true);
            closeAllDropdowns();
            trigger?.focus();
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            closeAllDropdowns();
            trigger?.focus();
          }
        });
      });
    });

    selects.forEach((select) => {
      select.addEventListener('change', (event) => {
        applyLanguage(event.target.value, true);
      });
    });

    let initialLanguage = 'en';

    try {
      const stored = window.localStorage.getItem(RUKN_LANGUAGE_STORAGE_KEY);
      if (stored) {
        initialLanguage = sanitizeLanguage(stored);
      } else {
        const currentLang = document.documentElement.lang;
        initialLanguage = sanitizeLanguage(currentLang);
      }
    } catch {
      // localStorage unavailable — fall back to document language
    }

    applyLanguage(initialLanguage, false);
    this._setDropdownSelection(initialLanguage);
  }

  _applyTranslations(language) {
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : DEFAULT_TRANSLATIONS;
    const fallback = translations.en || DEFAULT_TRANSLATIONS.en || {};

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('placeholder', value);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('title', value);
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });
  }

  _setDropdownSelection(language) {
    const dropdowns = this.querySelectorAll('[data-language-dropdown]');
    dropdowns.forEach((dropdown) => {
      const label = dropdown.querySelector('.ds-dropdown-label');
      const options = dropdown.querySelectorAll('.ds-dropdown-option');
      
      // Always show each language option in its native language
      options.forEach((option) => {
        const value = option.dataset.value;
        // Use native language name, not translated
        const optionLabel = RUKN_NATIVE_LANGUAGE_NAMES[value] || value;
        option.textContent = optionLabel;
        const isActive = value === language;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      
      // Show current selected language in its native form
      if (label) {
        label.textContent = RUKN_NATIVE_LANGUAGE_NAMES[language] || language.toUpperCase();
      }
    });
  }

  _getTranslation(key, language) {
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : DEFAULT_TRANSLATIONS;
    const fallback = translations.en || DEFAULT_TRANSLATIONS.en || {};
    return translations[language]?.[key] ?? fallback[key] ?? null;
  }

  _updateLayoutForLanguage(language) {
    const isRTL = RUKN_RTL_LANGUAGES.includes(language);
    const navbar = this.querySelector('.ds-navbar-container');
    const mobileDropdown = this.querySelector('.ds-navbar-mobile-dropdown');
    const docsLayouts = document.querySelectorAll('.docs-layout');
    const sidebars = document.querySelectorAll('.sidebar');
    const mainContents = document.querySelectorAll('.main-content');

    if (navbar) {
      navbar.style.flexDirection = isRTL ? 'row-reverse' : '';
    }

    if (mobileDropdown) {
      mobileDropdown.style.textAlign = isRTL ? 'right' : '';
    }

    docsLayouts.forEach((layout) => {
      layout.style.flexDirection = isRTL ? 'row-reverse' : '';
    });

    sidebars.forEach((sidebar) => {
      sidebar.style.left = isRTL ? 'auto' : '';
      sidebar.style.right = isRTL ? 'var(--r-space-4)' : '';
    });

    mainContents.forEach((main) => {
      main.style.marginLeft = isRTL ? '' : '';
      main.style.marginRight = isRTL ? 'calc(280px + var(--r-space-8))' : '';
    });
  }
  
  _initDarkModeToggle() {
    const desktopToggle = this.querySelector(`#themeToggle-${this._uid}`);
    const mobileToggle = this.querySelector(`#themeToggleMobile-${this._uid}`);
    
    // Get initial dark mode state
    const isDark = this._getDarkModeState();
    this._setDarkMode(isDark, false); // Set initial state without persisting
    
    // Sync both toggles
    if (desktopToggle) desktopToggle.checked = isDark;
    if (mobileToggle) mobileToggle.checked = isDark;
    
    // Desktop toggle handler
    if (desktopToggle) {
      desktopToggle.addEventListener('change', (e) => {
        this._setDarkMode(e.target.checked, true);
        if (mobileToggle) mobileToggle.checked = e.target.checked;
      });
    }
    
    // Mobile toggle handler
    if (mobileToggle) {
      mobileToggle.addEventListener('change', (e) => {
        this._setDarkMode(e.target.checked, true);
        if (desktopToggle) desktopToggle.checked = e.target.checked;
      });
    }
    
    // Update icon visibility
    this._updateThemeIcons(isDark);
    
    // Listen for external dark mode changes
    this._themeObserver = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark');
      if (desktopToggle) desktopToggle.checked = currentIsDark;
      if (mobileToggle) mobileToggle.checked = currentIsDark;
      this._updateThemeIcons(currentIsDark);
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  _getDarkModeState() {
    try {
      const stored = localStorage.getItem(RUKN_DARK_MODE_STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    } catch {
      // localStorage unavailable — fall back to dark default
    }

    return true;
  }
  
  _setDarkMode(isDark, persist = true) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (persist) {
      try {
        localStorage.setItem(RUKN_DARK_MODE_STORAGE_KEY, isDark.toString());
      } catch {
        // localStorage unavailable — preference not persisted
      }
    }
    
    this._updateThemeIcons(isDark);
  }
  
  _updateThemeIcons(isDark) {
    const icons = this.querySelectorAll('[data-theme-icon]');
    icons.forEach(icon => {
      if (icon.getAttribute('data-theme-icon') === 'light') {
        icon.style.display = isDark ? 'flex' : 'none';
      } else if (icon.getAttribute('data-theme-icon') === 'dark') {
        icon.style.display = isDark ? 'none' : 'flex';
      }
    });
  }
  
  disconnectedCallback() {
    // Clean up scroll listener when component is removed
    if (this._cleanupScroll) {
      this._cleanupScroll();
    }
    if (this._cleanupLanguageDropdowns) {
      this._cleanupLanguageDropdowns();
    }
    this._themeObserver?.disconnect();
  }
  
  // Generate unique ID for this instance
  get _uid() {
    if (!this.__uid) {
      this.__uid = Math.random().toString(36).substr(2, 9);
    }
    return this.__uid;
  }
}

// Register custom element (native browser API)
if (!customElements.get('rukn-navbar')) {
  customElements.define('rukn-navbar', RuknNavbar);
}

if (typeof window !== 'undefined') {
  window.ruknComponents = {
    ...(window.ruknComponents || {}),
    RuknNavbar
  };
}


// ── rukn-sidebar.js ──
/**
 * Rukn Sidebar - Web Component
 * 100% Vanilla JavaScript - No frameworks
 * 
 * Usage:
 *   <rukn-sidebar type="foundation"></rukn-sidebar>
 *   <rukn-sidebar type="components"></rukn-sidebar>
 * 
 * Attributes:
 *   type - Sidebar type (foundation|components)
 */

class RuknSidebar extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || 'components';
    
    // Create elements that will be inserted as siblings (not children)
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    backdrop.id = `sidebarBackdrop-${this._uid}`;
    
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.id = `sidebar-${this._uid}`;
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', type === 'foundation' ? 'Foundation Navigation' : 'Components Navigation');
    sidebar.innerHTML = type === 'foundation' ? this._getFoundationSidebar() : this._getComponentsSidebar();
    
    const toggle = document.createElement('button');
    toggle.className = 'sidebar-toggle';
    toggle.id = `sidebarToggle-${this._uid}`;
    toggle.setAttribute('data-i18n-aria-label', 'sidebar.toggle');
    toggle.setAttribute('aria-label', 'Toggle sidebar');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i data-lucide="menu" style="font-size: 24px;"></i>';
    
    // Insert elements as siblings to this component (not children)
    const parent = this.parentNode;
    if (parent) {
      parent.insertBefore(backdrop, this);
      parent.insertBefore(sidebar, this);
      parent.insertBefore(toggle, this);
    }
    
    // Store references for cleanup
    this._backdrop = backdrop;
    this._sidebar = sidebar;
    this._toggle = toggle;
    
    this._initSidebar();
    this._applyTranslations();

    if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'stroke-width': 1 } });

    // Listen for language changes
    this._langChangeHandler = () => {
      this._applyTranslations();
    };
    document.addEventListener('rukn:languagechange', this._langChangeHandler);
  }
  
  _applyTranslations() {
    const lang = document.documentElement.lang || 'en';
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : {};
    const fallback = translations.en || {};
    const current = translations[lang] || fallback;
    
    if (this._sidebar) {
      this._sidebar.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        const value = current[key] ?? fallback[key];
        if (value !== undefined) {
          el.textContent = value;
        }
      });
    }
    
    if (this._toggle) {
      this._toggle.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria-label');
        if (!key) return;
        const value = current[key] ?? fallback[key];
        if (value !== undefined) {
          el.setAttribute('aria-label', value);
        }
      });
    }
  }
  
  _getFoundationSidebar() {
    return `
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.foundation.title">Foundation</h4>
        <ul class="sidebar-nav">
          <li><a href="#colors" class="sidebar-link"><i data-lucide="palette"></i> <span data-i18n="sidebar.foundation.colors">Colors</span></a></li>
          <li><a href="#color-system" class="sidebar-link"><i data-lucide="pipette"></i> <span>Color Playground</span></a></li>
          <li><a href="#typography" class="sidebar-link"><i data-lucide="type"></i> <span data-i18n="sidebar.foundation.typography">Typography</span></a></li>
          <li><a href="#spacing" class="sidebar-link"><i data-lucide="move"></i> <span data-i18n="sidebar.foundation.spacing">Spacing</span></a></li>
          <li><a href="#sizes" class="sidebar-link"><i data-lucide="scaling"></i> <span data-i18n="sidebar.foundation.sizes">Sizes</span></a></li>
          <li><a href="#icon-sizes" class="sidebar-link"><i data-lucide="sparkle"></i> <span>Icon Sizes</span></a></li>
          <li><a href="#radius" class="sidebar-link"><i data-lucide="shapes"></i> <span data-i18n="sidebar.foundation.radius">Border Radius</span></a></li>
          <li><a href="#surfaces" class="sidebar-link"><i data-lucide="layers"></i> <span data-i18n="sidebar.foundation.surfaces">Surfaces</span></a></li>
          <li><a href="#shadows" class="sidebar-link"><i data-lucide="sun-dim"></i> <span data-i18n="sidebar.foundation.shadows">Shadows</span></a></li>
          <li><a href="#borders" class="sidebar-link"><i data-lucide="contrast"></i> <span data-i18n="sidebar.foundation.borders">Border Widths</span></a></li>
          <li><a href="#z-index" class="sidebar-link"><i data-lucide="layers"></i> <span>Z-Index</span></a></li>
          <li><a href="#motion" class="sidebar-link"><i data-lucide="activity"></i> <span data-i18n="sidebar.foundation.motion">Rukn Motion</span></a></li>
        </ul>
      </div>

      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.foundation.layouts">Layouts</h4>
        <ul class="sidebar-nav">
          <li><a href="#container" class="sidebar-link"><i data-lucide="box"></i> <span data-i18n="sidebar.foundation.container">Container</span></a></li>
          <li><a href="#grid" class="sidebar-link"><i data-lucide="layout-grid"></i> <span data-i18n="sidebar.foundation.grid">Grid System</span></a></li>
          <li><a href="#flexbox" class="sidebar-link"><i data-lucide="maximize"></i> <span data-i18n="sidebar.foundation.flexbox">Flexbox</span></a></li>
          <li><a href="#responsive" class="sidebar-link"><i data-lucide="monitor-smartphone"></i> <span data-i18n="sidebar.foundation.responsive">Responsive</span></a></li>
        </ul>
      </div>

      <div class="sidebar-section">
        <h4 class="sidebar-title">Patterns</h4>
        <ul class="sidebar-nav">
          <li><a href="#opacity" class="sidebar-link"><i data-lucide="droplets"></i> <span>Opacity & Alpha</span></a></li>
          <li><a href="#focus" class="sidebar-link"><i data-lucide="crosshair"></i> <span>Focus & A11y</span></a></li>
          <li><a href="#gradients" class="sidebar-link"><i data-lucide="blend"></i> <span>Section Gradients</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section" style="border-top: 1px solid hsl(var(--border)); padding-top: var(--space-6);">
        <a href="components.html"><button class="btn-primary btn-sm" style="width: 100%;">
          <i data-lucide="layers" style="margin-right: 8px;"></i>
          <span data-i18n="sidebar.foundation.viewComponents">View Components</span>
        </button></a>
        <a href="index.html" style="margin-top: var(--r-space-2); display: block;">
          <button class="btn-outline btn-sm" style="width: 100%;">
            <i data-lucide="arrow-left" style="margin-right: 8px;"></i>
            <span data-i18n="sidebar.foundation.backHome">Back to Home</span>
          </button>
        </a>
      </div>
    `;
  }
  
  _getComponentsSidebar() {
    return `
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.actions">Actions</h4>
        <ul class="sidebar-nav">
          <li><a href="#buttons" class="sidebar-link"><i data-lucide="mouse-pointer-click"></i> <span data-i18n="sidebar.components.buttons">Buttons</span></a></li>
          <li><a href="#button-groups" class="sidebar-link"><i data-lucide="layers"></i> <span>Button Groups</span></a></li>
          <li><a href="#dropdown" class="sidebar-link"><i data-lucide="chevron-down"></i> <span>Dropdown Menu</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.forms">Forms</h4>
        <ul class="sidebar-nav">
          <li><a href="#inputs" class="sidebar-link"><i data-lucide="text-cursor-input"></i> <span data-i18n="sidebar.components.inputs">Inputs</span></a></li>
          <li><a href="#checkbox" class="sidebar-link"><i data-lucide="square-check"></i> <span data-i18n="sidebar.components.checkbox">Checkbox</span></a></li>
          <li><a href="#radio" class="sidebar-link"><i data-lucide="circle-dot"></i> <span data-i18n="sidebar.components.radio">Radio Group</span></a></li>
          <li><a href="#switch" class="sidebar-link"><i data-lucide="toggle-right"></i> <span data-i18n="sidebar.components.switch">Switch</span></a></li>
          <li><a href="#slider" class="sidebar-link"><i data-lucide="sliders-horizontal"></i> <span data-i18n="sidebar.components.slider">Slider</span></a></li>
          <li><a href="#formfield" class="sidebar-link"><i data-lucide="align-left"></i> <span data-i18n="sidebar.components.formfield">Form Field</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.navigation">Navigation</h4>
        <ul class="sidebar-nav">
          <li><a href="#navbar" class="sidebar-link"><i data-lucide="navigation"></i> <span data-i18n="sidebar.components.navbar">Navbar</span></a></li>
          <li><a href="#breadcrumbs" class="sidebar-link"><i data-lucide="refresh-cw"></i> <span>Breadcrumbs</span></a></li>
          <li><a href="#tabs" class="sidebar-link"><i data-lucide="panel-top"></i> <span>Tabs</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.display">Display</h4>
        <ul class="sidebar-nav">
          <li><a href="#card" class="sidebar-link"><i data-lucide="scan"></i> <span data-i18n="sidebar.components.card">Card</span></a></li>
          <li><a href="#badge" class="sidebar-link"><i data-lucide="tag"></i> <span data-i18n="sidebar.components.badge">Badges</span></a></li>
          <li><a href="#tags" class="sidebar-link"><i data-lucide="tag"></i> <span>Tags</span></a></li>
          <li><a href="#avatar" class="sidebar-link"><i data-lucide="circle-user"></i> <span>Avatar</span></a></li>
          <li><a href="#icon-placeholder" class="sidebar-link"><i data-lucide="shapes"></i> <span data-i18n="sidebar.components.iconPlaceholder">Icon Placeholders</span></a></li>
          <li><a href="#empty-state" class="sidebar-link"><i data-lucide="folder-open"></i> <span>Empty States</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.data">Data</h4>
        <ul class="sidebar-nav">
          <li><a href="#tables" class="sidebar-link"><i data-lucide="table"></i> <span>Tables</span></a></li>
          <li><a href="#pagination" class="sidebar-link"><i data-lucide="chevrons-left"></i> <span>Pagination</span></a></li>
          <li><a href="#metrics" class="sidebar-link"><i data-lucide="chart-line"></i> <span>Metrics / Stats</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.content">Content</h4>
        <ul class="sidebar-nav">
          <li><a href="#accordion" class="sidebar-link"><i data-lucide="arrow-down-up"></i> <span>Accordion</span></a></li>
          <li><a href="#dividers" class="sidebar-link"><i data-lucide="minus"></i> <span>Content Dividers</span></a></li>
          <li><a href="#code-snippet" class="sidebar-link"><i data-lucide="code"></i> <span>Code Snippet</span></a></li>
          <li><a href="#carousel" class="sidebar-link"><i data-lucide="images"></i> <span>Carousel</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.layout">Layout</h4>
        <ul class="sidebar-nav">
          <li><a href="#page-headers" class="sidebar-link"><i data-lucide="heading"></i> <span>Page Headers</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.advanced">Advanced</h4>
        <ul class="sidebar-nav">
          <li><a href="#file-uploader" class="sidebar-link"><i data-lucide="cloud-upload"></i> <span>File Uploader</span></a></li>
          <li><a href="#multi-select" class="sidebar-link"><i data-lucide="list"></i> <span>Multi-Select</span></a></li>
          <li><a href="#date-picker" class="sidebar-link"><i data-lucide="calendar"></i> <span>Date Picker</span></a></li>
          <li><a href="#command-menu" class="sidebar-link"><i data-lucide="command"></i> <span>Command Menu</span></a></li>
          <li><a href="#progress-steps" class="sidebar-link"><i data-lucide="milestone"></i> <span>Progress Steps</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.overlays">Overlays</h4>
        <ul class="sidebar-nav">
          <li><a href="#modal" class="sidebar-link"><i data-lucide="frame"></i> <span data-i18n="sidebar.components.modal">Modal</span></a></li>
          <li><a href="#drawer" class="sidebar-link"><i data-lucide="panel-left"></i> <span data-i18n="sidebar.components.drawer">Drawer</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.feedback">Feedback</h4>
        <ul class="sidebar-nav">
          <li><a href="#tooltip" class="sidebar-link"><i data-lucide="message-circle"></i> <span data-i18n="sidebar.components.tooltip">Tooltip</span></a></li>
          <li><a href="#alert" class="sidebar-link"><i data-lucide="circle-alert"></i> <span data-i18n="sidebar.components.alert">Alert</span></a></li>
          <li><a href="#toast" class="sidebar-link"><i data-lucide="bell"></i> <span data-i18n="sidebar.components.toast">Toast</span></a></li>
          <li><a href="#progress" class="sidebar-link"><i data-lucide="loader-circle"></i> <span data-i18n="sidebar.components.progress">Progress</span></a></li>
          <li><a href="#spinner" class="sidebar-link"><i data-lucide="loader"></i> <span data-i18n="sidebar.components.spinner">Spinner</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title" data-i18n="sidebar.components.effects">Effects</h4>
        <ul class="sidebar-nav">
          <li><a href="#glass" class="sidebar-link"><i data-lucide="sparkles"></i> <span data-i18n="sidebar.components.glass">Glass Morphism</span></a></li>
        </ul>
      </div>
      
      <div class="sidebar-section" style="border-top: 1px solid hsl(var(--border)); padding-top: var(--space-6);">
        <a href="foundation.html"><button class="btn-outline btn-sm" style="width: 100%;">
          <i data-lucide="box" style="margin-right: 8px;"></i>
          <span data-i18n="sidebar.components.viewFoundation">View Foundation</span>
        </button></a>
        <a href="index.html" style="margin-top: var(--r-space-2); display: block;">
          <button class="btn-outline btn-sm" style="width: 100%;">
            <i data-lucide="arrow-left" style="margin-right: 8px;"></i>
            <span data-i18n="sidebar.components.backHome">Back to Home</span>
          </button>
        </a>
      </div>
    `;
  }
  
  _initSidebar() {
    const sidebar = this._sidebar;
    const backdrop = this._backdrop;
    const toggle = this._toggle;
    
    if (!sidebar || !toggle) return;
    
    // Toggle sidebar
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      backdrop?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close on backdrop click
    backdrop?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Active state based on scroll
    this._updateActiveNav();
    this._scrollHandler = () => this._updateActiveNav();
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  }
  
  disconnectedCallback() {
    // Cleanup when component is removed
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }

    if (this._langChangeHandler) {
      document.removeEventListener('rukn:languagechange', this._langChangeHandler);
    }

    // Remove inserted elements
    if (this._backdrop && this._backdrop.parentNode) {
      this._backdrop.parentNode.removeChild(this._backdrop);
    }
    if (this._sidebar && this._sidebar.parentNode) {
      this._sidebar.parentNode.removeChild(this._sidebar);
    }
    if (this._toggle && this._toggle.parentNode) {
      this._toggle.parentNode.removeChild(this._toggle);
    }
  }
  
  _updateActiveNav() {
    if (!this._sidebar) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this._sidebar.querySelectorAll('.sidebar-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const isActive = link.getAttribute('href') === `#${current}`;
      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  
  get _uid() {
    if (!this.__uid) {
      this.__uid = Math.random().toString(36).substr(2, 9);
    }
    return this.__uid;
  }
}

if (!customElements.get('rukn-sidebar')) {
  customElements.define('rukn-sidebar', RuknSidebar);
}

if (typeof window !== 'undefined') {
  window.ruknComponents = {
    ...(window.ruknComponents || {}),
    RuknSidebar
  };
}

  // Expose public API on window.RuknDS
  if (typeof window !== 'undefined') {
    window.RuknDS = {
      version: '2.2.0',
      setColor: global.ruknSetPrimaryColor,
      getColor: global.ruknGetPrimaryColor,
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
