const {upperFirst} = require('lodash');

module.exports = exports = class NgLazyRoute {
  constructor(module) {
    this.name = upperFirst(module.location) + 'LazyRoute';
    this.location = module.location;
    this.loadChildren = module.file + '#' + module.name;
  }
};
