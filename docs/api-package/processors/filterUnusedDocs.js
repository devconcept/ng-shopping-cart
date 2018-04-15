const types = ['class', 'interface', 'type-alias', 'markdown'];

module.exports = function filterUnusedDocs() {
  return {
    name: 'filterUnusedDocs',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process: function(docs) {
      return docs.filter(doc => types.indexOf(doc.docType) !== -1);
    }
  };
};
