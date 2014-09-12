var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('img', function(callback) {
  return runSequence('png', callback);
});
