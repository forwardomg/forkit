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
    imagemin: {  
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img/'                  // Destination path prefix
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less']);
  grunt.registerTask('default', ['watch']);
  
};