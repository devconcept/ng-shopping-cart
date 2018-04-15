module.exports = exports = class NgComponentDoc {
  constructor({name, computedName, pkg, location, route, chapter}) {
    this.name = name;
    this.chapter = chapter;
    this.pkg = pkg;
    this.computedName = computedName.replace(/-component/, '');
    this.path = this.computedName + '.component';
    this.docType = 'ngComponent';
    this.ngType = 'component';
    this.ngTemplatePath = './' + this.path + '.html';
    this.location = location;
    this.route = route || computedName;
    this.template = 'component.ts';
  }
};
