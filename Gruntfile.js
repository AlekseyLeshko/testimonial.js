module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

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
    clean: {
      dist: ['dist']
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
    cssmin: {
      combine: {
        files: {
          'dist/css/<%= pluginFileName %>.css': ['src/css/*.css']
        }
      },
      add_banner: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/<%= pluginFileName %>.css': ['dist/css/<%= pluginFileName %>.css']
        }
      },
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['*.png'],
          dest: 'dist/img/'
        }]
      }
    },
    qunit: {
      all: ['test/index.html']
    },
  });

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build', ['test', 'clean', 'concat', 'uglify', 'cssmin', 'imagemin']);
  grunt.registerTask('default', ['build']);
};
