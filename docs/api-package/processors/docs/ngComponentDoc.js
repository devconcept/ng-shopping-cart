module.exports = exports = class NgComponentDoc {
  constructor({name, computedName, location}) {
    this.name = name;
    this.path = computedName + '.component';
    this.docType = 'ngComponent';
    this.ngType = 'component';
    this.ngTemplatePath = './' + this.path + '.html';
    this.computedName = computedName;
    this.location = location;
  }
};
