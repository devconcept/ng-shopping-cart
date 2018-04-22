module.exports = function() {
  return {
    name: 'note',
    multi: true,
    transforms: function (doc, tag, tagDescription) {
      const typeRegExp = /^{(\w+)}\s+/;
      const match = typeRegExp.exec(tagDescription);
      if (match) {
        return {
          type: match[1],
          description: tagDescription.replace(typeRegExp, '')
        };
      }
      return {
        type: 'default',
        description: tagDescription
      };
    }
  };
};
