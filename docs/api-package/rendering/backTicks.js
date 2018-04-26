module.exports = function backTicks() {
  return {
    name: 'backTicks',
    process: function (str) {
      return str.split('|').map(word => '`' + word + '`').join(' | ')
    }
  };
};
