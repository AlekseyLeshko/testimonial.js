var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var header = require('gulp-header');
var bundleGulp = require('../util/bundleGulp');
var pkg = require('../../../package.json');

gulp.task('scripts', ['jshint'], function() {
  var config = {
    mangle: true
  };

  var headerConfig = {
    pkg: pkg
  };

  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('testimonial.js'))
    .pipe(header(bundleGulp.getBanner(), headerConfig))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify(config))
    .pipe(rename('testimonial.min.js'))
    .pipe(header(bundleGulp.getBanner(), headerConfig))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename('testimonial.min.map.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/js/'));
});
