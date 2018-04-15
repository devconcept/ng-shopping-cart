module.exports = function copySite(copyFolder, staticAssets) {
  return {
    name: 'copySite',
    $runAfter: ['writing-files'],
    $runBefore: ['files-written'],
    $process: function () {
      staticAssets.getAssets().forEach(asset => {
        copyFolder(asset.from, asset.to);
      });
    }
  };
};
