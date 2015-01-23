var gulp = require('gulp');
var sh = require('shelljs');

gulp.task('clean', function() {
  sh.rm('-rf', './dist');
});
