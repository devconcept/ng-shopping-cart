function pushDoc(obj, key, doc) {
  if (obj[key]) {
    obj[key].push(doc);
    return;
  }
  obj[key] = [doc];
}

module.exports = exports = function generateApiModules(getTypeFolder, customDocs) {
  return {
    name: 'generateApiModules',
    $runAfter: ['adding-modules'],
    $runBefore: ['modules-added'],
    $process: function (docs) {
      const NgModuleDoc = customDocs.getDoc('NgModuleDoc');
      const types = docs.reduce((curr, doc) => {
        const ignore = ['markdown', 'md-template', 'ngModule', 'ngComponent'];
        if (ignore.indexOf(doc.docType) === -1) {
          const type = getTypeFolder(doc);
          pushDoc(curr, type, doc);
        }
        return curr;
      }, {});
      const ngModules = Object.keys(types).map(name => {
        return new NgModuleDoc({
          name,
          pkg: 'api',
          dependencies: types[name].map(t => {
            t.chapter = 'api';
            return t;
          })
        });
      });
      docs = docs.concat(ngModules, ...ngModules.map(m => m.dependencies));
      return docs;
    }
  };
};
