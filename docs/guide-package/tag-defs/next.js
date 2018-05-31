module.exports = exports = function() {
  return {
    name: 'next',
    transforms(doc, tag, tagDescription) {
      const line = tagDescription.split('\n');
      return line[0];
    },
  };
};
