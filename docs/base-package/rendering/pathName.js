module.exports = function pathName() {
  return {
    name: 'pathName',
    process: function(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  };
};
