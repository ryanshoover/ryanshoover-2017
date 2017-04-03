var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


gulp.task('css', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist'))
});

gulp.task('js', function() {
	return gulp.src('./src/js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['css', 'js'], function (){
	gulp.watch('src/scss/**/*.scss', ['css']);
	gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', [ 'watch' ]);