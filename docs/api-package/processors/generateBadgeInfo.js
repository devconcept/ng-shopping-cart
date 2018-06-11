const {upperFirst} = require('lodash');

module.exports = function generateBadgeInfo() {
  return {
    name: 'generateBadgeInfo',
    $runAfter: ['computeNgType'],
    $runBefore: ['adding-modules'],
    $process(docs) {
      docs.forEach((doc) => {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate') {
          if (doc.ngType && !(doc.ngType === 'service' && !doc.injectable)) {
            doc.badgeType = doc.ngType === 'token' ? 'Injection token' : upperFirst(doc.ngType);
            return;
          }
          doc.badgeType = doc.docType === 'class' && doc.isAbstract ? 'Abstract class' : upperFirst(doc.docType);
        }
      });
    },
  };
};
