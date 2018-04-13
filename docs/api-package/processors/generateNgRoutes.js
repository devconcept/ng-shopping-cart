const NgRouteDoc = require('./docs/ngRouteDoc');
const NgLazyRoute = require('./docs/ngLazyRoute');

module.exports = exports = function generateNgRoutes() {
  return {
    name: 'generateNgRoutes',
    $runAfter: ['generateNgModules'],
    $runBefore: ['computing-ids'],
    $process: function (docs) {
      const modules = docs.filter(doc => doc.docType === 'ngModule');
      const ngRoutes = modules.map(m => new NgRouteDoc(m));
      const apiRoute = new NgRouteDoc({
        name: 'ApiModule',
        location: '',
        dependencies: [],
      }, modules.map(m => new NgLazyRoute(m)));
      docs.push(apiRoute);
      docs = docs.concat(ngRoutes);
      return docs;
    }
  };
};
