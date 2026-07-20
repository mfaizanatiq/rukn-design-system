import { html } from 'lit';

/**
 * @typedef {Object} ButtonArgs
 * @property {'primary'|'secondary'|'outline'|'ghost'|'destructive'} variant
 * @property {'sm'|'md'|'lg'} size
 * @property {string} label
 * @property {boolean} disabled
 * @property {boolean} loading
 */

/** @type {import('@storybook/web-components').Meta<ButtonArgs>} */
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
  render: ({ variant, size, label, disabled, loading }) => html`
    <rukn-button
      variant=${variant}
      size=${size}
      ?disabled=${disabled}
      ?loading=${loading}
    >${label}</rukn-button>
  `,
};

export default meta;

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Primary = {};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Secondary = {
  args: { variant: 'secondary', label: 'Secondary' },
};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Outline = {
  args: { variant: 'outline', label: 'Outline' },
};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Ghost = {
  args: { variant: 'ghost', label: 'Ghost' },
};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Destructive = {
  args: { variant: 'destructive', label: 'Delete' },
};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Loading = {
  args: { loading: true, label: 'Saving' },
};

/** @type {import('@storybook/web-components').StoryObj<ButtonArgs>} */
export const Sizes = {
  render: () => html`
    <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
      <rukn-button variant="primary" size="sm">Small</rukn-button>
      <rukn-button variant="primary" size="md">Medium</rukn-button>
      <rukn-button variant="primary" size="lg">Large</rukn-button>
    </div>
  `,
};

/** CSS-class primitives (no Web Component) */
export const CssPrimitives = {
  name: 'CSS primitives',
  render: () => html`
    <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
      <button class="btn-primary">btn-primary</button>
      <button class="btn-secondary">btn-secondary</button>
      <button class="btn-outline">btn-outline</button>
      <button class="btn-ghost">btn-ghost</button>
      <button class="btn-destructive">btn-destructive</button>
    </div>
  `,
};
