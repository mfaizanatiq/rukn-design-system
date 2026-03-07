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

customElements.define('rukn-sidebar', RuknSidebar);

