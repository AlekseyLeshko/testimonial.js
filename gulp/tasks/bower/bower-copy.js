var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('bower-copy', function(callback) {
  var tasks = [
    'bower-js',
    'bower-css',
    'bower-fonts'
  ];
  return runSequence(tasks, callback);
});
