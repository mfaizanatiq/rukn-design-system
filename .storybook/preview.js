import '../styles/design-system-variables.css';
import '../styles/design-system.css';
import '../components/rukn-ui.js';
import './preview.css';

/** Apply dark before first paint inside the canvas iframe */
function applyRuknChrome(theme, locale) {
  const dir = locale === 'en' ? 'ltr' : 'rtl';
  const root = document.documentElement;
  const body = document.body;

  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }

  root.lang = locale;
  root.dir = dir;
  if (body) {
    body.lang = locale;
    body.dir = dir;
    body.classList.toggle('dark', theme === 'dark');
  }
}

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
        order: ['Introduction', 'Gallery', 'Web Components', 'Primitives', '*'],
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
        applyRuknChrome(theme, locale);
      }

      const result = story();
      const wrap = document.createElement('div');
      wrap.className = 'rukn-story';
      wrap.dataset.theme = theme;
      wrap.lang = locale;
      wrap.dir = dir;

      if (result instanceof Node) {
        wrap.appendChild(result);
        return wrap;
      }

      return result;
    },
  ],
};

export default preview;
