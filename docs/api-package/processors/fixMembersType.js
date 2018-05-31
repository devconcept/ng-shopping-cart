const {get} = require('lodash');

module.exports = function fixMembersType() {
  return {
    name: 'fixMembersType',
    $runAfter: ['docs-processed'],
    $runBefore: ['filterUnusedDocs'],
    $process(docs) {
      docs.forEach((doc) => {
        if (doc.docType === 'class' && doc.members && doc.members.length) {
          doc.members.forEach((m) => {
            const {type} = m;
            m.typeInfo = type;
            const implicit = get(m, 'declaration.initializer.text');
            m.initialValue = undefined;
            if (implicit) {
              m.initialValue = type !== 'any' && !type.startsWith('Type') ? `'${implicit}'` : implicit;
            }
            const stringRegExp = /^('.*'|".*")$/;
            const numberRegExp = /^[0-9]+$/;
            const booleanRegExp = /^(true|false)$/;
            if (stringRegExp.exec(m.type)) {
              m.typeInfo = 'string';
              m.initialValue = type;
              return;
            }
            if (numberRegExp.exec(m.type)) {
              m.typeInfo = 'number';
              m.initialValue = type;
              return;
            }
            if (booleanRegExp.exec(m.type)) {
              m.typeInfo = 'boolean';
              m.initialValue = type;
            }
          });
        }
      });
    },
  };
};
