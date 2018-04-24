module.exports = function getTypeFolder() {
  return function (doc) {
    let type = doc;

    if (typeof doc !== 'string') {
      type = doc.ngType || doc.docType;
    }

    if (type === 'type-alias') {
      return 'types';
    }
    const singulars = ['component', 'injection-token', 'interface', 'service', 'token'];
    return singulars.indexOf(type) !== -1 ? type + 's' : type + 'es';
  }
};
