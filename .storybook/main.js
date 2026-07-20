/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    // CSS is imported via Vite in preview.js — do not mount /styles as staticDirs
    // (that shadows Vite CSS transforms and breaks the preview).
    if (configType === 'PRODUCTION') {
      config.base = '/storybook/';
    }
    return config;
  },
};

export default config;
