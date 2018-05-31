const Dgeni = require('dgeni');

const dgeni = new Dgeni([require('./index')]);

dgeni.generate().then((docs) => {
  console.log(docs.length, 'docs generated'); // eslint-disable-line no-console
});
