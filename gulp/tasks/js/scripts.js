var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', ['jshint'], function() {
  var config = {
    mangle: true
  };

  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify(config))
    .pipe(concat('testimonial.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js/'));
});
