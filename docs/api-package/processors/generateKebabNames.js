const {kebabCase} = require('lodash');

module.exports = function generateKebabNames() {
  return {
    name: 'generateKebabNames',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process(docs) {
      docs.forEach((doc) => {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate' && doc.docType !== 'demo-source') {
          doc.computedName = kebabCase(doc.name);
        }
      });
    },
  };
};
