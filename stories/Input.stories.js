import { html } from 'lit';

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
  render: ({ type, placeholder, value, disabled }) => html`
    <div style="display:grid; gap:0.5rem; min-width:16rem;">
      <label class="ds-label" for="story-input">Label</label>
      <rukn-input
        id="story-input"
        type=${type}
        placeholder=${placeholder}
        value=${value}
        ?disabled=${disabled}
      ></rukn-input>
    </div>
  `,
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
  render: () => html`
    <div style="display:grid; gap:0.5rem; min-width:16rem;">
      <label class="ds-label">Email</label>
      <input class="ds-input" type="email" placeholder="you@example.com" />
    </div>
  `,
};
