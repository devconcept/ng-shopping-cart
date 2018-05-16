module.exports = function ngEscape() {
  return {
    name: 'ngEscape',
    process: function(str) {
      return str.replace(/([{}<>])/g, '{{\'$1\'}}');
    }
  };
};
