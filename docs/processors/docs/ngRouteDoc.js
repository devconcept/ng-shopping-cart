const NgLazyRoute = require('./ngLazyRoute');

module.exports = exports = class NgRouteDoc {
  constructor(ngModule, lazyRoutes = []) {
    this.name = ngModule.name + 'Route';
    this.location = ngModule.location;
    this.docType = 'ngRoute';
    this.file = 'routes.ts';
    this.outputPath = this.location ? this.location + '/' + this.file : this.file;
    this.template = 'ngRoute';
    this.dependencies = ngModule.dependencies;
    this.lazyRoutes = lazyRoutes;
  }
};
