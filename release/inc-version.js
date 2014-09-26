var Config = require('./config');
var bail = require('./bail');

var configFileNames = ['package.json', 'bower.json'];
var configs = [];

for (var i = 0; i < configFileNames.length; i++) {
  var fileName = configFileNames[i];
  var config = new Config(fileName);
  configs.push(config);
  config.check();
  config.incVer();
  config.save();
}
