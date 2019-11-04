const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concatCSS = require('gulp-concat-css');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');

function jsBundle() {
		return gulp.src('src/js/index.js')
			.pipe(webpack(require('./webpack.config.js')))
			.pipe(gulp.dest('src/js'));
}

function style() {
	return gulp.src(['./src/sass/*.sass','./src/sass/components/*.sass', './src/sass/services/*.sass'])
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer())
		.pipe(concatCSS("style.css"))
		.pipe(gulp.dest('./src/css'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
	server: {
		baseDir: "./src",
		index: "/index.html",
	}
});
gulp.watch(['./src/sass/*.sass','./src/sass/components/*.sass', './src/sass/services/*.sass'], { usePoling: true }, style);
gulp.watch('./src/*.html').on('change', browserSync.reload);
gulp.watch('./src/js/*.js', jsBundle).on('change', browserSync.reload);
}
exports.default = watch;
exports.style = style;
exports.jsBundle = jsBundle;
