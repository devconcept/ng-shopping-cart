const {escape} = require('lodash');

module.exports = function escapeHtml() {
  return {
    name: 'escapeHtml',
    process: function(str) {
      return escape(str);
    }
  };
};
