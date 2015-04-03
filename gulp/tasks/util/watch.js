var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch', function() {
  return gulp.watch('src/**/*.*', ['build']);
});
