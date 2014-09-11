var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('run', function(callback) {
  return runSequence(['bower', 'build', 'connect', 'watch'], 'open-index', callback);
});
