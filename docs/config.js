const {resolve, join} = require('path');

const OUT = '/docs-build';

const BASE = resolve(__dirname, '..');
const SOURCE = join(BASE, '/src');
const OUTPUT = join(BASE, OUT);
const APP = join(BASE, OUT, '/app');
const SITE = join(BASE, '/docs/base-package/site');
const DEMO = join(BASE, '/demo/app');
const DEMO_OUTPUT = join(APP, '/demo');
const ASSETS = join(BASE, OUT, '/assets');
const API_OUTPUT = 'api';
const GUIDE_SOURCE = join(BASE, '/docs/guide-package/guide/*.md');
const GUIDE_OUTPUT = 'guide';
const TEMPLATES = ['./docs/templates/'];

const TYPESCRIPT_SOURCES = [
  {
    include: './components/**/*.ts',
    exclude: './**/*.spec.ts',
  },
  {
    include: './services/**/*.ts',
    exclude: './**/*.spec.ts',
  },
  {
    include: './pipes/**/*.ts',
    exclude: './**/*.spec.ts',
  },
  './classes/**/*.ts',
  './interfaces/**/*.ts',
  './types.ts',
  './*.module.ts',
].map((s) => {
  if (typeof s === 'string') {
    return resolve(SOURCE, s);
  }
  return {
    include: resolve(SOURCE, s.include),
    exclude: resolve(SOURCE, s.exclude),
  };
});

module.exports = exports = {
  BASE,
  OUTPUT,
  SOURCE,
  APP,
  DEMO,
  DEMO_OUTPUT,
  SITE,
  ASSETS,
  TYPESCRIPT_SOURCES,
  API_OUTPUT,
  TEMPLATES,
  GUIDE_SOURCE,
  GUIDE_OUTPUT,
};
