var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('run', function(callback) {
  return runSequence(['build', 'watch', 'tdd', 'webserver'], callback);
});
