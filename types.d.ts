/**
 * Rukn Design System — TypeScript Declarations
 * @version 2.2.0
 *
 * Covers:
 *  - CSS module declarations
 *  - Web Component element interfaces
 *  - HTMLElementTagNameMap extension (JSX / querySelector autocomplete)
 *  - Custom event types
 *  - Global utility functions
 *  - Design token interface
 */

// ─────────────────────────────────────────────────────────────────────────────
// CSS module declarations
// ─────────────────────────────────────────────────────────────────────────────

declare module '@ruknds/core' {
  /** Import the complete Rukn CSS (variables + components) */
  const styles: string;
  export default styles;
}

declare module '@ruknds/core/variables' {
  /** Import only the CSS design tokens */
  const variables: string;
  export default variables;
}

declare module '@ruknds/core/css' {
  /** Import only the component styles (requires variables to be imported separately) */
  const css: string;
  export default css;
}

declare module '@ruknds/core/helpers' {
  /** Open a modal by its ID */
  export function openModal(modalId: string, overlayId?: string | null): void;
  /** Close a modal by its ID */
  export function closeModal(modalId: string, overlayId?: string | null): void;
  /** Open a drawer by its ID */
  export function openDrawer(drawerId: string, overlayId?: string | null): void;
  /** Close a drawer by its ID */
  export function closeDrawer(drawerId: string, overlayId?: string | null): void;
  /** Bind overlay, close-button, and Escape-key behavior */
  export function initModalsAndDrawers(): void;
}

declare module '@ruknds/core/button' {
  const RuknButton: CustomElementConstructor;
  export { RuknButton };
  export default RuknButton;
}

declare module '@ruknds/core/badge' {
  const RuknBadge: CustomElementConstructor;
  export { RuknBadge };
  export default RuknBadge;
}

declare module '@ruknds/core/card' {
  const RuknCard: CustomElementConstructor;
  export { RuknCard };
  export default RuknCard;
}

declare module '@ruknds/core/alert' {
  const RuknAlert: CustomElementConstructor;
  export { RuknAlert };
  export default RuknAlert;
}

declare module '@ruknds/core/spinner' {
  const RuknSpinner: CustomElementConstructor;
  export { RuknSpinner };
  export default RuknSpinner;
}

declare module '@ruknds/core/progress' {
  const RuknProgress: CustomElementConstructor;
  export { RuknProgress };
  export default RuknProgress;
}

declare module '@ruknds/core/modal' {
  const RuknModal: CustomElementConstructor;
  export { RuknModal };
  export default RuknModal;
}

declare module '@ruknds/core/input' {
  const RuknInput: CustomElementConstructor;
  export { RuknInput };
  export default RuknInput;
}

declare module '@ruknds/core/icon' {
  const RuknIcon: CustomElementConstructor;
  export { RuknIcon };
  export default RuknIcon;
}

// ─────────────────────────────────────────────────────────────────────────────
// Supported language / direction types
// ─────────────────────────────────────────────────────────────────────────────

/** Languages supported by Rukn Design System out of the box */
type RuknLanguage = 'en' | 'ar' | 'ur';

/** Text direction */
type RuknDirection = 'ltr' | 'rtl';

// ─────────────────────────────────────────────────────────────────────────────
// Custom event detail types
// ─────────────────────────────────────────────────────────────────────────────

interface RuknLanguageChangeDetail {
  /** The new active language code */
  language: RuknLanguage;
  /** The resulting text direction */
  direction: RuknDirection;
}

