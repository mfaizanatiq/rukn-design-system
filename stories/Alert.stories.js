import { el } from './_helpers.js';

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
  render: ({ variant, title, message, dismissible }) =>
    el(
      'div',
      { style: 'min-width:min(100%, 24rem)' },
      [
        el(
          'rukn-alert',
          {
            variant,
            title,
            dismissible: dismissible || undefined,
          },
          [message]
        ),
      ]
    ),
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
