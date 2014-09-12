var karmaConfig = require('../config/karma.json');

module.exports = function(config) {
  karmaConfig.basePath = '../';

  config.set(karmaConfig);
};
