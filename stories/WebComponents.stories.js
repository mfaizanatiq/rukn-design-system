import { el, row, stack } from './_helpers.js';

/**
 * Optional Web Component wrappers — they render the same CSS classes inside.
 * Prefer Gallery/* stories for visual parity with the website.
 * @type {import('@storybook/web-components').Meta}
 */
const meta = {
  title: 'Web Components/API',
  tags: ['autodocs'],
};

export default meta;

export const Button = {
  render: () =>
    row({ gap: 'var(--space-2)', 'flex-wrap': 'wrap' }, [
      el('rukn-button', { variant: 'primary' }, ['Primary']),
      el('rukn-button', { variant: 'secondary' }, ['Secondary']),
      el('rukn-button', { variant: 'outline' }, ['Outline']),
      el('rukn-button', { variant: 'ghost' }, ['Ghost']),
      el('rukn-button', { variant: 'destructive' }, ['Destructive']),
    ]),
};

export const Badge = {
  render: () =>
    row({ gap: 'var(--space-2)' }, [
      el('rukn-badge', { variant: 'primary' }, ['Primary']),
      el('rukn-badge', { variant: 'success' }, ['Success']),
      el('rukn-badge', { variant: 'warning' }, ['Warning']),
      el('rukn-badge', { variant: 'neutral' }, ['Neutral']),
    ]),
};

export const Card = {
  render: () =>
    el('rukn-card', { style: 'max-width:22rem' }, [
      el('h4', {}, ['rukn-card']),
      el(
        'p',
        { style: 'color:hsl(var(--foreground) / 0.7);margin:var(--space-2) 0' },
        ['Wraps ds-card. Prefer Gallery/Card for site-identical markup.']
      ),
      el('button', { class: 'btn-primary btn-sm' }, ['Action']),
    ]),
};

export const SpinnerProgress = {
  name: 'Spinner & Progress',
  render: () =>
    stack({ gap: '1rem', 'min-width': '16rem' }, [
      row({ gap: '1.25rem' }, [
        el('rukn-spinner', { size: 'sm' }),
        el('rukn-spinner', { size: 'md' }),
        el('rukn-spinner', { size: 'lg' }),
      ]),
      el('rukn-progress', { value: '35' }),
      el('rukn-progress', { value: '70', variant: 'success' }),
    ]),
};
