module.exports = exports = function addGuideTemplates(customDocs) {
  const GuideTemplateDoc = customDocs.getDoc('GuideTemplateDoc');

  return {
    name: 'addGuideTemplates',
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      const templates = docs.filter(d => d.docType === 'markdown').map(d => new GuideTemplateDoc(d));
      docs = docs.concat(templates);
      return docs;
    }
  };
};
