var gulp = require('gulp');
var rimraf = require('rimraf'); // rimraf directly

var paths = {
  scripts: ['src/js/**/*.js'],
};

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('move', function() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function (cb) {
  rimraf('dist', cb);
});
