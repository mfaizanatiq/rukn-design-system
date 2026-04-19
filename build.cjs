#!/usr/bin/env node
/**
 * Rukn Design System — Build Script
 * Produces dist/rukn.css and dist/rukn.js ready for CDN / direct <script> use.
 * Zero third-party dependencies — pure Node.js.
 */

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// ─── helpers ───────────────────────────────────────────────────────────────

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, content) {
  fs.writeFileSync(path.join(DIST, file), content, 'utf8');
  const kb = (Buffer.byteLength(content) / 1024).toFixed(1);
  console.log(`  ✓  dist/${file}  (${kb} KB)`);
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')   // strip comments
    .replace(/\s*\n\s*/g, '\n')          // collapse blank lines
    .replace(/[ \t]+/g, ' ')             // collapse inline whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, '$1') // strip space around syntax chars
    .replace(/;}/g, '}')                  // remove last ; in block
    .replace(/\n+/g, '\n')               // collapse multiple newlines
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')    // strip block comments
    .replace(/\/\/[^\n]*/g, '')           // strip line comments
    .replace(/[ \t]+/g, ' ')             // collapse whitespace
    .replace(/\n\s*\n/g, '\n')           // collapse blank lines
    .trim();
}

// ─── build ─────────────────────────────────────────────────────────────────

fs.mkdirSync(DIST, { recursive: true });

console.log('\n🔨  Building Rukn Design System...\n');

// ── CSS ──────────────────────────────────────────────────────────────────────
const banner = `/* Rukn Design System v2.2.0 | MIT License | https://rukn.design */\n`;

const css = [
  'styles/design-system-variables.css',
  'styles/design-system.css',
].map(read).join('\n');

write('rukn.css',     banner + css);
write('rukn.min.css', banner + minifyCSS(css));

// ── JS ───────────────────────────────────────────────────────────────────────
// Wrap each ESM component in a self-contained IIFE context.
// We strip `export` keywords and wrap all source in one IIFE so it works
// via a plain <script src="rukn.js"></script> with no bundler needed.

const jsBanner = `/* Rukn Design System v2.2.0 | MIT License | https://rukn.design */\n`;

const jsFiles = [
  'components/rukn-ui.js',
  'components/rukn-footer.js',
  'components/rukn-navbar.js',
  'components/rukn-sidebar.js',
];

const rawJS = jsFiles.map(f => {
  let src = read(f);
  // Remove ES module export statements (we don't need them in IIFE bundle)
  src = src.replace(/^export\s+default\s+/gm, '');
  src = src.replace(/^export\s+\{[^}]*\}\s*;?\s*$/gm, '');
  src = src.replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ');
  return `\n// ── ${path.basename(f)} ──\n` + src;
}).join('\n');

const iife = `${jsBanner}(function (global) {
  'use strict';
${rawJS}
  // Expose public API on window.RuknDS
  if (typeof window !== 'undefined') {
    window.RuknDS = {
      version: '2.2.0',
      setColor: typeof ruknSetPrimaryColor !== 'undefined' ? ruknSetPrimaryColor : undefined,
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
`;

write('rukn.js',     jsBanner + rawJS);
write('rukn.min.js', minifyJS(iife));

// ── Snippet file ─────────────────────────────────────────────────────────────
const snippet = `<!-- Rukn Design System v2.2.0 — drop this into <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mfaizanatiq/RuknDesignSystem@main/dist/rukn.min.css">
<script src="https://cdn.jsdelivr.net/gh/mfaizanatiq/RuknDesignSystem@main/dist/rukn.min.js" defer></script>

<!-- Self-hosted (copy dist/ to your project) -->
<link rel="stylesheet" href="./dist/rukn.min.css">
<script src="./dist/rukn.min.js" defer></script>

<!-- npm -->
<!-- npm install @ruknds/core -->
<!-- import '@ruknds/core/styles/design-system.css' -->
<!-- import '@ruknds/core/components/rukn-navbar.js'  -->
`;

write('embed.txt', snippet);

// ── sizes ─────────────────────────────────────────────────────────────────────
const files = ['rukn.css','rukn.min.css','rukn.js','rukn.min.js'];
console.log('\n📦  Bundle sizes:\n');
files.forEach(f => {
  const raw  = Buffer.byteLength(fs.readFileSync(path.join(DIST, f)));
  console.log(`     ${f.padEnd(16)} ${(raw/1024).toFixed(1).padStart(6)} KB`);
});
console.log('\n✅  Done — dist/ is ready.\n');
