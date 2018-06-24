const {upperFirst} = require('lodash');

module.exports = exports = class SearchDataDoc {
  constructor(docs) {
    this.name = 'SearchData';
    this.docType = 'search-data';
    this.filename = 'search.json';

    this.sources = docs.map((doc) => {
      let name = doc.computedName;
      if (doc.ngType === 'component') {
        name = `<${doc.computedName.replace(/-component/, '')}>`;
      }
      if (doc.ngType === 'token') {
        name = doc.name;
      }

      let type = upperFirst(doc.ngType || doc.docType);
      if (type === 'Class' && doc.isAbstract) {
        type = 'Abstract class';
      }
      if (type === 'Type-alias') {
        type = 'Type';
      }
      if (type === 'Token') {
        type = 'Injection token';
      }
      const members = doc.docType === 'class' ? doc.members.map(d => `${d.name} ${d.description}`).join(' ') : '';
      return {
        name,
        type,
        description: doc.description,
        path: `/${doc.chapter}/${doc.location}/${doc.computedName}`,
        source: [doc.computedName, doc.description, members]
          .map(s => s.toLowerCase()),
      };
    });
  }
};
