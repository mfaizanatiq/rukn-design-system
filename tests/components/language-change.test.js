'use strict';

const fs = require('fs');
const path = require('path');

const COMPONENT_FILE = path.join(__dirname, '../../components/rukn-ui.js');

let src;

beforeAll(() => {
  src = fs.readFileSync(COMPONENT_FILE, 'utf8');
});

describe('Memory-leak regression — disconnectedCallback cleanup', () => {
  test('disconnectedCallback is defined', () => {
    expect(src).toMatch(/disconnectedCallback\s*\(\s*\)\s*\{/);
  });

  test('disconnectedCallback calls removeEventListener', () => {
    expect(src).toMatch(/removeEventListener\s*\(/);
  });

  test("removeEventListener targets the 'rukn:languagechange' event", () => {
    expect(src).toMatch(/removeEventListener\s*\(\s*['"]rukn:languagechange['"]/);
  });
});

describe('Memory-leak regression — addEventListener pairing', () => {
  test("addEventListener is called for 'rukn:languagechange'", () => {
    expect(src).toMatch(/addEventListener\s*\(\s*['"]rukn:languagechange['"]/);
  });

  test('addEventListener and removeEventListener call counts are balanced', () => {
    const addMatches = (src.match(/addEventListener\s*\(\s*['"]rukn:languagechange['"]/g) || []).length;
    const removeMatches = (src.match(/removeEventListener\s*\(\s*['"]rukn:languagechange['"]/g) || []).length;

    // Every component that subscribes must also unsubscribe
    expect(removeMatches).toBe(addMatches);
  });
});
