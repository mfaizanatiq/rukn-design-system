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
