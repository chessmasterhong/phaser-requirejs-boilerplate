'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    open = require('opn'),
    requirejs = require('requirejs');

gulp.task('clean-scripts', function() {
    return gulp.src('build/scripts/*', { read: false })
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
    return gulp.src(['src/scripts/game/**/*.js'])
        .pipe(jshint('.jshintrc'))
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
    open('http://127.0.0.1:8080/build/index-dev.html', 'firefox');
});

gulp.task('serve-dist', ['connect'], function() {
    open('http://127.0.0.1:8080/build/index.html', 'firefox');
});

gulp.task('watch', function() {
    gulp.watch(['src/scripts/game/**/*.js'], ['requirejs-dev']);
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