interface RuknThemeChangeDetail {
  /** Whether dark mode is now active */
  isDark: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Web Component element interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface RuknButtonElement extends HTMLElement {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button shows a loading spinner */
  loading?: boolean;
}

interface RuknBadgeElement extends HTMLElement {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'destructive';
}

interface RuknCardElement extends HTMLElement {
  variant?: string;
}

interface RuknAlertElement extends HTMLElement {
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  dismissible?: boolean;
}

interface RuknSpinnerElement extends HTMLElement {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'light';
}

interface RuknProgressElement extends HTMLElement {
  /** Progress percentage (0–100) */
  value?: number;
  variant?: 'primary' | 'success' | 'warning' | 'destructive';
  /** Show the percentage label */
  label?: boolean;
}

interface RuknModalElement extends HTMLElement {
  /** Whether the modal is visible */
  open?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface RuknInputElement extends HTMLElement {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Whether the input is in an error state */
  error?: boolean;
}

interface RuknIconElement extends HTMLElement {
  /** Icon name from the Rukn icon set */
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface RuknNavbarElement extends HTMLElement {
  /** Active navigation page */
  current?: 'home' | 'foundation' | 'components' | string;
  /** Show the search bar */
  search?: boolean;
  /** Path to a custom logo image */
  'logo-src'?: string;
  /** Alt text for the logo */
  'logo-alt'?: string;
  /** Brand name displayed next to the logo */
  'brand-text'?: string;
  /** URL the brand logo/text links to */
  'brand-href'?: string;
  /** Show brand text alongside the logo */
  'show-brand-text'?: boolean;
  /** Show only the logo (no text) */
  'logo-only'?: boolean;
  /** Show only the text (no logo) */
  'text-only'?: boolean;
}

interface RuknSidebarElement extends HTMLElement {
  position?: 'left' | 'right';
  open?: boolean;
}

interface RuknFooterElement extends HTMLElement {
  variant?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTMLElementTagNameMap — enables autocomplete in JSX and querySelector
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface HTMLElementTagNameMap {
    'rukn-button': RuknButtonElement;
    'rukn-badge': RuknBadgeElement;
    'rukn-card': RuknCardElement;
    'rukn-alert': RuknAlertElement;
    'rukn-spinner': RuknSpinnerElement;
    'rukn-progress': RuknProgressElement;
    'rukn-modal': RuknModalElement;
    'rukn-input': RuknInputElement;
    'rukn-icon': RuknIconElement;
    'rukn-navbar': RuknNavbarElement;
    'rukn-sidebar': RuknSidebarElement;
    'rukn-footer': RuknFooterElement;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Typed custom events on document
  // ──────────────────────────────────────────────────────────────────────────

  interface DocumentEventMap {
    'rukn:languagechange': CustomEvent<RuknLanguageChangeDetail>;
    'rukn:themechange': CustomEvent<RuknThemeChangeDetail>;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Window helpers injected by @ruknds/core
  // ──────────────────────────────────────────────────────────────────────────

  interface Window {
    /**
     * Set the primary brand colour at runtime.
     * @param hex   A valid CSS hex colour, e.g. `"#7C3AED"`
     * @param persist  Persist to localStorage (default `true`)
     */
    ruknSetPrimaryColor(hex: string, persist?: boolean): void;

    /**
     * Map of all registered Rukn Web Component classes.
     * Useful for testing or advanced customisation.
     */
    ruknComponents: Record<string, CustomElementConstructor>;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Global utility functions (available after importing @ruknds/core)
// ─────────────────────────────────────────────────────────────────────────────

declare function openModal(modalId: string): void;
declare function closeModal(modalId: string): void;
declare function openDrawer(drawerId: string): void;
declare function closeDrawer(drawerId: string): void;

// ─────────────────────────────────────────────────────────────────────────────
// Design token interface — all --r-* CSS custom properties
// ─────────────────────────────────────────────────────────────────────────────

interface RuknCSSVariables {
  // ── Colors ──────────────────────────────────────────────────────────────
  '--r-color-primary': string;
  '--r-color-secondary': string;
  '--r-color-accent': string;
  '--r-color-success': string;
  '--r-color-warning': string;
  '--r-color-error': string;
  '--r-color-destructive': string;
  '--r-color-neutral': string;
  '--r-color-surface': string;
  '--r-color-surface-elevated': string;
  '--r-color-text': string;
  '--r-color-text-muted': string;
  '--r-color-border': string;

  // ── Spacing ──────────────────────────────────────────────────────────────
  '--r-space-1': string;
  '--r-space-2': string;
  '--r-space-3': string;
  '--r-space-4': string;
  '--r-space-5': string;
  '--r-space-6': string;
  '--r-space-7': string;
  '--r-space-8': string;
  '--r-space-10': string;
  '--r-space-12': string;
  '--r-space-16': string;
  '--r-space-20': string;
  '--r-space-24': string;
  '--r-space-32': string;
  '--r-space-40': string;
  '--r-space-48': string;
  '--r-space-64': string;

  // ── Typography — fonts ────────────────────────────────────────────────────
  '--r-font-heading': string;
  '--r-font-body': string;
  '--r-font-mono': string;
  '--r-font-arabic': string;
  '--r-font-urdu': string;

  // ── Typography — line heights ────────────────────────────────────────────
  '--r-line-height-tight': string;
  '--r-line-height-base': string;
  '--r-line-height-relaxed': string;
  '--r-line-height-urdu-base': string;
  '--r-line-height-urdu-heading': string;
  '--r-line-height-urdu-body': string;

  // ── Typography — font sizes ───────────────────────────────────────────────
  '--r-text-xs': string;
  '--r-text-sm': string;
  '--r-text-base': string;
  '--r-text-lg': string;
  '--r-text-xl': string;
  '--r-text-2xl': string;
  '--r-text-3xl': string;
  '--r-text-4xl': string;

  // ── Border radius ────────────────────────────────────────────────────────
  '--r-radius-sm': string;
  '--r-radius-md': string;
  '--r-radius-lg': string;
  '--r-radius-xl': string;
  '--r-radius-2xl': string;
  '--r-radius-3xl': string;
  '--r-radius-full': string;

  // ── Transitions ──────────────────────────────────────────────────────────
  '--r-transition-instant': string;
  '--r-transition-fast': string;
  '--r-transition-base': string;
  '--r-transition-slow': string;
  '--r-transition-slower': string;

  // ── iOS-style easing ─────────────────────────────────────────────────────
  '--r-ease-ios-standard': string;
  '--r-ease-ios-smooth': string;
  '--r-ease-ios-decelerate': string;
  '--r-ease-ios-accelerate': string;

  // ── Spring animations ─────────────────────────────────────────────────────
  '--r-spring-smooth': string;
  '--r-spring-bouncy': string;
  '--r-spring-snappy': string;

  // ── Shadows ───────────────────────────────────────────────────────────────
  '--r-shadow-sm': string;
  '--r-shadow-md': string;
  '--r-shadow-lg': string;
  '--r-shadow-xl': string;
  '--r-shadow-glass': string;

  // ── Glass morphism ────────────────────────────────────────────────────────
  '--r-glass-bg': string;
  '--r-glass-border': string;
  '--r-glass-blur': string;
}

export {};
