import { html } from 'lit';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Alert',
  component: 'rukn-alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'destructive'],
    },
    title: { control: 'text' },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    message: 'Rukn alerts map to ds-alert tokens for consistent feedback.',
    dismissible: false,
  },
  render: ({ variant, title, message, dismissible }) => html`
    <div style="min-width:min(100%, 24rem);">
      <rukn-alert
        variant=${variant}
        title=${title}
        ?dismissible=${dismissible}
      >${message}</rukn-alert>
    </div>
  `,
};

export default meta;

export const Info = {};

export const Success = {
  args: {
    variant: 'success',
    title: 'Saved',
    message: 'Your changes are live.',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Check direction',
    message: 'Set lang and dir for Arabic and Urdu pages.',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    title: 'Action failed',
    message: 'Could not publish. Try again.',
    dismissible: true,
  },
};
