'use strict';

/**
 * CSS Component Class Contract
 *
 * Verifies that every expected utility class, RTL selector, dark mode rule,
 * and design token exists in design-system.css. Any deletion or rename of a
 * class will fail this test before the change ships.
 */

const fs = require('fs');
const path = require('path');

const CSS_FILE = path.join(__dirname, '../../styles/design-system.css');
const VARS_FILE = path.join(__dirname, '../../styles/design-system-variables.css');

let cssContent;
let varsContent;

beforeAll(() => {
  cssContent = fs.readFileSync(CSS_FILE, 'utf8');
  varsContent = fs.readFileSync(VARS_FILE, 'utf8');
});

// ─────────────────────────────────────────────────────────────────────────────
// Core component classes
// ─────────────────────────────────────────────────────────────────────────────

// Buttons use .btn-* naming (e.g. .btn-primary); other components use .ds-* prefix
const CORE_CLASSES = [
  '.btn-primary',
  '.ds-card',
  '.ds-badge',
  '.ds-alert',
  '.ds-spinner',
  '.ds-input',
  '.ds-modal',
  '.ds-progress',
];

describe('CSS — core component classes are defined', () => {
  CORE_CLASSES.forEach((cls) => {
    test(`${cls} selector exists in design-system.css`, () => {
      const escaped = cls.replace(/\./g, '\\.');
      expect(cssContent).toMatch(new RegExp(escaped));
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — colors
// ─────────────────────────────────────────────────────────────────────────────

// Color tokens use the semantic short names (--primary, --secondary, etc.)
// rather than the --r-color-* prefix pattern.
const COLOR_TOKENS = [
  '--primary',
  '--secondary',
  '--success',
];

describe('CSS Token Contract — color tokens', () => {
  COLOR_TOKENS.forEach((token) => {
    test(`${token} is defined in variables`, () => {
      const re = new RegExp(token.replace(/-/g, '\\-') + '\\s*:');
      expect(varsContent).toMatch(re);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RTL layout selectors
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS — RTL layout rules', () => {
  test('[dir="rtl"] selector is present', () => {
    expect(cssContent).toMatch(/\[dir=['"]?rtl['"]?\]/);
  });

  test(':lang(ar) selector is present', () => {
    expect(cssContent).toMatch(/:lang\(ar\)/);
  });

  test(':lang(ur) selector is present', () => {
    expect(cssContent).toMatch(/:lang\(ur\)/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Dark mode support
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS — dark mode support', () => {
  test('.dark class is referenced', () => {
    expect(cssContent).toMatch(/\.dark\b/);
  });

  test('html:not(.dark) selector used for light-mode-only rules', () => {
    // Rukn uses html:not(.dark) pattern for light-mode-only styles
    expect(cssContent).toMatch(/html:not\(\.dark\)/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Glass morphism
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS — glass morphism signature', () => {
  test('backdrop-filter is used for glass effect', () => {
    expect(cssContent).toMatch(/backdrop-filter\s*:/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RTL font tokens
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS Token Contract — RTL font tokens', () => {
  test('--r-font-arabic is defined', () => {
    expect(varsContent).toMatch(/--r-font-arabic\s*:/);
  });

  test('--r-font-urdu is defined', () => {
    expect(varsContent).toMatch(/--r-font-urdu\s*:/);
  });

  test('--r-line-height-urdu-base is defined (Nastaliq spacing)', () => {
    expect(varsContent).toMatch(/--r-line-height-urdu-base\s*:/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Spacing scale completeness
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS Token Contract — spacing scale', () => {
  const spacingTokens = [
    '--r-space-1',
    '--r-space-2',
    '--r-space-4',
    '--r-space-6',
    '--r-space-8',
  ];

  spacingTokens.forEach((token) => {
    test(`${token} is defined`, () => {
      const re = new RegExp(token.replace(/-/g, '\\-') + '\\s*:');
      expect(varsContent).toMatch(re);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Token naming convention
// ─────────────────────────────────────────────────────────────────────────────

describe('CSS Token Contract — naming convention', () => {
  test('canonical RTL tokens use --r- prefix', () => {
    expect(varsContent).toMatch(/--r-font-arabic/);
    expect(varsContent).toMatch(/--r-font-urdu/);
    expect(varsContent).toMatch(/--r-ease-ios-standard/);
    expect(varsContent).toMatch(/--r-space-4/);
  });
});
