module.exports = exports = function generateNgRoutes(customDocs) {
  return {
    name: 'generateApiNgRoutes',
    $runAfter: ['adding-routes'],
    $runBefore: ['routes-added'],
    $process: function (docs) {
      const NgRouteDoc = customDocs.getDoc('NgRouteDoc');
      const module = docs.find(doc => doc.docType === 'ngModule' && doc.name === 'GuideModule');
      const route = new NgRouteDoc(module);
      docs.push(route);
      return docs;
    }
  };
};
