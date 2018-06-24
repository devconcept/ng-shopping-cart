module.exports = exports = function generateSearchService(customDocs) {
  return {
    name: 'generateSearchService',
    $runAfter: ['routes-added'],
    $runBefore: ['extra-docs-added'],
    $process(docs) {
      const [SearchServiceDoc, SearchDataDoc] = customDocs.getDocs(['SearchServiceDoc', 'SearchDataDoc']);
      const searchable = ['class', 'type-alias', 'interface', 'const'];
      const searchData = new SearchDataDoc(docs.filter(d => !d.ignore && searchable.indexOf(d.docType) !== -1));
      const searchService = new SearchServiceDoc(searchData);
      docs.push(searchData);
      docs.push(searchService);
    },
  };
};
