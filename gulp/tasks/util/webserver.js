var gulp = require('gulp');
var webserver = require('gulp-webserver');
var appConfig = require('../../../config/app.json');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      port: appConfig.dev.port,
      open: '/examples/example.html'
    }));
});
