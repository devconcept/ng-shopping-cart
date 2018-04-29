module.exports = exports = class NgTemplateDoc {
  constructor(doc) {
    this.name = doc.name + 'Template';
    this.computedName = doc.computedName;
    this.docType = 'ngTemplate';
    this.pkg = doc.pkg;
    this.template = 'ng-template.html';
    this.component = doc;
    this.route = doc.route;
    this.next = doc.next;
  }
};
