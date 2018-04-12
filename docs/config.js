const {resolve, join} = require('path');

const OUT = '/docs-build';

const BASE = resolve(__dirname, '..');
const SOURCE = join(BASE, '/src');
const OUTPUT = join(BASE, OUT, '/app/api');
const TEMPLATES = ['./docs/templates/'];

const TYPESCRIPT_SOURCES = [
  {include: './components/**/*.ts', exclude: './**/*.spec.ts'},
  {include: './services/**/*.ts', exclude: './**/test/*.ts'},
  './classes/**/*.ts',
  './interfaces/**/*.ts',
  './types.ts'
].map(s => {
  if (typeof s === 'string') {
    return resolve(SOURCE, s);
  }
  return {
    include: resolve(SOURCE, s.include),
    exclude: resolve(SOURCE, s.exclude)
  };
});

module.exports = exports = {BASE, SOURCE, TYPESCRIPT_SOURCES, OUTPUT, TEMPLATES};
