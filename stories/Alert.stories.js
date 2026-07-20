import { el, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Gallery/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Same markup as components.html alerts (ds-alert).',
      },
    },
  },
};

export default meta;

function alertBlock(variant, icon, title, description) {
  return el('div', { class: `ds-alert ds-alert-${variant}` }, [
    el('div', { class: 'ds-alert-icon' }, [icon]),
    el('div', { class: 'ds-alert-content' }, [
      el('div', { class: 'ds-alert-title' }, [title]),
      el('div', { class: 'ds-alert-description' }, [description]),
    ]),
  ]);
}

export const Variants = {
  render: () =>
    stack(
      { gap: 'var(--space-3)', 'min-width': 'min(100%, 24rem)' },
      [
        alertBlock('info', 'ℹ', 'Information', 'This is an informational message'),
        alertBlock('success', '✓', 'Success', 'Your changes have been saved'),
        alertBlock('warning', '⚠', 'Warning', 'Please review before continuing'),
        alertBlock('error', '✕', 'Error', 'Unable to save changes'),
      ]
    ),
};
