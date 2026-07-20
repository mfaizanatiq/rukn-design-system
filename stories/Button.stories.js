import { el, row } from './_helpers.js';

/**
 * Same markup as components.html#buttons — CSS primitives first.
 * @type {import('@storybook/web-components').Meta}
 */
const meta = {
  title: 'Gallery/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Matches the live gallery on components.html. Prefer btn-* classes — this is what the site ships.',
      },
    },
  },
};

export default meta;

/** Exact variants from components.html */
export const Variants = {
  name: 'Variants',
  render: () =>
    row(
      { gap: 'var(--space-2)', 'flex-wrap': 'wrap' },
      [
        el('button', { class: 'btn-primary' }, ['Primary']),
        el('button', { class: 'btn-secondary' }, ['Secondary']),
        el('button', { class: 'btn-outline' }, ['Outline']),
        el('button', { class: 'btn-ghost' }, ['Ghost']),
        el('button', { class: 'btn-tertiary' }, ['Tertiary']),
        el('button', { class: 'btn-destructive' }, ['Destructive']),
        el('button', { class: 'btn-link' }, ['Link Style']),
      ]
    ),
};

export const Sizes = {
  render: () =>
    row(
      { gap: 'var(--space-2)', 'flex-wrap': 'wrap', 'align-items': 'center' },
      [
        el('button', { class: 'btn-primary btn-sm' }, ['Small']),
        el('button', { class: 'btn-primary btn-md' }, ['Medium']),
        el('button', { class: 'btn-primary btn-lg' }, ['Large']),
        el('button', { class: 'btn-primary btn-icon' }, ['⚙️']),
      ]
    ),
};

export const Primary = {
  render: () => el('button', { class: 'btn-primary' }, ['Primary']),
};
