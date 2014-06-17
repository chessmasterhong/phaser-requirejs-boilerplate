'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
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
    gulp.src(['src/game.js', 'src/game/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function() {
    connect.server({
        root: '',
        host: '127.0.0.1',
        port: 8080,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['lint', 'requirejs-dev']);
});

gulp.task('default', ['develop', 'webserver', 'watch']);
gulp.task('develop', ['lint', 'requirejs-dev']); // Development build
gulp.task('distribute', ['lint', 'requirejs-dist']); // Distribution build
