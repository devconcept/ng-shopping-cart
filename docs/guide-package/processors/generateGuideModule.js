module.exports = exports = function generateGuideModule(customDocs) {
  return {
    name: 'generateGuideModule',
    $runAfter: ['adding-modules'],
    $runBefore: ['modules-added'],
    $process: function (docs) {
      const NgModuleDoc = customDocs.getDoc('NgModuleDoc');
      const dependencies = docs.filter(d => d.docType === 'markdown').map(d => {
        return {
          name: d.name,
          computedName: d.computedName,
          nochapter: d.nochapter,
          chapter: 'guide'
        };
      });
      const ngModule = new NgModuleDoc({
        name: 'guide',
        location: '',
        dependencies,
        pkg: 'guide'
      });
      docs = docs.concat(ngModule, ...ngModule.dependencies);
      return docs;
    }
  };
};
