module.exports = exports = function generateApiRoutes(customDocs) {
  return {
    name: 'generateApiRoutes',
    $runAfter: ['adding-routes'],
    $runBefore: ['routes-added'],
    $process: function (docs) {
      const [NgRouteDoc, NgLazyRoute, NgComponentDoc] = customDocs
        .getDocs(['NgRouteDoc', 'NgLazyRoute', 'NgComponentDoc']);

      const pkg = 'api';
      const modules = docs.filter(doc => doc.docType === 'ngModule' && doc.pkg === pkg);
      const ngRoutes = modules.map(m => new NgRouteDoc(m));
      const apiRoute = new NgRouteDoc({
        name: 'ApiModule',
        location: '',
        pkg,
        dependencies: [new NgComponentDoc({
          name: 'SearchComponent',
          computedName: 'search',
          route: 'index'
        })],
      }, modules.map(m => new NgLazyRoute(m)));
      docs.push(apiRoute);
      docs = docs.concat(ngRoutes);
      return docs;
    }
  };
};
