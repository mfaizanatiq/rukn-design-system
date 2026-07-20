import { html } from 'lit';

import '../styles/design-system-variables.css';
import '../styles/design-system.css';
import '../components/rukn-ui.js';

import './preview.css';

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Primitives', 'Components', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Rukn color theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Document language + direction',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English (LTR)', right: 'EN' },
          { value: 'ar', title: 'العربية (RTL)', right: 'AR' },
          { value: 'ur', title: 'اردو (RTL)', right: 'UR' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'dark';
      const locale = context.globals.locale || 'en';
      const dir = locale === 'en' ? 'ltr' : 'rtl';

      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.classList.toggle('light', theme === 'light');
        root.lang = locale;
        root.dir = dir;
        document.body?.classList.toggle('dark', theme === 'dark');
      }

      return html`<div class="rukn-story" lang=${locale} dir=${dir}>${story()}</div>`;
    },
  ],
};

export default preview;
