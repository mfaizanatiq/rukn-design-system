/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // Serve Rukn CSS as plain stylesheets (not under /styles, which collides with
  // Vite module imports and breaks preview.js in the browser).
  staticDirs: [{ from: '../styles', to: '/rukn-styles' }],
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/storybook/';
    }
    return config;
  },
};

export default config;
