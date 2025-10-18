const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve').default;

module.exports = {
  input: 'src/github-stars.user.ts',
  output: {
    file: 'github-stars.user.js',
    format: 'iife',
    banner: `// ==UserScript==
// @name         GitHub Stars Links
// @namespace    https://itenium.be
// @author       Wouter Van Schandevijl
// @match        https://*
// @grant        none
// ==/UserScript==
`,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: false,
      target: 'ES2015',
      lib: ['ES2019', 'DOM'],
      module: 'ESNext',
      include: ['src/**/*'],
      exclude: ['tests/**/*', 'node_modules/**/*'],
    }),
  ],
};
