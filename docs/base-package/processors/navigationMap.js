module.exports = function navigationMap(customDocs) {
  return {
    name: 'navigationMap',
    $runAfter: ['routes-added'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      const TocDoc = customDocs.getDoc('TocDoc');
      const types = ['class', 'interface', 'type-alias', 'markdown'];
      const contents = docs.filter(d => types.indexOf(d.docType) !== -1);
      docs.push(new TocDoc(contents));
    }
  };
};
