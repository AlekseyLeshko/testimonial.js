var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('css', function() {
  var config = {
    keepSpecialComments: 0
  };

  return gulp.src('src/css/**/*.css')
    .pipe(minifyCSS(config))
    .pipe(concat('testimonial.min.css'))
    .pipe(gulp.dest('dist/css/'));
});
