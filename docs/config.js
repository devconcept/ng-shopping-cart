const {resolve, normalize} = require('path');

const BASE = resolve(__dirname, '..');
const SOURCE = normalize(BASE + '/src');

const TYPESCRIPT_SOURCES = ['./classes/**/*.ts', 'interfaces/**/*.ts', './types.ts'].map(f => (resolve(SOURCE, f)));

module.exports = exports = {BASE, SOURCE, TYPESCRIPT_SOURCES};
