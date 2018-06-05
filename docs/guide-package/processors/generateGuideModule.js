const {upperFirst} = require('lodash');

module.exports = exports = function generateGuideModule(customDocs) {
  return {
    name: 'generateGuideModule',
    $runAfter: ['adding-modules'],
    $runBefore: ['modules-added'],
    $process(docs) {
      const [NgModuleDoc, NgTemplateDoc] = customDocs.getDocs(['NgModuleDoc', 'NgTemplateDoc']);
      const mdDocs = docs.filter(d => d.docType === 'markdown');
      const dependencies = mdDocs.map((d) => {
        let next = null;
        if (d.next) {
          const docRoute = d.next.split('/');
          const nextDoc = mdDocs.find(doc => doc.computedName === docRoute[1]);
          if (nextDoc) {
            next = {
              title: upperFirst(nextDoc.computedName.replace(/-/g, ' ')),
              url: d.next,
            };
          }
        }
        return {
          name: d.name.replace(/Component$/, ''),
          computedName: d.computedName,
          nochapter: d.nochapter,
          chapter: 'guide',
          next,
        };
      });
      const ngModule = new NgModuleDoc({
        name: 'guide',
        location: '',
        dependencies,
        pkg: 'guide',
      });
      const templates = ngModule.dependencies.map(d => new NgTemplateDoc(d));
      return [...docs, ngModule, ...templates];
    },
  };
};
