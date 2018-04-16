const {Package} = require('dgeni');
const cartBasePkg = require('../base-package/index');

const {GUIDE_SOURCE, GUIDE_OUTPUT} = require('../config');

module.exports = exports = new Package('cartGuide', [cartBasePkg])
  .processor(require('./processors/generateMarkdownFiles'))
  .processor(require('./processors/generateGuideModule'))
  .processor(require('./processors/generateGuideRoutes'))
  .processor(require('./processors/removeTags'))
  .factory(require('./readers/mdReader'))
  .config(function (parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables([
      require('./tag-defs/next'),
      require('./tag-defs/nochapter')
    ]));
  })
  .config(function (readFilesProcessor, computePathsProcessor, mdReader) {
    readFilesProcessor.sourceFiles = readFilesProcessor.sourceFiles.concat(GUIDE_SOURCE);
    readFilesProcessor.fileReaders.push(mdReader);
    computePathsProcessor.pathTemplates = computePathsProcessor.pathTemplates.concat([
      {
        docTypes: ['markdown'],
        getOutputPath: function (doc) {
          return `${GUIDE_OUTPUT}/routes/${doc.computedName}.component.ts`
        },
        pathTemplate: '${docType}.ts'
      }
    ]);
  })
  .config(function (computeIdsProcessor) {
    computeIdsProcessor.idTemplates.push({
      docTypes: ['markdown', 'ngTemplate', 'md-file'],
      getId: function(doc) {
        return doc.computedName
      },
      getAliases: function(doc) {
        return [doc.id];
      }
    });
  });
