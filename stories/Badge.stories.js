import { el, row } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Gallery/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Same markup as components.html#badge.',
      },
    },
  },
};

export default meta;

export const Variants = {
  render: () =>
    row(
      { gap: 'var(--space-2)', 'flex-wrap': 'wrap' },
      [
        el('span', { class: 'ds-badge ds-badge-neutral' }, ['Neutral']),
        el('span', { class: 'ds-badge ds-badge-primary' }, ['Primary']),
        el('span', { class: 'ds-badge ds-badge-success' }, ['Success']),
        el('span', { class: 'ds-badge ds-badge-warning' }, ['Warning']),
        el('span', { class: 'ds-badge ds-badge-destructive' }, ['Destructive']),
      ]
    ),
};
