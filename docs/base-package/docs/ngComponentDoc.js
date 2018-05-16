module.exports = exports = class NgComponentDoc {
  constructor(doc) {
    const {name, computedName, pkg, location, route, chapter, next} = doc;
    this.source = doc;
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
    this.template = 'ng-component.ts';
    this.next = next;
  }
};
