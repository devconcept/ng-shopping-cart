const {kebabCase} = require('lodash');

module.exports = function generateKebabNames() {
  return {
    name: 'generateKebabNames',
    $runAfter: ['filterIgnoredFiles'],
    $runBefore: ['computing-paths'],
    $process: function(docs) {
      docs.forEach(function(doc) {
        doc.computedName = kebabCase(doc.name);
      });
    }
  };
};
