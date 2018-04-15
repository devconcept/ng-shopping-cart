module.exports = function removeExtraSpace() {
  return {
    name: 'removeExtraSpace',
    $runAfter: ['docs-rendered'],
    $runBefore: ['writing-files'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        //doc.renderedContent = doc.renderedContent.replace(/\n+/gm, '\n').replace(/\r+/gm, '\r').replace(/(\r\n)+/gm, '\r\n');
      });
    }
  };
};
