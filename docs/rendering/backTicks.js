module.exports = function toId() {
  return {
    name: 'backTicks',
    process: function(str) { return str.split('|').map(t => ('`' + t.trim() + '`')).join(' | ') }
  };
};
