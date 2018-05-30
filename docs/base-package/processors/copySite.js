module.exports = function copySite(copyFolder, staticAssets) {
  return {
    name: 'copySite',
    $runAfter: ['writing-files'],
    $runBefore: ['files-written'],
    $process: function () {
      return Promise.all(staticAssets
        .getAssets()
        .map(asset => copyFolder(asset.from, asset.to))
      );
    }
  };
};
