var Config = require('./config');
var bail = require('./bail');

function chechConfig(configArr) {
  var ver = configArr[0].ver
  for (var i = 1; i < configArr.length; i++) {
    var config = configArr[i];
    if (config.ver.toString() !== ver.toString()) {
      bail('Not equals version in config files');
    }
  }
  console.log(true);
}

var configFileNames = ['package.json', 'bower.json'];
var configs = [];

for (var i = 0; i < configFileNames.length; i++) {
  var fileName = configFileNames[i];
  var config = new Config(fileName);
  configs.push(config);
  config.check();
}

chechConfig(configs);
