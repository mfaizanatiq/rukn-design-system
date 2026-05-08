'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const pkg = require(path.join(ROOT, 'package.json'));

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

describe('package.json — public contract', () => {
  test('publishes TypeScript declarations', () => {
    expect(pkg.types).toBe('./types.d.ts');
    expect(pkg.files).toContain('types.d.ts');
  });

  test('declares side effects for CSS and self-registering components', () => {
    expect(pkg.sideEffects).toEqual(expect.arrayContaining([
      '*.css',
      'styles/*.css',
      'components/*.js',
      'dist/*.js',
    ]));
  });

  test('exports documented convenience paths', () => {
    expect(pkg.exports).toMatchObject({
      './css': './styles/design-system.css',
      './variables': './styles/design-system-variables.css',
      './helpers': './scripts/modal-drawer-helpers.js',
      './button': './components/rukn-button.js',
      './card': './components/rukn-card.js',
      './navbar': './components/rukn-navbar.js',
    });
  });

  test('provides CDN entry metadata', () => {
    expect(pkg.unpkg).toBe('dist/rukn.min.js');
    expect(pkg.jsdelivr).toBe('dist/rukn.min.js');
  });
});

describe('dist bundle — direct browser contract', () => {
  test('minified bundle is an IIFE direct-script build', () => {
    const js = read('dist/rukn.min.js');
    expect(js).toMatch(/function \(global\)/);
    expect(js).toMatch(/window\.RuknDS/);
  });

  test('unminified bundle is also direct-script safe', () => {
    const js = read('dist/rukn.js');
    expect(js).toMatch(/function \(global\)/);
    expect(js).toMatch(/window\.RuknDS/);
  });
});

describe('custom elements — duplicate load safety', () => {
  const componentFiles = [
    'components/rukn-ui.js',
    'components/rukn-navbar.js',
    'components/rukn-sidebar.js',
    'components/rukn-footer.js',
  ];

  componentFiles.forEach((file) => {
    test(`${file} guards customElements.define`, () => {
      const src = read(file);
      const defines = (src.match(/customElements\.define\s*\(/g) || []).length;
      const guards = (src.match(/customElements\.get\s*\(/g) || []).length;
      expect(guards).toBeGreaterThanOrEqual(defines);
    });
  });
});
