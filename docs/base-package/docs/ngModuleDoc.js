const {upperFirst} = require('lodash');
const NgComponentDoc = require('./ngComponentDoc');

module.exports = exports = class NgModuleDoc {
  constructor({name, pkg, dependencies = [], modules = [], location = name}) {
    this.location = location;
    this.pkg = pkg;
    this.name = upperFirst(name) + 'Module';
    this.file = name + '.module';
    this.docType = 'ngModule';
    this.ngType = 'module';
    this.dependencies = dependencies.map(c => {
      return new NgComponentDoc({
        name: upperFirst(c.name) + 'Component',
        source: c,
        computedName: c.computedName,
        location: this.location,
        route: c.computedName,
        chapter: c.nochapter ? undefined : c.chapter,
        pkg,
        next: c.next,
      })
    });
    this.modules = modules;
  }
};
