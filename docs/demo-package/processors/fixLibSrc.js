module.exports = function fixLibSrc() {
  return {
    name: 'fixLibSrc',
    $runAfter: ['processing-docs'],
    $runBefore: ['docs-processed'],
    $process(docs) {
      docs
        .filter(d => d.docType === 'demo-source' && d.fileType === 'typescript')
        .forEach((doc) => {
          const sourceImportRegExp = /import\s+.+\s+from\s+'(.+src.+)';/;
          const match = sourceImportRegExp.exec(doc.renderedContent);
          if (match) {
            const lines = doc.renderedContent
              .split('\n')
              .map((line) => {
                const lineMatch = sourceImportRegExp.exec(line);
                if (lineMatch) {
                  const importPath = lineMatch[1];
                  const fixedPath = `../${importPath}`;
                  return line.replace(importPath, fixedPath);
                }
                return line;
              });

            doc.renderedContent = lines.join('\n');
          }
        });
    },
  };
};
