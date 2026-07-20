import { el, stack } from './_helpers.js';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Input',
  component: 'rukn-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'text',
    placeholder: 'Your name',
    value: '',
    disabled: false,
  },
  render: ({ type, placeholder, value, disabled }) =>
    stack({ 'min-width': '16rem', gap: '0.5rem' }, [
      el('label', { class: 'ds-label', for: 'story-input' }, ['Label']),
      el('rukn-input', {
        id: 'story-input',
        type,
        placeholder,
        value: value || undefined,
        disabled: disabled || undefined,
      }),
    ]),
};

export default meta;

export const Default = {};

export const WithValue = {
  args: { value: 'Rukn', placeholder: '' },
};

export const Disabled = {
  args: { disabled: true, value: 'Read only' },
};

export const CssPrimitive = {
  name: 'CSS primitive',
  render: () =>
    stack({ 'min-width': '16rem', gap: '0.5rem' }, [
      el('label', { class: 'ds-label' }, ['Email']),
      el('input', { class: 'ds-input', type: 'email', placeholder: 'you@example.com' }),
    ]),
};
