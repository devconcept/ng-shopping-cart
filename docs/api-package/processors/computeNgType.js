module.exports = function computeNgType(getTypeFolder) {
  return {
    name: 'computeNgType',
    $runAfter: ['generateKebabNames'],
    $runBefore: ['adding-modules'],
    $process(docs) {
      docs.forEach((doc) => {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate') {
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
              doc.template = `${doc.ngType}.html`;
              doc.ngSelector = component.argumentInfo[0].selector.replace(/'/g, '');
              doc.inputs = doc.members.reduce((curr, m) => {
                if (m.decorators && m.decorators.findIndex(d => d.name === 'Input') !== -1) {
                  m.isInput = true;
                  curr.push(m);
                }
                return curr;
              }, []);
              doc.outputs = doc.members.reduce((curr, m) => {
                if (m.decorators && m.decorators.findIndex(d => d.name === 'Output') !== -1) {
                  m.isOutput = true;
                  curr.push(m);
                }
                return curr;
              }, []);
            }
          }
          if (doc.docType === 'const') {
            doc.ngType = 'token';
          }
          doc.location = getTypeFolder(doc);
        }
      });
    },
  };
};
