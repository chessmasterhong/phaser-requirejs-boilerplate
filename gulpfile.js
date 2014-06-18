'use strict';

var BROWSER = 'firefox',
    PORT = 8080;

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    open = require('opn'),
    requirejs = require('requirejs');


/** Script Tasks **/
gulp.task('clean-scripts', function() {
    return gulp.src(['build/scripts/**/*', '!build/scripts/{,lib,lib/**/*}'], { read: false })
        .pipe(clean());
});

gulp.task('lint-scripts', function() {
    return gulp.src('src/scripts/game/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('requirejs-dev', ['lint-scripts', 'clean-scripts'], function() {
    requirejs.optimize({
        baseUrl: 'src/scripts',
        out: 'build/scripts/game.compiled.dev.js',
        paths: {
            almond: '../../bower_components/almond/almond'
        },
        include: ['almond', 'game/game'],
        wrap: {
            startFile: 'src/scripts/_start.js',
            endFile: 'src/scripts/_end.js'
        },
        optimize: 'none',
        preserveLicenseComments: false,
        logLevel: 4
    }, function() {
        return 0;
    }, function(err) {
        console.log(err);
        return 1;
    });
});

gulp.task('requirejs-dist', ['lint-scripts', 'clean-scripts'], function() {
    requirejs.optimize({
        baseUrl: 'src/scripts',
        out: 'build/scripts/game.compiled.js',
        paths: {
            almond: '../../bower_components/almond/almond',
            phaser: '../../bower_components/phaser-official/build/phaser'
        },
        include: ['phaser', 'almond', 'game/game'],
        wrap: {
            startFile: 'src/scripts/_start.js',
            endFile: 'src/scripts/_end.js'
        },
        optimize: 'uglify2',
        logLevel: 4
    }, function() {
        return 0;
    }, function(err) {
        console.log(err);
        return 1;
    });
});

/** HTML Tasks **/
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});

/** Style Tasks **/
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.css')
        .pipe(gulp.dest('build/styles'));
});

/** Serve Tasks **/
gulp.task('connect', function() {
    return connect.server({
        root: 'build',
        host: '127.0.0.1',
        port: PORT
    });
});

gulp.task('serve-dev', ['connect'], function() {
    open('http://127.0.0.1:' + PORT + '/index-dev.html', BROWSER);
});

gulp.task('serve-dist', ['connect'], function() {
    open('http://127.0.0.1:' + PORT + '/index.html', BROWSER);
});

/** Maintenance Tasks **/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('build/**/*')
        .on('change', livereload.changed);
    gulp.watch('src/*.html', ['html'])
        .on('change', livereload.changed);
    gulp.watch('src/**/*.css', ['styles'])
        .on('change', livereload.changed);
    gulp.watch('src/scripts/**/*.js', ['requirejs-dev'])
        .on('change', livereload.changed);
});

/** Task Bundles **/
// Development build (default)
gulp.task('default', ['requirejs-dev', 'html'], function() {
    gulp.start('serve-dev');
    gulp.start('watch');
});

// Distribution build
gulp.task('distribute', ['requirejs-dist', 'html', 'styles'], function() {
    gulp.start('serve-dist');
    gulp.start('watch');
});
