'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');

function readHtml(filename) {
  return fs.readFileSync(path.join(ROOT, filename), 'utf8');
}

let indexHtml;
let componentsHtml;
let foundationHtml;

beforeAll(() => {
  indexHtml = readHtml('index.html');
  componentsHtml = readHtml('components.html');
  foundationHtml = readHtml('foundation.html');
});

// ---------------------------------------------------------------------------
// CSS link-tag assertions
// ---------------------------------------------------------------------------

describe('Smoke test — index.html CSS links', () => {
  test('dogfoods the built CSS bundle', () => {
    expect(indexHtml).toMatch(/href=["'][^"']*dist\/rukn\.min\.css["']/);
  });
});

describe('Smoke test — components.html CSS links', () => {
  test('dogfoods the built CSS bundle', () => {
    expect(componentsHtml).toMatch(/href=["'][^"']*dist\/rukn\.min\.css["']/);
  });
});

describe('Smoke test — foundation.html CSS links', () => {
  test('dogfoods the built CSS bundle', () => {
    expect(foundationHtml).toMatch(/href=["'][^"']*dist\/rukn\.min\.css["']/);
  });
});

describe('Smoke test — docs site JavaScript', () => {
  test('all primary pages dogfood the built JS bundle', () => {
    [indexHtml, componentsHtml, foundationHtml].forEach((html) => {
      expect(html).toMatch(/src=["'][^"']*dist\/rukn\.min\.js["']/);
    });
  });
});

// ---------------------------------------------------------------------------
// Version assertion
// ---------------------------------------------------------------------------

describe('Smoke test — index.html version', () => {
  test('contains version 2.2.0', () => {
    expect(indexHtml).toMatch(/2\.2\.0/);
  });
});

// ---------------------------------------------------------------------------
// RTL meta content
// ---------------------------------------------------------------------------

describe('Smoke test — index.html RTL content', () => {
  test('contains RTL-related meta content (rtl or arabic or urdu)', () => {
    // The page must declare RTL/multilingual relevance in its meta tags
    const metaSection = indexHtml.slice(0, indexHtml.indexOf('</head>') + 7);
    expect(metaSection).toMatch(/rtl|arabic|urdu/i);
  });
});
