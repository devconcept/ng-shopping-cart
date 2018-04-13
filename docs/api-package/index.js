const {Package} = require('dgeni');
const basePkg = require('dgeni-packages/base');
const jsDocsPkg = require('dgeni-packages/jsdoc');
const njPkg = require('dgeni-packages/nunjucks');
const tsDocsPkg = require('dgeni-packages/typescript');

const {BASE, TYPESCRIPT_SOURCES, API_OUTPUT, API_TEMPLATES} = require('../config');

module.exports = exports = new Package('docsCore', [basePkg, njPkg, jsDocsPkg, tsDocsPkg])
  .processor(require('./processors/filterUnusedDocs'))
  .processor(require('./processors/filterIgnoredFiles'))
  .processor(require('./processors/generateKebabNames'))
  .processor(require('./processors/computeNgType'))
  .processor(require('./processors/collectMeansTags'))
  .processor(require('./processors/generateNgModules'))
  .processor(require('./processors/generateNgRoutes'))
  .factory(require('./services/getTypeFolder'))
  .config(function (readFilesProcessor, unescapeCommentsProcessor) {
    readFilesProcessor.$enabled = false;
    readFilesProcessor.basePath = BASE;
    unescapeCommentsProcessor.$enabled = false;
  })
  .config(function (parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions.push(
      require('./tag-defs/ignore')(),
      require('./tag-defs/means')(),
    );
  })
  .config(function (templateFinder, templateEngine) {
    templateFinder.templateFolders = API_TEMPLATES;
    templateFinder.templatePatterns = [
      '${doc.template}.html',
      '${doc.template}.ts',
      '${doc.ngType}.html',
      '${doc.ngType}.ts',
      '${doc.docType}.html',
      '${doc.docType}.ts',
      'common.ts'
    ];
    templateEngine.config.tags = {
      variableStart: '{$',
      variableEnd: '$}'
    };
    templateEngine.filters.push(
      require('./rendering/backTicks')(),
      require('./rendering/removeParagraph')(),
      require('./rendering/emitterType')()
    );
  })
  .config(function (readTypeScriptModules, writeFilesProcessor) {
    readTypeScriptModules.sourceFiles = TYPESCRIPT_SOURCES;
    writeFilesProcessor.$enabled = true;
    writeFilesProcessor.outputFolder = API_OUTPUT;
  })
  .config(function (computePathsProcessor, getTypeFolder) {
    computePathsProcessor.pathTemplates = [
      {
        docTypes: ['class', 'interface', 'type-alias'],
        getOutputPath: function (doc) {
          const folder = getTypeFolder(doc);
          const file = doc.ngType === 'component' ? doc.computedName.replace(/-component/, '') : doc.computedName;
          return `${folder}/components/${file}.component.html`
        },
        getPath: function (doc) {
          if (doc.ngType) {
            return '${ngType}.html';
          }
          return '${docType}.html'
        }
      },
      {
        docTypes: ['ngModule', 'ngRoute'],
        getOutputPath: function (doc) {
          if (doc.docType === 'ngModule') {
            return `${doc.location}/${doc.location}.module.ts`
          }
          if (doc.location) {
            return `${doc.location}/routes.ts`;
          }
          return 'routes.ts';
        },
        pathTemplate: '${ngType}.ts'
      },
      {
        docTypes: ['ngComponent'],
        getOutputPath: function (doc) {
          const file = doc.computedName.replace(/-component/, '');
          return `${doc.location}/components/${file}.component.ts`
        },
        pathTemplate: '${ngType}.ts'
      },
      {
        docTypes: ['function', 'var', 'const', 'let', 'enum', 'value-module'],
        outputPathTemplate: '${docType}/${computedName}.md',
        pathTemplate: '${moduleDoc.path}/${computedName}.md'
      }
    ];
  })
  .config(function(computeIdsProcessor) {
    computeIdsProcessor.idTemplates.push({
      docTypes: ['ngModule', 'ngRoute', 'ngComponent'],
      getId: function(doc) {
        return doc.name
      },
      getAliases: function(doc) {
        return [doc.id];
      }
    });
  });
