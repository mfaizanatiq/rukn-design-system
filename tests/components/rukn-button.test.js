'use strict';

const fs = require('fs');
const path = require('path');

const COMPONENT_FILE = path.join(__dirname, '../../components/rukn-ui.js');

let src;

beforeAll(() => {
  src = fs.readFileSync(COMPONENT_FILE, 'utf8');
});

describe('rukn-ui.js — class definitions', () => {
  test('defines RuknButton class', () => {
    expect(src).toMatch(/class\s+RuknButton\s+extends\s+HTMLElement/);
  });

  test('defines RuknCard class', () => {
    expect(src).toMatch(/class\s+RuknCard\s+extends\s+HTMLElement/);
  });

  test('defines RuknBadge class', () => {
    expect(src).toMatch(/class\s+RuknBadge\s+extends\s+HTMLElement/);
  });

  test('defines RuknAlert class', () => {
    expect(src).toMatch(/class\s+RuknAlert\s+extends\s+HTMLElement/);
  });
});

describe('rukn-ui.js — customElements.define registrations', () => {
  test("registers 'rukn-button'", () => {
    expect(src).toMatch(/customElements\.define\s*\(\s*['"]rukn-button['"]/);
  });

  test("registers 'rukn-card'", () => {
    expect(src).toMatch(/customElements\.define\s*\(\s*['"]rukn-card['"]/);
  });

  test("registers 'rukn-badge'", () => {
    expect(src).toMatch(/customElements\.define\s*\(\s*['"]rukn-badge['"]/);
  });

  test("registers 'rukn-alert'", () => {
    expect(src).toMatch(/customElements\.define\s*\(\s*['"]rukn-alert['"]/);
  });
});

describe('rukn-ui.js — Phase 3 memory-leak fix', () => {
  test('contains disconnectedCallback (Phase 3 fix)', () => {
    expect(src).toMatch(/disconnectedCallback\s*\(\s*\)/);
  });
});
