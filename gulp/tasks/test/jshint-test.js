var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jshint-test', function() {
  var paths = [
    'test/unit/**/*.js'
  ];

  var jshintConfig = {
    globals: {
      describe: false,
      beforeEach: false,
      it: false,
      expect: false,
      spyOn: false,
      $: false,
      TestimonialSlide: false,
      jasmine: false,
      loadFixtures: false,
      Parser: false,
      Testimonial: false
    }
  };
  return gulp.src(paths)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});
