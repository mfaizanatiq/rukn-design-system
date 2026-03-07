'use strict';

const fs = require('fs');
const path = require('path');

const COMPONENT_FILE = path.join(__dirname, '../../components/rukn-ui.js');

let src;

beforeAll(() => {
  src = fs.readFileSync(COMPONENT_FILE, 'utf8');
});

describe('Slot-content regression — saving original children', () => {
  test('connectedCallback saves _originalSlotContent', () => {
    // The fix captures children before innerHTML is overwritten
    expect(src).toMatch(/_originalSlotContent\s*=/);
  });

  test('_originalSlotContent is populated with cloned child nodes', () => {
    // Verify the save is done via cloneNode so the originals are preserved
    expect(src).toMatch(/_originalSlotContent\s*=\s*Array\.from\s*\(\s*this\.childNodes\s*\)\s*\.map\s*\(\s*\S+\s*=>\s*\S+\.cloneNode\s*\(\s*true\s*\)/);
  });
});

describe('Slot-content regression — render() restores content via cloneNode', () => {
  test('render() calls cloneNode when applying slot content', () => {
    // Each render call must clone the saved nodes rather than moving them,
    // so repeated renders do not exhaust the saved list.
    expect(src).toMatch(/ruknApplySlotContent\s*\(.*cloneNode\s*\(\s*true\s*\)/s);
  });
});
