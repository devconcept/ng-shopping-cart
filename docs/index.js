const {Package} = require('dgeni');
const apiPackage = require('./api-package/index');
const guidePackage = require('./guide-package/index');

module.exports = exports = new Package('cartDocs', [guidePackage, apiPackage]);

