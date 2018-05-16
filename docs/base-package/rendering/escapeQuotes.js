module.exports = function escapeQuotes() {
  return {
    name: 'escapeQuotes',
    process: function(str) {
      return str.replace(/`/g, '\\`');
    }
  };
};
