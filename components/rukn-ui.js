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
export {
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


