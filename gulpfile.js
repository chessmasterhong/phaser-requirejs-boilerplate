'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    open = require('opn'),
    requirejs = require('requirejs');

gulp.task('requirejs-dev', function() {
    requirejs.optimize({
        baseUrl: 'src',
        out: 'build/game.compiled.dev.js',
        paths: {
            almond: '../bower_components/almond/almond'
        },
        include: ['almond', 'game'],
        wrap: {
            startFile: 'src/_start.js',
            endFile: 'src/_end.js'
        },
        optimize: 'none',
        preserveLicenseComments: false
    });
});

gulp.task('requirejs-dist', function() {
    requirejs.optimize({
        baseUrl: 'src',
        out: 'build/game.compiled.js',
        paths: {
            almond: '../bower_components/almond/almond',
            phaser: '../bower_components/phaser-official/build/phaser'
        },
        include: ['phaser', 'almond', 'game'],
        wrap: {
            startFile: 'src/_start.js',
            endFile: 'src/_end.js'
        },
        optimize: 'uglify2'
    });
});

gulp.task('lint', function() {
    gulp.src(['src/game.js', 'src/game/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('connect', function() {
    connect.server({
        host: '127.0.0.1',
        port: 8080,
        livereload: true
    });
});

gulp.task('serve-dev', ['connect'], function() {
    open('http://127.0.0.1:8080/site/index-dev.html', 'firefox');
});

gulp.task('watch', function() {
    gulp.watch(['src/game.js', 'src/game/**/*.js'], ['lint', 'requirejs-dev']);
});

gulp.task('default', ['lint', 'requirejs-dev', 'serve-dev', 'watch']); // Development build
gulp.task('distribute', ['lint', 'requirejs-dist']); // Distribution build
