module.exports = function ngEscape() {
  return {
    name: 'ngEscape',
    process(str) {
      return str.replace(/([{}<>])/g, '{{\'$1\'}}');
    },
  };
};
