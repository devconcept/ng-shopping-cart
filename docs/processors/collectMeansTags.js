module.exports = exports = function collectMeansTags() {
  return {
    name: 'collectMeansTags',
    $runAfter: ['extra-docs-added'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        if (doc.docType === 'type-alias') {
          doc.means = doc.tags.getTags('means');
        }
      });
    }
  };
};
