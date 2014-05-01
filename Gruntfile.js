module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['test/index.html']
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/<%= pkg.name.toLowerCase() %>'
      }
    }
  });

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test']);
};
