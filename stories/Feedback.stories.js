import { el, row, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Spinner & Progress',
  tags: ['autodocs'],
};

export default meta;

export const Spinner = {
  render: () =>
    row({ gap: '1.25rem' }, [
      el('rukn-spinner', { size: 'sm' }),
      el('rukn-spinner', { size: 'md' }),
      el('rukn-spinner', { size: 'lg' }),
    ]),
};

export const Progress = {
  render: () =>
    stack({ 'min-width': '16rem', gap: '1rem' }, [
      el('rukn-progress', { value: '35' }),
      el('rukn-progress', { value: '70', variant: 'success' }),
      el('rukn-progress', { indeterminate: true }),
    ]),
};
