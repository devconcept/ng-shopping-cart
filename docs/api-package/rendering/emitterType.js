module.exports = function emitterType() {
  return {
    name: 'emitterType',
    process(str) {
      return str.replace(/new EventEmitter<(\w+)>\(\)/, '$1');
    },
  };
};
