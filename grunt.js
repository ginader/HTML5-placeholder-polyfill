/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:HTML5-placeholder-polyfill.jquery.json>',
    meta: {
      banner: '/** \n' +
        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * web: <%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        ' * issues: <%= pkg.bugs.url ? "* " + pkg.bugs.url + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n*/'
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>','src/placeholder_polyfill.jquery.js'],
        dest: 'dist/placeholder_polyfill.jquery.min.js'
      }
    },
    concat: {
      dist: {
        src: ['libs/onfontresize.jquery.min.js', 'dist/placeholder_polyfill.jquery.min.js'],
        dest: 'dist/placeholder_polyfill.jquery.min.combo.js'
      }
    },
    lint: {
      files: ['grunt.js', 'src/placeholder_polyfill.jquery.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
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
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint min concat');

};
