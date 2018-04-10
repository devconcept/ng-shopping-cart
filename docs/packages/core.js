const {Package} = require('dgeni');
const basePkg = require('dgeni-packages/base');
const jsDocsPkg = require('dgeni-packages/jsdoc');
const njPkg = require('dgeni-packages/nunjucks');
const tsDocsPkg = require('dgeni-packages/typescript');

const {BASE} = require('../config');
const {TYPESCRIPT_SOURCES} = require('../config');

module.exports = exports = new Package('docsCore', [basePkg, njPkg, jsDocsPkg, tsDocsPkg])
  .config(function (readFilesProcessor, unescapeCommentsProcessor) {
    readFilesProcessor.$enabled = false;
    readFilesProcessor.basePath = BASE;
    unescapeCommentsProcessor.$enabled = false;
  })
  .config(function (templateFinder, templateEngine) {
    templateFinder.templateFolders = ['./docs/templates/'];
    templateFinder.templatePatterns = [
      '${doc.template}.md',
      '${doc.docType}.md',
      'common.md'
    ];
    templateEngine.config.tags = {
      variableStart: '{$',
      variableEnd: '$}'
    };
  })
  .config(function (readTypeScriptModules, writeFilesProcessor) {
    readTypeScriptModules.sourceFiles = TYPESCRIPT_SOURCES;
    writeFilesProcessor.$enabled = true;
    writeFilesProcessor.outputFolder = './dist-docs/';
  })
  .config(function (computePathsProcessor) {
    computePathsProcessor.pathTemplates = [
      {
        docTypes: ['class', 'interface'],
        outputPathTemplate: '${docType}es/${name}.md',
        pathTemplate: '${moduleDoc.path}/${name}.md'
      },
      {
        docTypes: ['type-alias'],
        outputPathTemplate: 'types/${name}.md',
        pathTemplate: '${moduleDoc.path}/${name}.md'
      },
      {
        docTypes: ['function', 'var', 'const', 'let', 'enum', 'value-module'],
        outputPathTemplate: '${docType}/${name}.md',
        pathTemplate: '${moduleDoc.path}/${name}.md'
      }
    ];
  });
