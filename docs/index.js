const {Package} = require('dgeni');
const corePackage = require('./packages/core');

module.exports = exports = new Package('cartDocs', [corePackage]);

