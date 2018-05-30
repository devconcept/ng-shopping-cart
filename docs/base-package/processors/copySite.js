module.exports = function copySite(copyFolder, staticAssets) {
  return {
    name: 'copySite',
    $runAfter: ['writing-files'],
    $runBefore: ['files-written'],
    $process: function (docs) {
      return Promise.all(staticAssets
        .getAssets()
        .map(asset => copyFolder(asset.from, asset.to)))
        .then(() => docs);
    }
  };
};
