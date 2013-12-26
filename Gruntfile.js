'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    copy: {
      inuit: {
        expand: true
       ,cwd: 'bower_components/'
       ,src: 'inuit.css/**'
       ,dest: 'app/templates/'
      }

     ,modernizr: {
        expand: true
       ,cwd: 'bower_components/'
       ,src: 'modernizr/**'
       ,dest: 'app/templates/'
      }
    }

   ,jshint: {

      options: {
        jshintrc: true
      }

     ,gruntfile: {
        src: 'Gruntfile.js'
      }

     ,generator: {
        src: 'app/templates/*.js'
      }
    }

   ,watch: {

      gruntfile: {
        files: '<%= jshint.gruntfile.src %>'
       ,tasks: ['jshint:gruntfile']
      }

     ,generator: {
        files: '<%= jshint.generator.src %>'
       ,tasks: ['jshint:generator']
      }
    }
  });


  // Default task.
  grunt.registerTask('default', ['jshint', 'watch']);
};
