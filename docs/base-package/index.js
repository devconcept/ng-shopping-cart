const {Package} = require('dgeni');
const basePkg = require('dgeni-packages/base');
const jsDocsPkg = require('dgeni-packages/jsdoc');
const njPkg = require('dgeni-packages/nunjucks');

const {OUTPUT, APP, BASE, TEMPLATES, SITE} = require('../config');

module.exports = exports = new Package('cartBase', [basePkg, jsDocsPkg, njPkg])
  .processor({name: 'adding-modules', $runAfter: ['adding-extra-docs'], $runBefore: ['extra-docs-added']})
  .processor({name: 'modules-added', $runAfter: ['adding-modules'], $runBefore: ['extra-docs-added']})
  .processor({name: 'adding-routes', $runAfter: ['modules-added'], $runBefore: ['extra-docs-added']})
  .processor({name: 'routes-added', $runAfter: ['adding-routes'], $runBefore: ['extra-docs-added']})
  .processor(require('./processors/copySite'))
  //.processor(require('./processors/removeExtraSpace'))
  .factory(require('./services/customDocs'))
  .factory(require('./services/copyFolder'))
  .factory(require('./services/staticAssets'))
  .config(function (readFilesProcessor, writeFilesProcessor) {
    readFilesProcessor.basePath = BASE;
    readFilesProcessor.sourceFiles = [];
    writeFilesProcessor.outputFolder = APP;
  })
  .config(function (templateFinder, templateEngine, computePathsProcessor) {
    templateFinder.templateFolders = TEMPLATES;
    templateFinder.templatePatterns = [
      '${doc.template}',
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
    computePathsProcessor.pathTemplates = [
      {
        docTypes: ['function', 'var', 'const', 'let', 'enum', 'value-module'],
        outputPathTemplate: 'api/${docType}/${computedName}.md',
        pathTemplate: '${moduleDoc.path}/${computedName}.md'
      },
      {
        docTypes: ['ngModule', 'ngRoute'],
        getOutputPath: function (doc) {
          if (doc.location) {
            if (doc.docType === 'ngModule') {
              return `${doc.pkg}/${doc.location}/${doc.file}.ts`
            }
            return `${doc.pkg}/${doc.location}/routes.ts`;
          }
          if (doc.docType === 'ngModule') {
            return `${doc.pkg}/${doc.file}.ts`
          }
          return `${doc.pkg}/routes.ts`;
        },
        pathTemplate: '${ngType}.ts'
      },
      {
        docTypes: ['ngComponent'],
        getOutputPath: function (doc) {
          if (doc.location) {
            return `${doc.pkg}/${doc.location}/routes/${doc.computedName}.component.ts`
          }
          return `${doc.pkg}/routes/${doc.computedName}.component.ts`
        },
        pathTemplate: '${ngType}.ts'
      }
    ];
  })
  .config(function (computeIdsProcessor) {
    computeIdsProcessor.idTemplates.push({
      docTypes: ['ngModule', 'ngRoute', 'ngComponent'],
      getId: function (doc) {
        return doc.name
      },
      getAliases: function (doc) {
        return [doc.id];
      }
    });
  })
  .config(function (customDocs) {
    customDocs.addDocs([
      require('./docs/guideDoc'),
      require('./docs/guideTemplate'),
      require('./docs/ngComponentDoc'),
      require('./docs/ngLazyRoute'),
      require('./docs/ngModuleDoc'),
      require('./docs/ngRouteDoc'),
      require('./docs/guideMarkdownDoc'),
    ]);
  })
  .config(function (staticAssets) {
    staticAssets.add(SITE, OUTPUT);
  });

