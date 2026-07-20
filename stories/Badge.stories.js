import { el, row } from './_helpers.js';

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
  render: ({ variant, label }) => el('rukn-badge', { variant }, [label]),
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
  render: () =>
    row({ gap: '0.5rem' }, [
      el('rukn-badge', { variant: 'primary' }, ['Primary']),
      el('rukn-badge', { variant: 'success' }, ['Success']),
      el('rukn-badge', { variant: 'warning' }, ['Warning']),
      el('rukn-badge', { variant: 'destructive' }, ['Destructive']),
      el('rukn-badge', { variant: 'neutral' }, ['Neutral']),
    ]),
};
