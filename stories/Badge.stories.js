import { html } from 'lit';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Badge',
  component: 'rukn-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'destructive', 'neutral'],
    },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    label: 'New',
  },
  render: ({ variant, label }) => html`
    <rukn-badge variant=${variant}>${label}</rukn-badge>
  `,
};

export default meta;

export const Primary = {};

export const Success = {
  args: { variant: 'success', label: 'Shipped' },
};

export const Warning = {
  args: { variant: 'warning', label: 'Review' },
};

export const Destructive = {
  args: { variant: 'destructive', label: 'Breaking' },
};

export const Neutral = {
  args: { variant: 'neutral', label: 'Draft' },
};

export const All = {
  render: () => html`
    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
      <rukn-badge variant="primary">Primary</rukn-badge>
      <rukn-badge variant="success">Success</rukn-badge>
      <rukn-badge variant="warning">Warning</rukn-badge>
      <rukn-badge variant="destructive">Destructive</rukn-badge>
      <rukn-badge variant="neutral">Neutral</rukn-badge>
    </div>
  `,
};
