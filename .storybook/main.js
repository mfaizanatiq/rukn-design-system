/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: [{ from: '../styles', to: '/styles' }],
  async viteFinal(config, { configType }) {
    // Serve under /storybook/ on Netlify; root path for local `storybook dev`
    if (configType === 'PRODUCTION') {
      config.base = '/storybook/';
    }
    return config;
  },
};

export default config;
