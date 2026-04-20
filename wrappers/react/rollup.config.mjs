import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.tsx',

  // Never bundle peer deps or the core package
  external: ['react', 'react/jsx-runtime', 'react-dom', '@ruknds/core'],

  plugins: [
    // Automatically mark all peerDependencies as external
    peerDepsExternal(),

    // Resolve node_modules imports
    resolve({ extensions: ['.ts', '.tsx'] }),

    // Compile TypeScript
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.*', 'node_modules/**'],
    }),
  ],

  output: [
    // CommonJS — consumed by Node / older bundlers
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    // ES Module — consumed by Vite / Webpack / ESM-native environments
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
};
