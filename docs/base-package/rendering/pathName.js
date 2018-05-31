module.exports = function pathName() {
  return {
    name: 'pathName',
    process(str) {
      return str.toLowerCase().replace(/ /g, '-');
    },
  };
};
