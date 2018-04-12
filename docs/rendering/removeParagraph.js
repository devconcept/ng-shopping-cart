module.exports = function removeParagraph() {
  return {
    name: 'removeParagraph',
    process: function(str) {
      return str.replace(/^<p>(.*)<\/p>\s*$/, '$1');
    }
  };
};
