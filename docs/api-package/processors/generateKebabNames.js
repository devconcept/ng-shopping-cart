const {kebabCase} = require('lodash');

module.exports = function generateKebabNames() {
  return {
    name: 'generateKebabNames',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate') {
          doc.computedName = kebabCase(doc.name);
        }
      });
    }
  };
};
