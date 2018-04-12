const NgModuleDoc = require('./docs/ngModuleDoc');

function pushDoc(obj, key, doc) {
  if (obj[key]) {
    obj[key].push(doc);
    return;
  }
  obj[key] = [doc];
}

module.exports = exports = function generateNgModules(getTypeFolder) {
  return {
    name: 'generateNgModules',
    $runAfter: ['computeNgType'],
    $runBefore: ['computing-ids'],
    $process: function (docs) {
      const types = docs.reduce((curr, doc) => {
        const type = getTypeFolder(doc);
        pushDoc(curr, type, doc);
        return curr;
      }, {});
      const ngModules = Object.keys(types).map(name => {
        return new NgModuleDoc({
          name,
          dependencies: types[name]
        });
      });
      docs = docs.concat(ngModules);
      return docs;
    }
  };
};
