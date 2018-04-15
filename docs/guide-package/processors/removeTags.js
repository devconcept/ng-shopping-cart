module.exports = exports = function removeTags() {
  return {
    name: 'removeTags',
    $runAfter: ['tags-extracted'],
    $runBefore: ['processing-docs'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType === 'markdown') {
          const tagMatch = /^(\s*(@.+[ ]*.*)\s+)+/gm;
          doc.content = doc.content.replace(tagMatch, '');
        }
      });
    }
  };
};
