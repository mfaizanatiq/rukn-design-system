import { html } from 'lit';

/** @type {import('@storybook/web-components').Meta} */
const meta = {
  title: 'Components/Spinner & Progress',
  tags: ['autodocs'],
};

export default meta;

export const Spinner = {
  render: () => html`
    <div style="display:flex; gap:1.25rem; align-items:center;">
      <rukn-spinner size="sm"></rukn-spinner>
      <rukn-spinner size="md"></rukn-spinner>
      <rukn-spinner size="lg"></rukn-spinner>
    </div>
  `,
};

export const Progress = {
  render: () => html`
    <div style="display:grid; gap:1rem; min-width:16rem;">
      <rukn-progress value="35"></rukn-progress>
      <rukn-progress value="70" variant="success"></rukn-progress>
      <rukn-progress indeterminate></rukn-progress>
    </div>
  `,
};
