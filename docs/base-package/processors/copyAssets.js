module.exports = function copyAssets(copyFolder, staticAssets) {
  return {
    name: 'copyAssets',
    $runAfter: ['docs-rendered'],
    $runBefore: ['writing-files'],
    $process(docs) {
      async function processAssets() {
        const assets = staticAssets.getAssets();
        for (let i = 0; i < assets.length; i++) {
          const asset = assets[i];
          await copyFolder(asset.from, asset.to);
        }
      }

      return processAssets().then(() => docs);
    },
  };
};
