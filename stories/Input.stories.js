import { el, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Gallery/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Same markup as components.html#inputs.',
      },
    },
  },
};

export default meta;

export const AllTypes = {
  name: 'All input types',
  render: () => {
    const select = el('select', { class: 'ds-select' }, [
      el('option', {}, ['Select option']),
      el('option', {}, ['Option 1']),
      el('option', {}, ['Option 2']),
    ]);
    return stack(
      {
        gap: 'var(--space-4)',
        'max-width': '400px',
        width: '100%',
      },
      [
        el('input', { type: 'text', class: 'ds-input', placeholder: 'Text input' }),
        el('textarea', { class: 'ds-textarea', placeholder: 'Textarea', rows: '3' }),
        select,
      ]
    );
  },
};

export const Text = {
  render: () => el('input', { type: 'text', class: 'ds-input', placeholder: 'Text input' }),
};
