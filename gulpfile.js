'use strict';

var gulp = require('gulp'),
    requirejs = require('requirejs');

gulp.task('requirejs', function() {
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
    });
});

gulp.task('default', ['requirejs']);
