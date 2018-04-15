module.exports = exports = class GuideTemplateDoc {
  constructor(guideDoc) {
    this.name = guideDoc.name + 'Template';
    this.computedName = guideDoc.computedName;
    this.docType = 'md-template';
    this.template = this.docType;
  }
};
