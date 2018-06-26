module.exports = function computeNgType(getTypeFolder) {
  return {
    name: 'computeNgType',
    $runAfter: ['generateKebabNames'],
    $runBefore: ['adding-modules'],
    $process(docs) {
      docs.forEach((doc) => {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate' && doc.docType !== 'demo-source') {
          doc.ngType = undefined;
          if (doc.docType === 'class' && (doc.service || (doc.decorators && doc.decorators.length))) {
            const injectable = doc.decorators ? doc.decorators.find(d => d.name === 'Injectable') : false;
            if (injectable || doc.service) {
              doc.ngType = 'service';
              doc.injectable = Boolean(injectable);
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
            const pipe = doc.decorators.find(d => d.name === 'Pipe');
            if (pipe) {
              doc.ngType = 'pipe';
              doc.template = `${doc.ngType}.html`;
              doc.pipeName = pipe.argumentInfo[0].name.replace(/'/g, '');
              doc.pure = pipe.argumentInfo[0].pure !== 'false';
            }
            const module = doc.decorators.find(d => d.name === 'NgModule');
            if (module) {
              doc.ngType = 'module';
              doc.template = `${doc.ngType}.html`;
              doc.declarations = module.argumentInfo[0].declarations || [];
              doc.imports = module.argumentInfo[0].imports || [];
              doc.exports = (module.argumentInfo[0].exports || []).map((e) => {
                const ref = docs.find(d => d.name === e) || {name: e};
                const {computedName, name, description, location, ignore} = ref;
                const cName = computedName || name;
                return {
                  name,
                  description,
                  location,
                  computedName: cName,
                  ignore,
                };
              });
              doc.entryComponents = module.argumentInfo[0].entryComponents || [];
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
