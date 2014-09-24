var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

gulp.task('scripts', ['jshint'], function() {
  var config = {
    mangle: true
  };

  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('testimonial.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify(config))
    .pipe(rename('testimonial.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename('testimonial.min.map.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js/'));
});
