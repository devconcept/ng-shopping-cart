module.exports = exports = function generateGuideModule(customDocs) {
  return {
    name: 'generateGuideModule',
    $runAfter: ['adding-modules'],
    $runBefore: ['modules-added'],
    $process: function (docs) {
      const [NgModuleDoc, NgTemplateDoc] = customDocs.getDocs(['NgModuleDoc', 'NgTemplateDoc']);
      const dependencies = docs.filter(d => d.docType === 'markdown').map(d => {
        return {
          name: d.name.replace(/Component$/, ''),
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
      const templates = ngModule.dependencies.map(d => new NgTemplateDoc(d));
      docs = docs.concat(ngModule, ...templates);
      return docs;
    }
  };
};
