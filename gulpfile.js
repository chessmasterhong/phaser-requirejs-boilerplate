'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
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
            phaser: 'lib/phaser/phaser.min'
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
    gulp.src(['src/game.js', 'src/game/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'requirejs-dev']); // Development build (default)
gulp.task('distribute', ['lint', 'requirejs-dist']); // Distribution build
