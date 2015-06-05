module.exports = function(grunt) {

  require('time-grunt')(grunt);
 
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
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
            'respond',
            'normalize.css'
        ],
        bowerOptions: {
          relative: false
        }
      }
    },
    autoprefixer: {
      single_file: {
        src: 'style.css',
        dest: 'style.css'
      },
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/compressed/'
        }]
      }
    },
    open : {
      dev : {
        path: 'http://127.0.0.1:9001/',
        app: 'chrome.exe'
      },
      web : {
        path: 'https://github.com/forwardomg/Forkit',
        app: 'chrome.exe'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true
        },
      }
    },
    watch: {
      less: {
        files: ['less/*.{less,html,php}', '*.{less,html,php}', 'js/*.js'],
        tasks: ['compile'],
        options: {
          livereload: true,
          nospawn: true
        },
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('compile', ['less', 'autoprefixer']);
  grunt.registerTask('dev', ['open:dev', 'watch']);
  
};