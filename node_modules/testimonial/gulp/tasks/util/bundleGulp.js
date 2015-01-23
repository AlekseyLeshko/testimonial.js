var util = require('gulp-util');
var appConfig = require('../../../config/app.json');

module.exports = {
  getBanner: function() {
    var banner = ['/**',
      '  * <%= pkg.name %> - <%= pkg.description %>',
      '  * @version v<%= pkg.version %>',
      '  * @link <%= pkg.homepage %>',
      '  * @license <%= pkg.license %>',
      '*/',
      ''
    ].join('\n');
    return banner;
  }
};
