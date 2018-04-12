module.exports = function filterIgnoredFiles() {
  return {
    name: 'filterIgnoredFiles',
    $runAfter: ['filterUnusedDocs'],
    $runBefore: ['computing-ids'],
    $process: function(docs) {
      return docs.filter(doc => !doc.tags.tags.length || !doc.tags.getTag('ignore'));
    }
  };
};
