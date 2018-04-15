module.exports = function escapeMarkdown() {
  return {
    name: 'escapeMarkdown',
    process: function(str) {
      return str.replace(/`/g, '\\`').replace(/{/g, '\\{').replace(/}/g, '\\}').replace(/\//g, '\/');
    }
  };
};
