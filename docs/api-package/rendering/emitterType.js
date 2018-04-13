module.exports = function emitterType() {
  return {
    name: 'emitterType',
    process: function(str) {
      return str.replace(/new EventEmitter<(\w+)>\(\)/, '$1')
    }
  };
};
