var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('style', function () {
  return gulp.src('style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: ['> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('browserify', function() {
  return browserify('./js/app.js')
      .bundle()
      // Передаем имя файла, который получим на выходе, vinyl-source-stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/'));
});

gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function() {
  gulp.start('serve');
  gulp.watch('bower.json', ['bower']);
  gulp.watch('./**/*.{html,less}', function(event) {
    gulp.start('style');
    browserSync.reload();
  });
});