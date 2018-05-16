const {upperFirst} = require('lodash');

module.exports = function generateBadgeInfo() {
  return {
    name: 'generateBadgeInfo',
    $runAfter: ['computeNgType'],
    $runBefore: ['adding-modules'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType !== 'markdown' && doc.docType !== 'ngTemplate') {
          if (doc.ngType) {
            doc.badgeType = doc.ngType === 'token' ? 'Injection token' : upperFirst(doc.ngType);
          } else {
            doc.badgeType = doc.docType === 'class' && doc.isAbstract ? 'Abstract class' : upperFirst(doc.docType);
          }
        }
      });
    }
  };
};
