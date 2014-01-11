module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          'public/css/style.css': 'public/scss/style.scss'
        }
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /public\/js\/app\/templates\//
        },
        files: {
          'public/js/templates.js': 'public/js/app/templates/**/*.hbs'
        }
      }
    },

    concat: {
      libs: {
        src: [
          'public/js/libs/jquery-2.0.3.min.js',
          'public/js/libs/createUsersInLocalStorage.js',
          'public/js/libs/handlebars-1.0.0.js',
          'public/js/libs/ember-1.1.2.js',
          'public/js/libs/ember-data-1.0.0-beta.3.js',
          'public/js/libs/localstorage_adapter.js',
          'public/js/libs/moment.min.js'
        ],
        dest: 'public/js/libs.js'
      },
      app: {
        src: 'public/js/app/**/*.js',
        dest: 'public/js/app.js'
      }
    },

    watch: {
      sass: {
        files: 'public/scss/*.scss',
        tasks: ['sass']
      },
      emberTemplates: {
        files: 'public/js/app/templates/**/*.hbs',
        tasks: ['emberTemplates']
      },
      concat: {
        files: ['public/js/**/*.js', '!public/js/app.js', '!public/js/libs.js', '!public/js/templates.js'],
        tasks: ['concat']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat', 'emberTemplates']);
};

