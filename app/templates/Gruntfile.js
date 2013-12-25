'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
      }
     ,gruntfile: {
        src: 'Gruntfile.js'
      }
     ,app: {
        src: ['app/js/**/*.js']
      }
    }

   ,watch: {

      gruntfile: {
        files: '<%= jshint.gruntfile.src %>'
       ,tasks: ['jshint:gruntfile']
      }

     ,app: {
        files: '<%= jshint.app.src %>'
       ,tasks: ['jshint:app']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'watch']);

};
