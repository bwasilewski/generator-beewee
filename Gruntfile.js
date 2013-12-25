'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    copy: {
      app: {
        expand: true
       ,cwd: 'bower_components/'
       ,src: 'inuit.css/**'
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

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'watch']);

};
