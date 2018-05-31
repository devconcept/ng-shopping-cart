const {config} = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox'],
  },
};

exports.config = config;
