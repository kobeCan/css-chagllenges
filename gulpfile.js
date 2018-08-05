const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const clean = require('gulp-clean');
const sequence = require('gulp-sequence');
const fs = require('fs');

const FileList = require('./Files.json');

const path_ejs = ['./src/**/*.ejs', '!./src/examples/*.ejs'];
const path_sass = './src/**/*.scss';

const ejsParams = {
	files: FileList,
	htmlRelative: './examples', 
	title: 'Css Challenges',
	cssRelative: '.'
}

gulp.task('clean', function() {
	return gulp.src('./dist')
	.pipe(clean());
});

gulp.task('sass', function() {
	return gulp.src(path_sass)
	.pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload());
});

gulp.task('ejs', function() {
	return gulp.src(path_ejs)
	.pipe(ejs(ejsParams, {}, {ext: '.html'}).on('error', console.log))
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(path_ejs, ['ejs']);
	gulp.watch(path_sass, ['sass']);
});

gulp.task('sever', ['watch'], function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});
// for production
gulp.task('build', function(callback) {
	sequence('clean', ['sass', 'ejs'], callback);
});
// for development
gulp.task('default', function(callback) {
	sequence('clean', ['sass', 'ejs'], 'sever', callback);
});