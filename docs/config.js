const {resolve, join} = require('path');

const OUT = '/docs-build';

const BASE = resolve(__dirname, '..');
const SOURCE = join(BASE, '/src');
const OUTPUT = join(BASE, OUT);
const APP = join(BASE, OUT, '/app');
const SITE = join(BASE, '/docs/base-package/site');
const ASSETS = join(BASE, OUT, '/assets');
const API_OUTPUT = 'api';
const GUIDE_SOURCE = join(BASE, '/docs/guide-package/guide/*.md');
const GUIDE_OUTPUT = 'guide';
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

module.exports = exports = {
  BASE,
  OUTPUT,
  SOURCE,
  APP,
  SITE,
  ASSETS,
  TYPESCRIPT_SOURCES,
  API_OUTPUT,
  TEMPLATES,
  GUIDE_SOURCE,
  GUIDE_OUTPUT
};
