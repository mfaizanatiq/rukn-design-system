import { el, row } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Button',
  component: 'rukn-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Continue',
    disabled: false,
    loading: false,
  },
  render: ({ variant, size, label, disabled, loading }) =>
    el(
      'rukn-button',
      {
        variant,
        size,
        disabled: disabled || undefined,
        loading: loading || undefined,
      },
      [label]
    ),
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: { variant: 'secondary', label: 'Secondary' },
};

export const Outline = {
  args: { variant: 'outline', label: 'Outline' },
};

export const Ghost = {
  args: { variant: 'ghost', label: 'Ghost' },
};

export const Destructive = {
  args: { variant: 'destructive', label: 'Delete' },
};

export const Loading = {
  args: { loading: true, label: 'Saving' },
};

export const Sizes = {
  render: () =>
    row({}, [
      el('rukn-button', { variant: 'primary', size: 'sm' }, ['Small']),
      el('rukn-button', { variant: 'primary', size: 'md' }, ['Medium']),
      el('rukn-button', { variant: 'primary', size: 'lg' }, ['Large']),
    ]),
};

export const CssPrimitives = {
  name: 'CSS primitives',
  render: () =>
    row({}, [
      el('button', { class: 'btn-primary' }, ['btn-primary']),
      el('button', { class: 'btn-secondary' }, ['btn-secondary']),
      el('button', { class: 'btn-outline' }, ['btn-outline']),
      el('button', { class: 'btn-ghost' }, ['btn-ghost']),
      el('button', { class: 'btn-destructive' }, ['btn-destructive']),
    ]),
};
