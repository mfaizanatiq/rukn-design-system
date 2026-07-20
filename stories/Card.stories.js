import { el } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Gallery/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Same markup as components.html#card.',
      },
    },
  },
};

export default meta;

export const Default = {
  render: () =>
    el(
      'div',
      { class: 'ds-card', style: 'max-width:400px' },
      [
        el('h4', {}, ['Card Title']),
        el(
          'p',
          { style: 'color:hsl(var(--foreground) / 0.7);margin:var(--space-2) 0' },
          [
            'This is a card component with content inside. Perfect for grouping related information.',
          ]
        ),
        el('button', { class: 'btn-primary btn-sm' }, ['Action']),
      ]
    ),
};

export const Glass = {
  render: () =>
    el(
      'div',
      { class: 'ds-glass', style: 'max-width:400px;padding:var(--r-space-6)' },
      [
        el('h4', {}, ['Glass surface']),
        el(
          'p',
          { style: 'color:hsl(var(--foreground) / 0.7);margin:var(--space-2) 0' },
          ['Glass morphism using ds-glass.']
        ),
      ]
    ),
};
