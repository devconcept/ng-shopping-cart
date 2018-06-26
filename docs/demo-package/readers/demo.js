module.exports = function demoFileReader(customDocs) {
  return {
    name: 'demoFileReader',
    defaultPattern: /(demo\.|demo-)/,
    getDocs(fileInfo) {
      const DemoSourceDoc = customDocs.getDoc('DemoSourceDoc');
      return [new DemoSourceDoc(fileInfo)];
    },
  };
};
