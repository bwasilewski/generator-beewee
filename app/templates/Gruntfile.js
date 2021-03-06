// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
       ,reporter: require('jshint-stylish')
      }
     ,gruntfile: {
        src: 'Gruntfile.js'
      }
     ,app: {
        src: ['app/js/{,*/}*.js']
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
