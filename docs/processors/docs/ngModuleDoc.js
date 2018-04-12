const {upperFirst} = require('lodash');
const NgComponentDoc = require('./ngComponentDoc');

module.exports = exports = class NgModuleDoc {
  constructor({name, dependencies = []}) {
    this.location = name;
    this.name = upperFirst(name) + 'Module';
    this.file = name + '.module';
    this.docType = 'ngModule';
    this.outputPath = name + '/' + name + '.module.ts';
    this.template = 'ngModule';
    this.dependencies = dependencies.map(c => {
      return new NgComponentDoc({
        name: upperFirst(c.name) + 'Component',
        path: c.computedName + '.component',
        computedName: c.computedName
      })
    });
  }
};
