module.exports = function mdReader(customDocs) {
  return {
    name: 'mdReader',
    defaultPattern: /\.md$/,
    getDocs(fileInfo) {
      const GuideDoc = customDocs.getDoc('GuideDoc');
      return [new GuideDoc(fileInfo)];
    },
  };
};
