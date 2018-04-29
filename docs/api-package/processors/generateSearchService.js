module.exports = exports = function generateSearchService(customDocs) {
  return {
    name: 'generateSearchService',
    $runAfter: ['routes-added'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      const SearchServiceDoc = customDocs.getDoc('SearchServiceDoc');
      const searchable = ['class', 'type-alias', 'interface', 'const'];
      const searchService = new SearchServiceDoc(docs.filter(d => !d.ignore && searchable.indexOf(d.docType) !== -1));
      docs.push(searchService);
    }
  };
};
