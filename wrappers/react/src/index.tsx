/**
 * @ruknds/react — React wrappers for Rukn Design System Web Components
 *
 * These are thin typed wrappers around Rukn's vanilla Web Components.
 * They handle React's synthetic event system and provide full TypeScript
 * prop types so you get autocompletion and type checking.
 *
 * Usage:
 *   import { RuknButton, RuknCard, RuknNavbar } from '@ruknds/react';
 *   import '@ruknds/core/styles/design-system-variables.css';
 *   import '@ruknds/core/styles/design-system.css';
 *
 *   function App() {
 *     return (
 *       <div dir="rtl" lang="ar">
 *         <RuknNavbar current="home" showBrandText />
 *         <RuknCard>
 *           <RuknButton variant="primary" onClick={() => alert('مرحبا!')}>
 *             ابدأ الآن
 *           </RuknButton>
 *         </RuknCard>
 *       </div>
 *     );
 *   }
 *
 * @version 2.2.0
 * @license MIT
 */

import React, {
  useRef,
  useEffect,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

// ============================================
// Helper: create a wrapper around a Web Component
// ============================================

type WebComponentProps<T extends Record<string, unknown> = {}> = T &
  HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
  };

/**
 * Creates a React component that wraps a custom element.
 * Maps React props to DOM attributes and handles event forwarding.
 */
function createWebComponentWrapper<P extends Record<string, unknown>>(
  tagName: string,
  propToAttrMap: Record<string, string> = {},
  booleanAttrs: string[] = []
) {
  const Wrapper = forwardRef(function WC(
    props: WebComponentProps<P>,
    ref: Ref<HTMLElement>
  ) {
    const innerRef = useRef<HTMLElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLElement>) || innerRef;

    // Separate known WC props from native HTML props
    const { children, ...rest } = props;
    const wcProps: Record<string, unknown> = {};
    const htmlProps: Record<string, unknown> = {};

    const mappedKeys = new Set([
      ...Object.keys(propToAttrMap),
      ...booleanAttrs,
    ]);

    for (const [key, value] of Object.entries(rest)) {
      if (mappedKeys.has(key)) {
        wcProps[key] = value;
      } else {
        htmlProps[key] = value;
      }
    }

    useEffect(() => {
      const el = resolvedRef.current;
      if (!el) return;

      // Set mapped attributes
      for (const [prop, attr] of Object.entries(propToAttrMap)) {
        const value = wcProps[prop];
        if (value !== undefined && value !== null && value !== false) {
          el.setAttribute(attr, String(value));
        } else {
          el.removeAttribute(attr);
        }
      }

      // Set boolean attributes
      for (const attr of booleanAttrs) {
        if (wcProps[attr]) {
          el.setAttribute(attr, '');
        } else if (wcProps[attr] === false) {
          el.removeAttribute(attr);
        }
      }
    });

    return React.createElement(
      tagName,
      { ref: resolvedRef, ...htmlProps },
      children
    );
  });

  Wrapper.displayName = tagName
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

  return Wrapper;
}

// ============================================
// Component Wrappers
// ============================================

// --- RuknButton ---
export interface RuknButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** Disabled state */
  disabled?: boolean;
  /** Show loading spinner */
  loading?: boolean;
}

export const RuknButton = createWebComponentWrapper<RuknButtonProps>(
  'rukn-button',
  { variant: 'variant', size: 'size' },
  ['disabled', 'loading']
);

// --- RuknBadge ---
export interface RuknBadgeProps {
  /** Badge visual variant */
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'destructive';
}

export const RuknBadge = createWebComponentWrapper<RuknBadgeProps>(
  'rukn-badge',
  { variant: 'variant' }
);

// --- RuknCard ---
export interface RuknCardProps {
  /** Optional card variant */
  variant?: string;
}

export const RuknCard = createWebComponentWrapper<RuknCardProps>(
  'rukn-card',
  { variant: 'variant' }
);

// --- RuknAlert ---
export interface RuknAlertProps {
  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  /** Alert title text */
  title?: string;
  /** Dismissible alert */
  dismissible?: boolean;
}

