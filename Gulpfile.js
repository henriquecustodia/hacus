'use strict';

const packageConfig = require('./package.json');

const gulp = require('gulp');

const connect = require('gulp-connect');

const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

gulp.task('bundle:lib', () => {
    var bundler = browserify({
        entries: 'src/index.js',
        debug: true
    });
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(`${packageConfig.name}.js`))
        .pipe(buffer())
        .pipe(gulp.dest('example/lib'));
});

gulp.task('bundle:example', () => {
    var bundler = browserify({
        entries: 'example/app.js',
        debug: true
    });
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(`app.js`))
        .pipe(buffer())
        .pipe(gulp.dest('example/dist'));
});

gulp.task('bundle:dist', () => {
    var bundler = browserify({
        entries: 'src/index.js',
        debug: true
    });
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(`${packageConfig.name}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(minify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', () => {
    connect.server({
        livereload: true
    });
});

gulp.task('server:reload', () => {
    connect.reload();
});

gulp.task('watch', () => {

    gulp.watch([
        'src/*.js',
        'src/**/*.js',
        'src/**/**/*.js'
    ], ['bundle:lib', 'server:reload']);

    gulp.watch([
        'example/*.js',
    ], ['bundle:example', 'server:reload']);

    gulp.watch([
        'example/*.html',
        'example/**/*.html',
    ], ['bundle:example', 'server:reload']);
});

gulp.task('serve', ['bundle:lib', 'bundle:example', 'watch', 'connect']);
