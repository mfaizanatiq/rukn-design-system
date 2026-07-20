import { el, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Primitives/Typography',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Scale = {
  render: () =>
    stack({ gap: '1rem', 'max-width': '36rem' }, [
      el('p', { class: 'label-caps', style: 'margin:0' }, ['Label caps']),
      el('h1', { class: 'heading-display', style: 'margin:0' }, ['Display heading']),
      el('h2', { class: 'heading-section', style: 'margin:0' }, ['Section heading']),
      el('h3', { class: 'heading-card', style: 'margin:0' }, ['Card heading']),
      el(
        'p',
        { style: 'margin:0;color:hsl(var(--foreground) / 0.8);line-height:1.65' },
        [
          'Body copy uses design tokens. Switch locale in the toolbar to preview Arabic and Urdu typography.',
        ]
      ),
    ]),
};
