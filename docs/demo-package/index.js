/* eslint-disable no-template-curly-in-string */
/* eslint-disable prefer-arrow-callback */

const {Package} = require('dgeni');

const {DEMO_SOURCE, DEMO_EXTRA, DEMO_OUTPUT} = require('../config');

module.exports = exports = new Package('cartDemo', [])
  .processor(require('./processors/fixLibSrc'))
  .factory(require('./readers/demo'))
  .config(function(readFilesProcessor, staticAssets, demoFileReader) {
    readFilesProcessor.fileReaders.push(demoFileReader);
    readFilesProcessor.sourceFiles = [
      ...readFilesProcessor.sourceFiles,
      DEMO_SOURCE,
    ];
    staticAssets.add(DEMO_EXTRA, DEMO_OUTPUT);
  })
  .config(function(customDocs, computePathsProcessor, computeIdsProcessor) {
    customDocs.addDocs([require('./docs/demoSourceDoc')]);

    computePathsProcessor.pathTemplates = [
      ...computePathsProcessor.pathTemplates,
      {
        docTypes: ['demo-source'],
        getOutputPath(doc) {
          return `${DEMO_OUTPUT}/${doc.filePath ? `${doc.filePath}/` : ''}${doc.fileName}`;
        },
        pathTemplate: '${fileName}',
      },
    ];

    computeIdsProcessor.idTemplates.push({
      docTypes: ['demo-source'],
      getId(doc) {
        return doc.name;
      },
      getAliases(doc) {
        return [doc.id];
      },
    });
  });

