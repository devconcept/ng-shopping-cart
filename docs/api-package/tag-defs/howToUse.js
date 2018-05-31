module.exports = function() {
  return {
    name: 'howToUse',
    multi: true,
    transforms(doc, tag, tagDescription) {
      const titleRegExp = /\s*"((?:\w+\s*)+)"\s+/;
      let title = '';
      let description = tagDescription;
      const titleMatch = titleRegExp.exec(tagDescription);
      if (titleMatch) {
        [, title] = titleMatch;
        description = tagDescription.replace(titleRegExp, '');
      }
      return {
        title,
        description,
      };
    },
  };
};
