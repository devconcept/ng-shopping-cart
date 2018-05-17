module.exports = function removeExtraSpace() {
  return {
    name: 'removeExtraSpace',
    $runAfter: ['docs-rendered'],
    $runBefore: ['writing-files'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType !== 'md-file') {
          doc.renderedContent = doc.renderedContent
            .replace(/\n+/g, '\n')
            .replace(/\r+/g, '\r')
            .replace(/(\r\n)+/g, '\r\n');
        }
      });
    }
  };
};
