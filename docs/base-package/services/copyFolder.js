const {copy} = require('fs-extra');

module.exports = function copyFolder() {
  return (from, to) => {
    return new Promise((resolve, reject) => {
      copy(from, to, err => {
        if (err) {
          return reject(err);
        }
        resolve()
      });
    });
  }
};
