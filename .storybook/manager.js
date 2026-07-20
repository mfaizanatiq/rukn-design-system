import { create } from '@storybook/theming/create';
import { addons } from '@storybook/manager-api';

const ruknTheme = create({
  base: 'dark',
  brandTitle: 'Rukn ◆',
  brandUrl: 'https://ruknds.netlify.app/',
  brandTarget: '_parent',

  colorPrimary: '#FF4154',
  colorSecondary: '#FF4154',

  appBg: '#0B0B0C',
  appContentBg: '#0B0B0C',
  appPreviewBg: '#0B0B0C',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 12,

  textColor: '#F4F4F5',
  textInverseColor: '#0B0B0C',
  textMutedColor: 'rgba(244, 244, 245, 0.55)',

  barTextColor: 'rgba(244, 244, 245, 0.7)',
  barSelectedColor: '#FF4154',
  barHoverColor: '#FF6B7A',
  barBg: '#0B0B0C',

  buttonBg: '#161618',
  buttonBorder: 'rgba(255, 255, 255, 0.1)',

  inputBg: '#121214',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: '#F4F4F5',
  inputBorderRadius: 8,

  fontBase: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"SF Mono", Monaco, "Cascadia Code", monospace',
});

addons.setConfig({
  theme: ruknTheme,
  sidebar: {
    showRoots: true,
  },
});
