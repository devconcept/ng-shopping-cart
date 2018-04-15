module.exports = function staticAssets() {
  const assets = [];
  return {
    add: function (from, to) {
      const ref = {from, to};
      assets.push(ref);
      return ref;
    },
    getAssets: function () {
      return assets;
    },
    remove: function (ref) {
      const idx = assets.indexOf(ref);
      if (idx !== -1) {
        assets.splice(idx, 1);
      }
    }
  };
};
