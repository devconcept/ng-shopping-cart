module.exports = exports = function generateMarkdownFiles(customDocs) {
  return {
    name: 'generateMarkdownFiles',
    $runAfter: ['routes-added'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      const GuideMarkdownDoc = customDocs.getDoc('GuideMarkdownDoc');
      const files = docs.filter(d => d.docType === 'markdown').map(d => new GuideMarkdownDoc(d));
      docs = docs.concat(files);
      return docs;
    }
  };
};
