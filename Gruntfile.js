module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pluginFileName: '<%= pkg.name.toLowerCase().substring(0, 11) %>',
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Author: <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    qunit: {
      all: ['test/index.html']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pluginFileName %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/js/<%= pluginFileName %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
  });

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build', ['concat', 'uglify']);
};
