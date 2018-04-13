const {upperFirst} = require('lodash');
const NgComponentDoc = require('./ngComponentDoc');

module.exports = exports = class NgModuleDoc {
  constructor({name, dependencies = []}) {
    this.location = name;
    this.name = upperFirst(name) + 'Module';
    this.file = name + '.module';
    this.docType = 'ngModule';
    this.ngType = 'module';
    this.dependencies = dependencies.map(c => {
      return new NgComponentDoc({
        name: upperFirst(c.name) + 'Component',
        computedName: c.computedName,
        location: name,
        route: c.computedName
      })
    });
  }
};
