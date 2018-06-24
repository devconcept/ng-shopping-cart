module.exports = function copyAssets(copyFolder, staticAssets) {
  return {
    name: 'copyAssets',
    $runAfter: ['docs-rendered'],
    $runBefore: ['writing-files'],
    $process(docs) {
      return Promise.all(staticAssets
        .getAssets()
        .map(asset => copyFolder(asset.from, asset.to)))
        .then(() => docs);
    },
  };
};
