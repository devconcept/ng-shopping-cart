module.exports = exports = class NgRouteDoc {
  constructor(ngModule, lazyRoutes = []) {
    this.name = ngModule.name + 'Route';
    this.location = ngModule.location;
    this.docType = 'ngRoute';
    this.ngType = 'route';
    this.dependencies = ngModule.dependencies;
    this.lazyRoutes = lazyRoutes;
  }
};
