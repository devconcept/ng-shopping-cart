const {Package} = require('dgeni');
const tsDocsPkg = require('dgeni-packages/typescript');
const cartBasePkg = require('../base-package/index');

const {TYPESCRIPT_SOURCES, API_OUTPUT} = require('../config');

module.exports = exports = new Package('cartApi', [cartBasePkg, tsDocsPkg])
  .processor(require('./processors/filterUnusedDocs'))
  .processor(require('./processors/filterIgnoredFiles'))
  .processor(require('./processors/generateKebabNames'))
  .processor(require('./processors/computeNgType'))
  .processor(require('./processors/generateApiModules'))
  .processor(require('./processors/generateApiRoutes'))
  .factory(require('./services/getTypeFolder'))
  .config(function (parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables([
      require('./tag-defs/ignore'),
      require('./tag-defs/means'),
    ]));
  })
  .config(function (unescapeCommentsProcessor, readTypeScriptModules, templateEngine, getInjectables) {
    readTypeScriptModules.sourceFiles = TYPESCRIPT_SOURCES;
    unescapeCommentsProcessor.$enabled = false;
    templateEngine.filters = templateEngine.filters.concat(getInjectables([
      require('./rendering/backTicks'),
      require('./rendering/removeParagraph'),
      require('./rendering/emitterType')
    ]));
  })
  .config(function (computePathsProcessor, getTypeFolder) {
    computePathsProcessor.pathTemplates = computePathsProcessor.pathTemplates.concat([
      {
        docTypes: ['class', 'interface', 'type-alias'],
        getOutputPath: function (doc) {
          const folder = getTypeFolder(doc);
          const file = doc.ngType === 'component' ? doc.computedName.replace(/-component/, '') : doc.computedName;
          return `${API_OUTPUT}/${folder}/routes/${file}.component.html`
        },
        getPath: function (doc) {
          if (doc.ngType) {
            return '${ngType}.html';
          }
          return '${docType}.html'
        }
      }
    ]);
  });
