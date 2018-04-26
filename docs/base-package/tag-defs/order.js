module.exports = exports = function () {
  return {
    name: 'order',
    transforms: function (doc, tag, tagDescription) {
      const orderRegExp = /^(\d+)/;
      const value = orderRegExp.exec(tagDescription);
      if (value) {
        const order = parseInt(value[1], 10);
        return Number.isNaN(order) ? 0 : order;
      }
      return 0;
    }
  };
};
