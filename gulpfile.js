var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  return gulp.src('./style.less')
  		.pipe(less({
  			paths: [ path.join(__dirname, 'less', 'includes') ]
  		}))
      .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function() {
    gulp.watch('./*.{less,html}', function(event) {
        gulp.run('styles');
        browserSync.reload();
    });
});