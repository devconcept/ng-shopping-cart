module.exports = function staticAssets() {
  const assets = [];
  return {
    add(from, to) {
      const ref = {from,
        to};
      assets.push(ref);
      return ref;
    },
    getAssets() {
      return assets;
    },
    remove(ref) {
      const idx = assets.indexOf(ref);
      if (idx !== -1) {
        assets.splice(idx, 1);
      }
    },
  };
};
