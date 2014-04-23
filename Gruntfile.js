module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.initConfig({
    qunit: {
      all: ['test/index.html']
    }
  });

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test']);
};
