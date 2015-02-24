var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync.init(['src/app/**/*'], {
	    server: {
	        baseDir: './src/app/html/'
	    }
	});
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js'], cb);
});

gulp.task('css', function() {
  return sass('src/scss/main.scss', { style: 'expanded'})
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('watch', ['browser-sync'], function () {

	// Watch .scss files
	gulp.watch('src/scss/**/*.scss', ['css']);

	// Watch .js files
	gulp.watch('src/app/**/*.js', ['js']);

	// Watch .html files
	gulp.watch('src/app/**/*.html').on('change', reload);

});

// Default task
gulp.task('default', ['clean', 'watch'], function() {
    gulp.start('css', 'js');

});


