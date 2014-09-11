var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');

gulp.task('bower', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
