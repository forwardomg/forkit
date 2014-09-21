module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "style.css": "style.less"
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'js/_bower.js',
        exclude: [
            'fontawesome',
            'animate.css',
            'html5shiv',
            'respond'
        ],
        bowerOptions: {
          relative: false
        }
      }
    },
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'images/',                   // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'images/compressed/'                  // Destination path prefix
        }]
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['*.{less,html,php}'],
        tasks: ['less'],
        options: {
          livereload: true,
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less']);
  grunt.registerTask('default', ['bower_concat']);
  grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('default', ['watch']);
  
};