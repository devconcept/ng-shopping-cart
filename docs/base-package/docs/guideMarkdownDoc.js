module.exports = exports = class GuideMarkdownDoc {
  constructor(guideDoc) {
    this.name = guideDoc.name + 'Markdown';
    this.computedName = guideDoc.computedName;
    this.docType = 'md-file';
    this.content = guideDoc.content;
    this.template = this.docType + '.md';
  }
};
