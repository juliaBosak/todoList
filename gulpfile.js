const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concatCSS = require('gulp-concat-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

function babelJs() {
	return gulp.src('src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('index.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
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
	gulp.watch('./src/js/*.js').on('change', browserSync.reload);
}
exports.default = watch;
exports.style = style;
