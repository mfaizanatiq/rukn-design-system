import { el, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Card',
  component: 'rukn-card',
  tags: ['autodocs'],
  argTypes: {
    glass: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
  },
  args: {
    glass: false,
    title: 'Library card',
    body: 'Compose surfaces with ds-card or rukn-card. Prefer tokens over custom chrome.',
  },
  render: ({ glass, title, body }) => {
    const heading = el('h3', { class: 'heading-card', style: 'margin:0 0 var(--r-space-2)' }, [title]);
    const copy = el('p', { style: 'margin:0;color:hsl(var(--foreground) / 0.75);line-height:1.6' }, [body]);
    return el(
      'rukn-card',
      {
        glass: glass || undefined,
        style: 'display:block;max-width:22rem',
      },
      [heading, copy]
    );
  },
};

export default meta;

export const Default = {};

export const Glass = {
  args: { glass: true, title: 'Glass surface' },
};

export const CssPrimitives = {
  name: 'CSS primitives',
  render: () =>
    stack({ 'max-width': '22rem', gap: '1rem' }, [
      el('div', { class: 'ds-card' }, [
        el('h3', { class: 'heading-card', style: 'margin:0 0 var(--r-space-2)' }, ['ds-card']),
        el('p', { style: 'margin:0;color:hsl(var(--foreground) / 0.75)' }, ['Solid card surface.']),
      ]),
      el('div', { class: 'ds-glass' }, [
        el('h3', { class: 'heading-card', style: 'margin:0 0 var(--r-space-2)' }, ['ds-glass']),
        el('p', { style: 'margin:0;color:hsl(var(--foreground) / 0.75)' }, ['Glass morphism surface.']),
      ]),
    ]),
};
