module.exports = exports = function () {
  return {
    name: 'next',
    transforms: function (doc, tag, tagDescription) {
      const line = tagDescription.split('\n');
      return line[0];
    }
  };
};
