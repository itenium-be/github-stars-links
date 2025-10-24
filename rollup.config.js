const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve').default;

const commonPlugins = [
  resolve(),
  typescript({
    tsconfig: false,
    target: 'ES2017',
    lib: ['ES2019', 'DOM'],
    module: 'ESNext',
    include: ['src/**/*'],
    exclude: ['tests/**/*', 'node_modules/**/*'],
  }),
];

module.exports = [
  {
    input: 'src/starify-links.user.ts',
    output: {
      file: 'dist/starify-links.user.js',
      format: 'iife',
      banner: `// ==UserScript==
// @name         Starify Links
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://*
// @grant        none
// ==/UserScript==
`,
    },
    plugins: commonPlugins,
  },
  {
    input: 'src/options/options.ts',
    output: {
      file: 'dist/options.js',
      format: 'iife',
    },
    plugins: commonPlugins,
  }
];
