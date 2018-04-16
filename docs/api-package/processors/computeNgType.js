module.exports = function computeNgType(getTypeFolder) {
  return {
    name: 'computeNgType',
    $runAfter: ['generateKebabNames'],
    $runBefore: ['adding-modules'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType !== 'markdown' && doc.docType !== 'md-template') {
          doc.ngType = undefined;
          if (doc.decorators && doc.decorators.length && doc.docType === 'class') {
            const injectable = doc.decorators.find(d => d.name === 'Injectable');
            if (injectable) {
              doc.ngType = 'service';
              doc.template = doc.ngType;
              doc.location = getTypeFolder(doc);
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
          doc.location = getTypeFolder(doc);
        }
      });
    }
  };
};
