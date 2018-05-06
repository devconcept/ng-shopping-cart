const {Package} = require('dgeni');
const tsPkg = require('dgeni-packages/typescript');
const cartBasePkg = require('../base-package/index');

const {TYPESCRIPT_SOURCES, ASSETS} = require('../config');

module.exports = exports = new Package('cartApi', [cartBasePkg, tsPkg])
  .processor(require('./processors/filterUnusedDocs'))
  .processor(require('./processors/filterIgnoredFiles'))
  .processor(require('./processors/generateKebabNames'))
  .processor(require('./processors/computeNgType'))
  .processor(require('./processors/addTypeParameters'))
  .processor(require('./processors/addServiceDependencies'))
  .processor(require('./processors/generateApiModules'))
  .processor(require('./processors/fixHeritageInfo'))
  .processor(require('./processors/fixMembersType'))
  .processor(require('./processors/generateApiRoutes'))
  .processor(require('./processors/generateSearchService'))
  .factory(require('./services/getTypeFolder'))
  .config(function (parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables([
      require('./tag-defs/ignore'),
      require('./tag-defs/means'),
      require('./tag-defs/note'),
      require('./tag-defs/example'),
      require('./tag-defs/howToUse'),
    ]));
  })
  .config(function (unescapeCommentsProcessor, readTypeScriptModules, templateEngine, getInjectables) {
    readTypeScriptModules.sourceFiles = TYPESCRIPT_SOURCES;
    unescapeCommentsProcessor.$enabled = false;
    templateEngine.filters = templateEngine.filters.concat(getInjectables([
      require('./rendering/emitterType'),
      require('./rendering/backTicks')
    ]));
  })
  .config(function (computePathsProcessor) {
    computePathsProcessor.pathTemplates = computePathsProcessor.pathTemplates.concat([
      {
        docTypes: ['class', 'interface', 'type-alias', 'const'],
        getOutputPath: function (doc) {
          return `${ASSETS}/${doc.computedName}.md`
        },
        getPath: function (doc) {
          if (doc.ngType) {
            return '${ngType}.md';
          }
          return '${docType}.md'
        }
      },
      {
        docTypes: ['search-service'],
        outputPathTemplate: 'api/search-service.ts',
        pathTemplate: '${docType}.ts'
      },
    ]);
  });
