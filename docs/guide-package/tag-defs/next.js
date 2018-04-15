module.exports = exports = function () {
  return {
    name: 'next',
    transforms: function (doc, tag, tagDescription) {
      const match = tagDescription.match(/^(.+)\s+/);
      if (match) {
        tag.description = match[1];
        return tag.description;
      }
      return '';
    }
  };
};
