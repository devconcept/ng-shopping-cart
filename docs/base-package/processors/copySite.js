module.exports = function copySite(copyFolder, staticAssets) {
  return {
    name: 'copySite',
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
