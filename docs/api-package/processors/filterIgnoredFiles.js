module.exports = function filterIgnoredFiles() {
  return {
    name: 'filterIgnoredFiles',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process: function(docs) {
      return docs.filter(doc => !doc.tags.tags.length || !doc.tags.getTag('ignore'));
    }
  };
};