export const RuknAlert = createWebComponentWrapper<RuknAlertProps>(
  'rukn-alert',
  { variant: 'variant', title: 'title' },
  ['dismissible']
);

// --- RuknSpinner ---
export interface RuknSpinnerProps {
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg';
  /** Spinner variant */
  variant?: 'primary' | 'secondary' | 'light';
}

export const RuknSpinner = createWebComponentWrapper<RuknSpinnerProps>(
  'rukn-spinner',
  { size: 'size', variant: 'variant' }
);

// --- RuknProgress ---
export interface RuknProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Progress variant */
  variant?: 'primary' | 'success' | 'warning' | 'destructive';
  /** Show percentage label */
  label?: boolean;
}

export const RuknProgress = createWebComponentWrapper<RuknProgressProps>(
  'rukn-progress',
  { value: 'value', variant: 'variant' },
  ['label']
);

// --- RuknModal ---
export interface RuknModalProps {
  /** Modal open state */
  open?: boolean;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg';
}

export const RuknModal = createWebComponentWrapper<RuknModalProps>(
  'rukn-modal',
  { title: 'title', size: 'size' },
  ['open']
);

// --- RuknInput ---
export interface RuknInputProps {
  /** Input type */
  type?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
}

export const RuknInput = createWebComponentWrapper<RuknInputProps>(
  'rukn-input',
  { type: 'type', placeholder: 'placeholder' },
  ['disabled', 'error']
);

// --- RuknIcon ---
export interface RuknIconProps {
  /** Icon name */
  name?: string;
  /** Icon size */
  size?: 'sm' | 'md' | 'lg';
}

export const RuknIcon = createWebComponentWrapper<RuknIconProps>(
  'rukn-icon',
  { name: 'name', size: 'size' }
);

// --- RuknNavbar ---
export interface RuknNavbarProps {
  /** Active page */
  current?: 'home' | 'foundation' | 'components' | string;
  /** Show search bar */
  search?: boolean;
  /** Custom logo path */
  logoSrc?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Brand name */
  brandText?: string;
  /** Brand link URL */
  brandHref?: string;
  /** Show brand text next to logo */
  showBrandText?: boolean;
  /** Logo-only mode */
  logoOnly?: boolean;
  /** Text-only mode (no logo) */
  textOnly?: boolean;
}

export const RuknNavbar = createWebComponentWrapper<RuknNavbarProps>(
  'rukn-navbar',
  {
    current: 'current',
    logoSrc: 'logo-src',
    logoAlt: 'logo-alt',
    brandText: 'brand-text',
    brandHref: 'brand-href',
  },
  ['search', 'showBrandText', 'logoOnly', 'textOnly']
);

// --- RuknSidebar ---
export interface RuknSidebarProps {
  /** Sidebar position */
  position?: 'left' | 'right';
  /** Open state */
  open?: boolean;
}

export const RuknSidebar = createWebComponentWrapper<RuknSidebarProps>(
  'rukn-sidebar',
  { position: 'position' },
  ['open']
);

// --- RuknFooter ---
export interface RuknFooterProps {
  /** Footer variant */
  variant?: string;
}

export const RuknFooter = createWebComponentWrapper<RuknFooterProps>(
  'rukn-footer',
  { variant: 'variant' }
);

// ============================================
// Utility Hook: useRuknLanguage
// ============================================

/**
 * Hook to listen for Rukn language changes and get the current language.
 *
 * @example
 * const lang = useRuknLanguage();
 * return <p>{lang === 'ar' ? 'مرحبا' : 'Hello'}</p>;
 */
export function useRuknLanguage(): string {
  const [lang, setLang] = React.useState(
    () => document.documentElement.lang || 'en'
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLang(detail?.language || 'en');
    };
    document.addEventListener('rukn:languagechange', handler);
    return () => document.removeEventListener('rukn:languagechange', handler);
  }, []);

  return lang;
}

/**
 * Hook to listen for Rukn theme changes.
 *
 * @example
 * const isDark = useRuknTheme();
 */
export function useRuknTheme(): boolean {
  const [isDark, setIsDark] = React.useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
