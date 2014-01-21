/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/** \n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
      ' * web: <%= pkg.homepage %> \n' +
      ' * issues: <%= pkg.bugs.url %> \n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
    concat: {
      dist: {
        src: ['libs/jquery.onfontresize.min.js', 'dist/placeholder_polyfill.jquery.min.js'],
        dest: 'dist/placeholder_polyfill.jquery.min.combo.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          requestAnimationFrame: true,
          cancelAnimationFrame: true
        }
      },
      files: ['Gruntfile.js', 'src/*.js']
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/placeholder_polyfill.jquery.js',
        dest: 'dist/placeholder_polyfill.jquery.min.js'
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/placeholder_polyfill.min.css': ['src/placeholder_polyfill.css']
        }
      }
    },
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: '*.markdown',
            dest: 'web/',
            ext: '.html'
          }
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json', 'component.json', 'bower.json'],
        push: false
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.files %>',
        tasks: ['jshint']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'concat', 'markdown']);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-bump');

};
