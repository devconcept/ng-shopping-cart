const {escape} = require('lodash');

module.exports = function escapeHtml() {
  return {
    name: 'escapeHtml',
    process(str) {
      return escape(str);
    },
  };
};
