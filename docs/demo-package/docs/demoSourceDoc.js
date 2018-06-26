module.exports = exports = class DemoSourceDoc {
  constructor(fileInfo) {
    this.docType = 'demo-source';
    this.name = fileInfo.baseName;
    this.fileType = fileInfo.extension === 'ts' ? 'typescript' : 'other';
    this.renderedContent = fileInfo.content;
    this.fileName = fileInfo.baseName + (fileInfo.extension ? `.${fileInfo.extension}` : '');
    this.filePath = fileInfo.relativePath
      .replace('demo/app/', '')
      .replace(this.fileName, '')
      .replace(/\/$/, '');
  }
};
