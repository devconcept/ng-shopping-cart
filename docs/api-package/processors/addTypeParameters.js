module.exports = function addTypeParameters() {
  return {
    name: 'addTypeParameters',
    $runAfter: ['tags-extracted'],
    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      docs.forEach(doc => {
        if (doc.typeParams) {
          const types = doc.declaration.typeParameters.map(t => {
            let constraint = '';
            if (t.constraint) {
              constraint = ' extends ' + t.constraint.typeName.escapedText;
            }
            return t.name.escapedText + constraint;
          }).join(',');
          doc.typeParameters = `<${types}>`;
        }
      });
    }
  };
};
