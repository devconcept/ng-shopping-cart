const {upperFirst} = require('lodash');

module.exports = exports = class SearchServiceDoc {
  constructor(docs) {
    this.name = 'SearchService';
    this.docType = 'search-service';

    this.sources = docs.map(doc => {
      let name = doc.computedName;
      if (doc.ngType === 'component') {
        name = '<' + doc.computedName.replace(/-component/, '') + '>';
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
      return {
        name,
        type,
        description: doc.description,
        path: `/${doc.chapter}/${doc.location}/${doc.computedName}`,
        source: [doc.computedName, doc.description].map(s => s.toLowerCase())
      };
    });
  }
};
