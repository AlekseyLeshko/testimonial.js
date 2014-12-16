var gulp = require('gulp');
var gopen = require('gulp-open');
var appConfig = require('../../../config/app.json');

gulp.task('open-index', function(){
  var gopenConfig = {
    url: 'http://' + appConfig.dev.ip + ':' + appConfig.dev.port
  };

  if (appConfig.dev.browser) {
    gopenConfig.app = appConfig.dev.browser;
  }

  return gulp.src('./examples/index.html')
    .pipe(gopen('', gopenConfig));
});
