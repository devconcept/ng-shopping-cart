const {get} = require('lodash');

module.exports = function addServiceDependencies() {
  return {
    name: 'addServiceDependencies',
    $runAfter: ['tags-extracted'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      docs.forEach(doc => {
        if (doc.ngType === 'service') {
          const parameters = get(doc, 'constructorDoc.parameterDocs', []);
          doc.dependencies = parameters.map(p => {
            if (p.declaration.decorators) {
              const inject = p.declaration.decorators
                .find(d => get(d, 'expression.expression.escapedText') === 'Inject');
              if (inject) {
                return `InjectionToken<${inject.expression.arguments[0].escapedText}>`
              }
            }
            return p.type || 'any';
          });
        }
      });
    }
  };
};
