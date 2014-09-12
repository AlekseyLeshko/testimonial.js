var gulp = require('gulp');
var karma = require('karma').server;
var _ = require('lodash');
var defaultConfig = require('../../../config/karma.json');

gulp.task('tdd', function (done) {
  var specificConfig = {
    browsers: ['PhantomJS']
  };

  var karmaConfig = _.assign({}, defaultConfig, specificConfig);
  karma.start(karmaConfig, done);
});
