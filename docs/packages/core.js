const {Package} = require('dgeni');
const basePkg = require('dgeni-packages/base');
const jsDocsPkg = require('dgeni-packages/jsdoc');
const njPkg = require('dgeni-packages/nunjucks');
const tsDocsPkg = require('dgeni-packages/typescript');

const {BASE, TYPESCRIPT_SOURCES, OUTPUT, TEMPLATES} = require('../config');

module.exports = exports = new Package('docsCore', [basePkg, njPkg, jsDocsPkg, tsDocsPkg])
  .processor(require('../processors/filterUnusedDocs'))
  .processor(require('../processors/filterIgnoredFiles'))
  .processor(require('../processors/generateKebabNames'))
  .processor(require('../processors/computeNgType'))
  .processor(require('../processors/collectMeansTags'))
  .processor(require('../processors/generateNgModules'))
  .processor(require('../processors/generateNgRoutes'))
  .factory(require('../services/getTypeFolder'))
  .config(function (readFilesProcessor, unescapeCommentsProcessor) {
    readFilesProcessor.$enabled = false;
    readFilesProcessor.basePath = BASE;
    unescapeCommentsProcessor.$enabled = false;
  })
  .config(function (parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions.push(
      require('../tag-defs/ignore')(),
      require('../tag-defs/means')(),
    );
  })
  .config(function (templateFinder, templateEngine) {
    templateFinder.templateFolders = TEMPLATES;
    templateFinder.templatePatterns = [
      '${doc.template}.ts',
      '${doc.template}.ts',
      '${doc.docType}.ts',
      '${doc.docType}.ts',
      'common.ts'
    ];
    templateEngine.config.tags = {
      variableStart: '{$',
      variableEnd: '$}'
    };
    templateEngine.filters.push(
      require('../rendering/backTicks')()
    );
  })
  .config(function (readTypeScriptModules, writeFilesProcessor) {
    readTypeScriptModules.sourceFiles = TYPESCRIPT_SOURCES;
    writeFilesProcessor.$enabled = true;
    writeFilesProcessor.outputFolder = OUTPUT;
  })
  .config(function (computePathsProcessor, getTypeFolder) {
    computePathsProcessor.pathTemplates = [
      {
        docTypes: ['class', 'interface', 'type-alias'],
        getOutputPath: function (doc) {
          const folder = getTypeFolder(doc);
          const file = doc.ngType === 'component' ? doc.computedName.replace(/-component/, '') : doc.computedName;
          return `${folder}/components/${file}.component.ts`
        },
        pathTemplate: '${moduleDoc.path}/${computedName}.ts'
      },
      {
        docTypes: ['ngModule', 'ngRoute'],
        getOutputPath: function (doc) {
          if (doc.location) {
            return `${doc.location}/${doc.file}.ts`
          }
          return doc.file + '.ts';
        },
        pathTemplate: '${docType}.ts'
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
      docTypes: ['ngModule', 'ngRoute'],
      getId: function(doc) {
        return doc.name
      },
      getAliases: function(doc) {
        return [doc.id];
      }
    });
  });
