'use strict';

/**
 * API surface tests for rukn-ui.js
 * Verifies that all components are present, registered, and expose their
 * expected public interface (attributes, events, lifecycle).
 */

const fs = require('fs');
const path = require('path');

const COMPONENT_FILE = path.join(__dirname, '../../components/rukn-ui.js');

let src;

beforeAll(() => {
  src = fs.readFileSync(COMPONENT_FILE, 'utf8');
});

// ─────────────────────────────────────────────────────────────────────────────
// All components registered
// ─────────────────────────────────────────────────────────────────────────────

const ALL_COMPONENTS = [
  'rukn-button',
  'rukn-card',
  'rukn-badge',
  'rukn-alert',
  'rukn-spinner',
  'rukn-progress',
  'rukn-modal',
  'rukn-input',
  'rukn-icon',
];

describe('rukn-ui.js — customElements.define coverage', () => {
  ALL_COMPONENTS.forEach((tag) => {
    test(`registers '${tag}'`, () => {
      expect(src).toMatch(
        new RegExp(`customElements\\.define\\s*\\(\\s*['"]${tag}['"]`)
      );
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Class definitions
// ─────────────────────────────────────────────────────────────────────────────

const CLASS_NAMES = [
  'RuknButton',
  'RuknCard',
  'RuknBadge',
  'RuknAlert',
  'RuknSpinner',
  'RuknProgress',
  'RuknModal',
  'RuknInput',
  'RuknIcon',
];

describe('rukn-ui.js — HTMLElement class definitions', () => {
  CLASS_NAMES.forEach((cls) => {
    test(`class ${cls} extends HTMLElement`, () => {
      expect(src).toMatch(
        new RegExp(`class\\s+${cls}\\s+extends\\s+HTMLElement`)
      );
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle callbacks
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — lifecycle callbacks', () => {
  test('all components implement connectedCallback', () => {
    const count = (src.match(/connectedCallback\s*\(\s*\)/g) || []).length;
    // At least as many connectedCallbacks as registered components
    expect(count).toBeGreaterThanOrEqual(ALL_COMPONENTS.length);
  });

  test('disconnectedCallback is implemented (memory-leak fix)', () => {
    expect(src).toMatch(/disconnectedCallback\s*\(\s*\)\s*\{/);
  });

  test('disconnectedCallback calls removeEventListener', () => {
    expect(src).toMatch(/removeEventListener\s*\(/);
  });

  test("removeEventListener targets 'rukn:languagechange'", () => {
    expect(src).toMatch(
      /removeEventListener\s*\(\s*['"]rukn:languagechange['"]/
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Memory-leak: addEventListener / removeEventListener balance
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — event listener balance', () => {
  test("addEventListener and removeEventListener counts match for 'rukn:languagechange'", () => {
    const adds = (
      src.match(/addEventListener\s*\(\s*['"]rukn:languagechange['"]/g) || []
    ).length;
    const removes = (
      src.match(/removeEventListener\s*\(\s*['"]rukn:languagechange['"]/g) || []
    ).length;
    expect(removes).toBe(adds);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RuknButton — variant & state attributes
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — RuknButton attribute support', () => {
  // Variants are consumed via getAttribute('variant') and mapped to CSS class suffix btn-${variant}
  test('variant attribute drives CSS class generation (btn-${variant} pattern)', () => {
    expect(src).toMatch(/btn-\$\{variant\}/);
  });

  test("variant attribute is read with getAttribute('variant')", () => {
    expect(src).toMatch(/getAttribute\s*\(\s*['"]variant['"]\s*\)/);
  });

  test('loading attribute is handled', () => {
    expect(src).toMatch(/loading/);
  });

  test('disabled attribute is handled', () => {
    expect(src).toMatch(/disabled/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RuknModal — open/close via instance methods
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — RuknModal open/close methods', () => {
  test('open() method is defined on RuknModal', () => {
    // Modal exposes open() and close() as instance methods
    expect(src).toMatch(/open\s*\(\s*\)\s*\{/);
  });

  test('close() method is defined on RuknModal', () => {
    expect(src).toMatch(/close\s*\(\s*\)\s*\{/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RTL / language change reaction
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — RTL language change handling', () => {
  test("listens for 'rukn:languagechange' on document", () => {
    expect(src).toMatch(
      /addEventListener\s*\(\s*['"]rukn:languagechange['"]/
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Window export
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-ui.js — window utility exports', () => {
  test('exports ruknSetPrimaryColor to window', () => {
    expect(src).toMatch(/window\.ruknSetPrimaryColor/);
  });
});
