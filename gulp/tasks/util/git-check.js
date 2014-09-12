var gulp = require('gulp');
var sh = require('shelljs');
var gutil = require('gulp-util');

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    gutil.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
