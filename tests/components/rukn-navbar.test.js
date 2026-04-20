'use strict';

const fs = require('fs');
const path = require('path');

const NAVBAR_FILE = path.join(__dirname, '../../components/rukn-navbar.js');

let src;

beforeAll(() => {
  src = fs.readFileSync(NAVBAR_FILE, 'utf8');
});

// ─────────────────────────────────────────────────────────────────────────────
// Class definition & registration
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — class definition', () => {
  test('defines RuknNavbar class extending HTMLElement', () => {
    expect(src).toMatch(/class\s+RuknNavbar\s+extends\s+HTMLElement/);
  });

  test("registers 'rukn-navbar' with customElements.define", () => {
    expect(src).toMatch(/customElements\.define\s*\(\s*['"]rukn-navbar['"]/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle callbacks
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — lifecycle callbacks', () => {
  test('implements connectedCallback', () => {
    expect(src).toMatch(/connectedCallback\s*\(\s*\)/);
  });

  test('implements disconnectedCallback for cleanup', () => {
    expect(src).toMatch(/disconnectedCallback\s*\(\s*\)/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Observed attributes
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — observed attributes', () => {
  test("observes 'current' attribute", () => {
    expect(src).toMatch(/'current'/);
  });

  test("observes 'search' attribute", () => {
    expect(src).toMatch(/'search'/);
  });

  test("observes 'logo-src' attribute", () => {
    expect(src).toMatch(/'logo-src'/);
  });

  test("observes 'brand-text' attribute", () => {
    expect(src).toMatch(/'brand-text'/);
  });

  test("observes 'brand-href' attribute", () => {
    expect(src).toMatch(/'brand-href'/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// RTL & multilingual support
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — RTL language constants', () => {
  test('defines RUKN_RTL_LANGUAGES constant', () => {
    expect(src).toMatch(/RUKN_RTL_LANGUAGES/);
  });

  test("RUKN_RTL_LANGUAGES includes 'ar'", () => {
    const match = src.match(/RUKN_RTL_LANGUAGES\s*=\s*\[([^\]]+)\]/);
    expect(match).not.toBeNull();
    expect(match[1]).toContain("'ar'");
  });

  test("RUKN_RTL_LANGUAGES includes 'ur'", () => {
    const match = src.match(/RUKN_RTL_LANGUAGES\s*=\s*\[([^\]]+)\]/);
    expect(match).not.toBeNull();
    expect(match[1]).toContain("'ur'");
  });

  test('defines RUKN_SUPPORTED_LANGUAGES constant', () => {
    expect(src).toMatch(/RUKN_SUPPORTED_LANGUAGES/);
  });
});

describe('rukn-navbar.js — language change event', () => {
  test("dispatches 'rukn:languagechange' custom event", () => {
    expect(src).toMatch(/['"]rukn:languagechange['"]/);
  });

  test('event detail includes language field', () => {
    expect(src).toMatch(/detail\s*:\s*\{[^}]*language/);
  });

  test('uses CustomEvent to dispatch the language change', () => {
    expect(src).toMatch(/new\s+CustomEvent\s*\(\s*['"]rukn:languagechange['"]/);
  });
});

describe('rukn-navbar.js — language persistence', () => {
  test('defines RUKN_LANGUAGE_STORAGE_KEY constant', () => {
    expect(src).toMatch(/RUKN_LANGUAGE_STORAGE_KEY/);
  });

  test('reads from localStorage on init', () => {
    expect(src).toMatch(/localStorage\.getItem/);
  });

  test('writes to localStorage on language change', () => {
    expect(src).toMatch(/localStorage\.setItem/);
  });
});

describe('rukn-navbar.js — native language names', () => {
  test('defines RUKN_NATIVE_LANGUAGE_NAMES', () => {
    expect(src).toMatch(/RUKN_NATIVE_LANGUAGE_NAMES/);
  });

  test("includes Arabic native name 'العربية'", () => {
    expect(src).toMatch(/العربية/);
  });

  test("includes Urdu native name 'اردو'", () => {
    expect(src).toMatch(/اردو/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Dark mode support
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — dark mode', () => {
  test('defines RUKN_DARK_MODE_STORAGE_KEY constant', () => {
    expect(src).toMatch(/RUKN_DARK_MODE_STORAGE_KEY/);
  });

  test('toggles .dark class on document.documentElement', () => {
    expect(src).toMatch(/documentElement/);
    expect(src).toMatch(/['"]dark['"]/);
  });

  test('persists dark mode preference to localStorage', () => {
    expect(src).toMatch(/RUKN_DARK_MODE_STORAGE_KEY/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Cleanup (memory leaks)
// ─────────────────────────────────────────────────────────────────────────────

describe('rukn-navbar.js — cleanup in disconnectedCallback', () => {
  test('stores cleanup function for scroll listener', () => {
    expect(src).toMatch(/_cleanupScroll/);
  });

  test('calls cleanup function in disconnectedCallback', () => {
    // The disconnectedCallback body should reference the cleanup property
    const disconnectedSection = src.slice(
      src.indexOf('disconnectedCallback'),
      src.indexOf('disconnectedCallback') + 300
    );
    expect(disconnectedSection).toMatch(/_cleanup/);
  });
});
