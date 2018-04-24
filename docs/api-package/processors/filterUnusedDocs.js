const types = ['class', 'interface', 'type-alias', 'markdown', 'const'];

module.exports = function filterUnusedDocs() {
  return {
    name: 'filterUnusedDocs',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process: function (docs) {
      const tokenRegExp = /^\s*new\s+InjectionToken/;
      return docs.filter(doc => types.indexOf(doc.docType) !== -1
        && (doc.docType !== 'const' || tokenRegExp.test(doc.type)));
    }
  };
};
