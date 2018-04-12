module.exports = function computeNgType() {
  return {
    name: 'computeNgType',
    $runAfter: ['generateKebabNames'],
    $runBefore: ['computing-ids'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        doc.ngType = undefined;
        if (doc.decorators && doc.decorators.length && doc.docType === 'class') {
          const injectable = doc.decorators.find(d => d.name === 'Injectable');
          if (injectable) {
            doc.ngType = 'service';
            doc.template = doc.ngType;
            return;
          }
          const component = doc.decorators.find(d => d.name === 'Component');
          if (component) {
            doc.ngType = 'component';
            doc.template = doc.ngType;
            doc.ngSelector = component.argumentInfo[0].selector;
            doc.inputs = doc.members.filter(m => {
              return m.decorators && m.decorators.findIndex(d => d.name === 'Input') !== -1;
            });
            doc.outputs = doc.members.filter(m => {
              return m.decorators && m.decorators.findIndex(d => d.name === 'Output') !== -1;
            })
          }
        }
      });
    }
  };
};
