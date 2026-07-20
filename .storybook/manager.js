import { create } from '@storybook/theming/create';
import { addons } from '@storybook/manager-api';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Rukn Design System',
    brandUrl: '/',
    brandTarget: '_parent',

    colorPrimary: '#FF4154',
    colorSecondary: '#FF4154',

    appBg: '#0B0B0C',
    appContentBg: '#121214',
    appPreviewBg: '#0B0B0C',
    appBorderColor: 'rgba(255, 255, 255, 0.08)',
    appBorderRadius: 10,

    textColor: '#F4F4F5',
    textInverseColor: '#0B0B0C',
    textMutedColor: 'rgba(244, 244, 245, 0.55)',

    barTextColor: 'rgba(244, 244, 245, 0.7)',
    barSelectedColor: '#FF4154',
    barHoverColor: '#FF4154',
    barBg: '#0B0B0C',

    inputBg: '#121214',
    inputBorder: 'rgba(255, 255, 255, 0.12)',
    inputTextColor: '#F4F4F5',
    inputBorderRadius: 8,

    fontBase: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"SF Mono", Monaco, "Cascadia Code", monospace',
  }),
});
