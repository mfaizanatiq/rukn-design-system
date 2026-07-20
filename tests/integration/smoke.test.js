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
  test('links design-system-variables.css', () => {
    expect(indexHtml).toMatch(/href=["'][^"']*design-system-variables\.css["']/);
  });

  test('links design-system.css', () => {
    expect(indexHtml).toMatch(/href=["'][^"']*design-system\.css["']/);
  });
});

describe('Smoke test — components.html CSS links', () => {
  test('links design-system-variables.css', () => {
    expect(componentsHtml).toMatch(/href=["'][^"']*design-system-variables\.css["']/);
  });

  test('links design-system.css', () => {
    expect(componentsHtml).toMatch(/href=["'][^"']*design-system\.css["']/);
  });
});

describe('Smoke test — foundation.html CSS links', () => {
  test('links design-system-variables.css', () => {
    expect(foundationHtml).toMatch(/href=["'][^"']*design-system-variables\.css["']/);
  });

  test('links design-system.css', () => {
    expect(foundationHtml).toMatch(/href=["'][^"']*design-system\.css["']/);
  });
});

describe('Smoke test — docs site JavaScript', () => {
  test('index.html loads navbar, footer, and ui components', () => {
    expect(indexHtml).toMatch(/src=["'][^"']*components\/rukn-navbar\.js["']/);
    expect(indexHtml).toMatch(/src=["'][^"']*components\/rukn-footer\.js["']/);
    expect(indexHtml).toMatch(/src=["'][^"']*components\/rukn-ui\.js["']/);
  });

  test('components and foundation pages load layout components', () => {
    [componentsHtml, foundationHtml].forEach((html) => {
      expect(html).toMatch(/src=["'][^"']*components\/rukn-navbar\.js["']/);
      expect(html).toMatch(/src=["'][^"']*components\/rukn-sidebar\.js["']/);
      expect(html).toMatch(/src=["'][^"']*components\/rukn-ui\.js["']/);
    });
  });
});

describe('Smoke test — agent documentation', () => {
  test('ships AGENTS.md and DESIGN.md for AI agents', () => {
    expect(fs.existsSync(path.join(ROOT, 'AGENTS.md'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'DESIGN.md'))).toBe(true);
  });

  test('ships components.json, llms.txt, and Cursor rules', () => {
    expect(fs.existsSync(path.join(ROOT, 'components.json'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'llms.txt'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, '.cursor/rules/rukn-design-system.mdc'))).toBe(true);
  });

  test('DESIGN.md links to component API and gallery', () => {
    const design = fs.readFileSync(path.join(ROOT, 'DESIGN.md'), 'utf8');
    expect(design).toMatch(/COMPONENT_API\.md/);
    expect(design).toMatch(/components\.html/);
  });

  test('components.json exposes webComponents and cssClasses', () => {
    const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'components.json'), 'utf8'));
    expect(catalog.webComponents.length).toBeGreaterThan(5);
    expect(catalog.cssClasses.length).toBeGreaterThan(10);
    expect(catalog.bootstrap.cdn.css).toMatch(/rukn\.min\.css/);
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
    const metaSection = indexHtml.slice(0, indexHtml.indexOf('</head>') + 7);
    expect(metaSection).toMatch(/rtl|arabic|urdu/i);
  });
});
