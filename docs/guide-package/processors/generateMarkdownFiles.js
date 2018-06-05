module.exports = exports = function generateMarkdownFiles(customDocs) {
  return {
    name: 'generateMarkdownFiles',
    $runAfter: ['routes-added'],
    $runBefore: ['adding-navigation'],
    $process(docs) {
      const GuideMarkdownDoc = customDocs.getDoc('GuideMarkdownDoc');
      const files = docs.filter(d => d.docType === 'markdown').map(d => new GuideMarkdownDoc(d));
      return [...docs, ...files];
    },
  };
};
