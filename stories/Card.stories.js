import { html } from 'lit';

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
  render: ({ glass, title, body }) => html`
    <rukn-card ?glass=${glass} style="display:block; max-width:22rem;">
      <h3 class="heading-card" style="margin:0 0 var(--r-space-2);">${title}</h3>
      <p style="margin:0; color:hsl(var(--foreground) / 0.75); line-height:1.6;">${body}</p>
    </rukn-card>
  `,
};

export default meta;

export const Default = {};

export const Glass = {
  args: { glass: true, title: 'Glass surface' },
};

export const CssPrimitives = {
  name: 'CSS primitives',
  render: () => html`
    <div style="display:grid; gap:1rem; max-width:22rem;">
      <div class="ds-card">
        <h3 class="heading-card" style="margin:0 0 var(--r-space-2);">ds-card</h3>
        <p style="margin:0; color:hsl(var(--foreground) / 0.75);">Solid card surface.</p>
      </div>
      <div class="ds-glass">
        <h3 class="heading-card" style="margin:0 0 var(--r-space-2);">ds-glass</h3>
        <p style="margin:0; color:hsl(var(--foreground) / 0.75);">Glass morphism surface.</p>
      </div>
    </div>
  `,
};
