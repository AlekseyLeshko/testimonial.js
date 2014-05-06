module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

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
      options: {
        coverage: {
          src: [ 'src/js/*.js' ],
          instrumentedFiles: 'temp/',
          htmlReport: 'coverage-results/html/',
          lcovReport: 'coverage-results/lcov',
          linesThresholdPct: 70
        }
      },
      qunit: [
        'test/index.html'
      ]
    },
    coveralls: {
      grunt_coverage: {
        force: true,
        src: 'coverage-results/lcov/lcov.info'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        },
        keepalive: true
      },
    }
  });

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('coverage', ['coveralls']);
  grunt.registerTask('dist-js', ['concat', 'uglify']);
  grunt.registerTask('dist-img', ['imagemin']);
  grunt.registerTask('dist-css', ['cssmin']);
  grunt.registerTask('dist', ['dist-js', 'dist-css', 'dist-img']);
  grunt.registerTask('build', ['test', 'clean', 'dist']);
  grunt.registerTask('ci', ['test', 'coverage', 'clean', 'dist']);
  grunt.registerTask('default', ['build']);
};
