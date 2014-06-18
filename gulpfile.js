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

gulp.task('clean-scripts', function() {
    gulp.src(['build/scripts/**/*', '!build/scripts/{,lib,lib/**/*}'], { read: false })
        .pipe(clean());
});

gulp.task('requirejs-dev', ['lint'], function() {
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
        preserveLicenseComments: false
    });
});

gulp.task('requirejs-dist', ['lint'], function() {
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
        optimize: 'uglify2'
    });
});

gulp.task('lint', function() {
    gulp.src(['src/scripts/game/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('serve-dev', function() {
    connect.server({
        root: 'build',
        host: '127.0.0.1',
        port: PORT
    });
    open('http://127.0.0.1:' + PORT + '/index-dev.html', BROWSER);
});

gulp.task('serve-dist', function() {
    connect.server({
        root: 'build',
        host: '127.0.0.1',
        port: PORT
    });
    open('http://127.0.0.1:' + PORT + '/index.html', BROWSER);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('build/**/*')
        .on('change', livereload.changed);
    gulp.watch('src/scripts/**/*.js', ['requirejs-dev'])
        .on('change', livereload.changed);
});

// Development build (default)
gulp.task('default', ['clean-scripts', 'requirejs-dev'], function() {
    gulp.start('serve-dev');
    gulp.start('watch');
});

// Distribution build
gulp.task('distribute', ['clean-scripts', 'requirejs-dist'], function() {
    gulp.start('serve-dist');
    gulp.start('watch');
});
