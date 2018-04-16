module.exports = function escapeBrackets() {
  return {
    name: 'escapeBrackets',
    process: function(str) {
      return str.replace(/([{}])/g, '{{ \'$1\' }}');
    }
  };
};
