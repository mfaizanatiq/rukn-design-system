/**
 * Tiny DOM helpers for Storybook.
 * Rukn components manage their own light DOM via innerHTML, so Lit templates
 * that project children into <rukn-*> blow up on re-render (insertBefore null).
 */

/**
 * @param {string} tag
 * @param {Record<string, string|number|boolean|null|undefined>} [attrs]
 * @param {(Node|string)[]} [children]
 * @returns {HTMLElement}
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (value === false || value === null || value === undefined) return;
    if (value === true) {
      node.setAttribute(key, '');
      return;
    }
    node.setAttribute(key, String(value));
  });

  children.forEach((child) => {
    if (child === null || child === undefined || child === false) return;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });

  return node;
}

/**
 * @param {Record<string, string>} [styles]
 * @param {(Node|string)[]} [children]
 * @returns {HTMLElement}
 */
export function row(styles = {}, children = []) {
  return el(
    'div',
    {
      style: Object.entries({
        display: 'flex',
        gap: '0.75rem',
        'align-items': 'center',
        'flex-wrap': 'wrap',
        ...styles,
      })
        .map(([k, v]) => `${k}:${v}`)
        .join(';'),
    },
    children
  );
}

/**
 * @param {Record<string, string>} [styles]
 * @param {(Node|string)[]} [children]
 * @returns {HTMLElement}
 */
export function stack(styles = {}, children = []) {
  return el(
    'div',
    {
      style: Object.entries({
        display: 'grid',
        gap: '0.75rem',
        ...styles,
      })
        .map(([k, v]) => `${k}:${v}`)
        .join(';'),
    },
    children
  );
}
