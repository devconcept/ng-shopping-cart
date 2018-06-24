/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-arrow-callback */

const {Package} = require('dgeni');
const cartBasePkg = require('../base-package/index');

const {GUIDE_SOURCE, GUIDE_OUTPUT} = require('../config');

module.exports = exports = new Package('cartGuide', [cartBasePkg])
  .processor(require('./processors/generateMarkdownFiles'))
  .processor(require('./processors/generateGuideModule'))
  .processor(require('./processors/generateGuideRoutes'))
  .processor(require('./processors/removeTags'))
  .factory(require('./readers/mdReader'))
  .config(function(parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions = [
      ...parseTagsProcessor.tagDefinitions,
      ...getInjectables([
        require('./tag-defs/next'),
        require('./tag-defs/nochapter'),
      ]),
    ];
  })
  .config(function(readFilesProcessor, computePathsProcessor, mdReader) {
    readFilesProcessor.sourceFiles = [...readFilesProcessor.sourceFiles, GUIDE_SOURCE];
    readFilesProcessor.fileReaders.push(mdReader);
    computePathsProcessor.pathTemplates = [
      ...computePathsProcessor.pathTemplates,
      {
        docTypes: ['markdown'],
        getOutputPath(doc) {
          return `${GUIDE_OUTPUT}/routes/${doc.computedName}.component.ts`;
        },
        pathTemplate: '${docType}.ts',
      },
    ];
  })
  .config(function(computeIdsProcessor) {
    computeIdsProcessor.idTemplates.push({
      docTypes: ['markdown', 'ngTemplate', 'md-file'],
      getId(doc) {
        return doc.computedName;
      },
      getAliases(doc) {
        return [doc.id];
      },
    });
  });
