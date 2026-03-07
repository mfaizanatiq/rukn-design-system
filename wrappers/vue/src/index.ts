/**
 * @ruknds/vue — Vue 3 wrappers for Rukn Design System Web Components
 *
 * Thin typed wrappers around Rukn's vanilla Web Components with
 * proper Vue 3 Composition API integration, TypeScript support,
 * and custom element resolution.
 *
 * Usage:
 *   import { RuknButton, RuknCard, RuknNavbar, useRuknLanguage } from '@ruknds/vue';
 *   import '@ruknds/core/styles/design-system-variables.css';
 *   import '@ruknds/core/styles/design-system.css';
 *
 * @version 2.2.0
 * @license MIT
 */

import {
  defineComponent,
  h,
  ref,
  onMounted,
  onUnmounted,
  type PropType,
  type Plugin,
} from 'vue';

// ============================================
// Helper: create a Vue wrapper for a Web Component
// ============================================

interface WrapperConfig {
  tag: string;
  props: Record<string, { type: PropType<unknown>; default?: unknown }>;
  booleans?: string[];
}

function createWrapper(config: WrapperConfig) {
  return defineComponent({
    name: config.tag
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(''),

    props: config.props,

    setup(props, { slots, attrs }) {
      return () => {
        const domProps: Record<string, unknown> = { ...attrs };

        // Map props to DOM attributes
        for (const [key, value] of Object.entries(props)) {
          if (value === undefined || value === null) continue;

          // Convert camelCase to kebab-case for attribute names
          const attr = key.replace(/([A-Z])/g, '-$1').toLowerCase();

          if (config.booleans?.includes(key)) {
            if (value) {
              domProps[attr] = '';
            }
          } else {
            domProps[attr] = String(value);
          }
        }

        return h(config.tag, domProps, slots.default?.());
      };
    },
  });
}

// ============================================
// Component Wrappers
// ============================================

export const RuknButton = createWrapper({
  tag: 'rukn-button',
  props: {
    variant: { type: String as PropType<'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'> },
    size: { type: String as PropType<'sm' | 'md' | 'lg' | 'icon'> },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  booleans: ['disabled', 'loading'],
});

export const RuknBadge = createWrapper({
  tag: 'rukn-badge',
  props: {
    variant: { type: String as PropType<'neutral' | 'primary' | 'success' | 'warning' | 'destructive'> },
  },
});

export const RuknCard = createWrapper({
  tag: 'rukn-card',
  props: {
    variant: { type: String },
  },
});

export const RuknAlert = createWrapper({
  tag: 'rukn-alert',
  props: {
    variant: { type: String as PropType<'info' | 'success' | 'warning' | 'destructive'> },
    title: { type: String },
    dismissible: { type: Boolean, default: false },
  },
  booleans: ['dismissible'],
});

export const RuknSpinner = createWrapper({
  tag: 'rukn-spinner',
  props: {
    size: { type: String as PropType<'sm' | 'md' | 'lg'> },
    variant: { type: String as PropType<'primary' | 'secondary' | 'light'> },
  },
});

export const RuknProgress = createWrapper({
  tag: 'rukn-progress',
  props: {
    value: { type: Number },
    variant: { type: String as PropType<'primary' | 'success' | 'warning' | 'destructive'> },
    label: { type: Boolean, default: false },
  },
  booleans: ['label'],
});

export const RuknModal = createWrapper({
  tag: 'rukn-modal',
  props: {
    open: { type: Boolean, default: false },
    title: { type: String },
    size: { type: String as PropType<'sm' | 'md' | 'lg'> },
  },
  booleans: ['open'],
});

export const RuknInput = createWrapper({
  tag: 'rukn-input',
  props: {
    type: { type: String },
    placeholder: { type: String },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
  booleans: ['disabled', 'error'],
});

export const RuknIcon = createWrapper({
  tag: 'rukn-icon',
  props: {
    name: { type: String },
    size: { type: String as PropType<'sm' | 'md' | 'lg'> },
  },
});

export const RuknNavbar = createWrapper({
  tag: 'rukn-navbar',
  props: {
    current: { type: String },
    search: { type: Boolean, default: false },
    logoSrc: { type: String },
    logoAlt: { type: String },
    brandText: { type: String },
    brandHref: { type: String },
    showBrandText: { type: Boolean, default: false },
    logoOnly: { type: Boolean, default: false },
    textOnly: { type: Boolean, default: false },
  },
  booleans: ['search', 'showBrandText', 'logoOnly', 'textOnly'],
});

export const RuknSidebar = createWrapper({
  tag: 'rukn-sidebar',
  props: {
    position: { type: String as PropType<'left' | 'right'> },
    open: { type: Boolean, default: false },
  },
  booleans: ['open'],
});

export const RuknFooter = createWrapper({
  tag: 'rukn-footer',
  props: {
    variant: { type: String },
  },
});

// ============================================
// Composables
// ============================================

/**
 * Composable to track the current Rukn language.
 * Reacts to the navbar language switcher.
 *
 * @example
 * const lang = useRuknLanguage();
 * // lang.value is 'en', 'ar', or 'ur'
 */
export function useRuknLanguage() {
  const lang = ref(document.documentElement.lang || 'en');

  let handler: ((e: Event) => void) | null = null;

  onMounted(() => {
    handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      lang.value = detail?.language || 'en';
    };
    document.addEventListener('rukn:languagechange', handler);
  });

  onUnmounted(() => {
    if (handler) {
      document.removeEventListener('rukn:languagechange', handler);
    }
  });

  return lang;
}

/**
 * Composable to track Rukn dark/light theme.
 *
 * @example
 * const isDark = useRuknTheme();
 */
export function useRuknTheme() {
  const isDark = ref(document.documentElement.classList.contains('dark'));
  let observer: MutationObserver | null = null;

  onMounted(() => {
    observer = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains('dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return isDark;
}

// ============================================
// Vue Plugin (optional — registers all components globally)
// ============================================

/**
 * Vue plugin to register all Rukn components globally.
 *
 * @example
 * import { createApp } from 'vue';
 * import { RuknPlugin } from '@ruknds/vue';
 * import '@ruknds/core/styles/design-system-variables.css';
 * import '@ruknds/core/styles/design-system.css';
 *
 * const app = createApp(App);
 * app.use(RuknPlugin);
 * app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('rukn-');
 * app.mount('#app');
 */
export const RuknPlugin: Plugin = {
  install(app) {
    app.component('RuknButton', RuknButton);
    app.component('RuknBadge', RuknBadge);
    app.component('RuknCard', RuknCard);
    app.component('RuknAlert', RuknAlert);
    app.component('RuknSpinner', RuknSpinner);
    app.component('RuknProgress', RuknProgress);
    app.component('RuknModal', RuknModal);
    app.component('RuknInput', RuknInput);
    app.component('RuknIcon', RuknIcon);
    app.component('RuknNavbar', RuknNavbar);
    app.component('RuknSidebar', RuknSidebar);
    app.component('RuknFooter', RuknFooter);

    // Tell Vue compiler these are custom elements
    app.config.compilerOptions.isCustomElement = (tag: string) =>
      tag.startsWith('rukn-');
  },
};
