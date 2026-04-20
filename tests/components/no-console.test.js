'use strict';

/**
 * Regression guard: no console.log or console.warn in any production component file.
 *
 * This test ensures console statements removed in DES-190 are never accidentally
 * re-introduced. Run this in CI on every PR.
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../../components');

const PRODUCTION_FILES = [
  'rukn-ui.js',
  'rukn-navbar.js',
  'rukn-sidebar.js',
  'rukn-footer.js',
];

describe('Production code — no console.log statements', () => {
  PRODUCTION_FILES.forEach((filename) => {
    const fullPath = path.join(COMPONENTS_DIR, filename);

    if (!fs.existsSync(fullPath)) return;

    test(`${filename} has no console.log calls`, () => {
      const src = fs.readFileSync(fullPath, 'utf8');
      const matches = src.match(/console\.log\s*\(/g) || [];
      expect(matches).toHaveLength(0);
    });
  });
});

describe('Production code — no console.warn statements', () => {
  PRODUCTION_FILES.forEach((filename) => {
    const fullPath = path.join(COMPONENTS_DIR, filename);

    if (!fs.existsSync(fullPath)) return;

    test(`${filename} has no console.warn calls`, () => {
      const src = fs.readFileSync(fullPath, 'utf8');
      const matches = src.match(/console\.warn\s*\(/g) || [];
      expect(matches).toHaveLength(0);
    });
  });
});

describe('Production code — no console.error statements', () => {
  PRODUCTION_FILES.forEach((filename) => {
    const fullPath = path.join(COMPONENTS_DIR, filename);

    if (!fs.existsSync(fullPath)) return;

    test(`${filename} has no console.error calls`, () => {
      const src = fs.readFileSync(fullPath, 'utf8');
      const matches = src.match(/console\.error\s*\(/g) || [];
      expect(matches).toHaveLength(0);
    });
  });
});
