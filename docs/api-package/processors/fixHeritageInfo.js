module.exports = function fixHeritageInfo() {
  return {
    name: 'fixHeritageInfo',
    $runAfter: ['docs-processed'],
    $runBefore: ['adding-modules'],
    $process: function (docs) {
      docs.forEach(doc => {
        if (doc.docType === 'class' && doc.extendsClauses && doc.extendsClauses.length) {
          const extendsFrom = doc.extendsClauses[0];
          if (!extendsFrom.doc) {
            const found = docs.find(d => d.name === extendsFrom.symbol.escapedName);
            if (found) {
              extendsFrom.doc = found;
            }
          }
        }
      });
    }
  };
};
