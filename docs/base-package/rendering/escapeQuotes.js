module.exports = function escapeQuotes() {
  return {
    name: 'escapeQuotes',
    process(str) {
      return str.replace(/`/g, '\\`');
    },
  };
};
