const Dgeni = require('dgeni');

const dgeni = new Dgeni([require('./index')]);

dgeni.generate().then(function (docs) {
  console.log(docs.length, 'docs generated');
});
