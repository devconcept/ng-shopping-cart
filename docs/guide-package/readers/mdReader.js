module.exports = function mdReader(customDocs) {
  const GuideDoc = customDocs.getDoc('GuideDoc');

  return {
    name: 'mdReader',
    defaultPattern: /\.md$/,
    getDocs: function (fileInfo) {
      const guideDoc = new GuideDoc(fileInfo);
      return [guideDoc];
    }
  };
};
