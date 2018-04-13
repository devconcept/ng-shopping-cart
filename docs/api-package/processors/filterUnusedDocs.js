const types = ['class', 'interface', 'type-alias'];

module.exports = function filterUnusedDocs() {
  return {
    name: 'filterUnusedDocs',
    $runAfter: ['extra-docs-added'],
    $runBefore: ['computing-ids'],
    $process: function(docs) {
      return docs.filter(doc => types.indexOf(doc.docType) !== -1);
    }
  };
};
