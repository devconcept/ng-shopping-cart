const types = ['class', 'interface', 'type-alias'];

module.exports = function filterIgnoredFiles() {
  return {
    name: 'filterIgnoredFiles',
    $runAfter: ['modules-added'],
    $runBefore: ['computing-ids'],
    $process: function (docs) {
      return docs.filter(doc => types.indexOf(doc.docType) === -1
        || !doc.tags.tags.length || !doc.tags.getTag('ignore'));
    }
  };
};
