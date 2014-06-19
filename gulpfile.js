'use strict';

var //BROWSER = 'firefox',
    PORT = 8080;

var PATHS = {
    styles: './src/styles/**/*.css',
    scripts: './src/scripts/**/*.js',
    build: './build/'
};

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    prochtml = require('gulp-processhtml'),
    requirejs = require('requirejs');

gulp.task('clean', function() {
    return gulp.src(PATHS.build, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('lint', function() {
    return gulp.src([PATHS.scripts, '!./src/scripts/{,bower_components,bower_components/**/*}'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('requirejs', ['lint'], function() {
    requirejs.optimize({
        baseUrl: './src/scripts/',
        out: PATHS.build + 'scripts/game.js',
        paths: {
            almond: 'bower_components/almond/almond',
            phaser: 'bower_components/phaser-official/build/phaser'
        },
        include: ['phaser', 'almond', 'game/game'],
        wrap: {
            startFile: './tasks/_start.js',
            endFile: './tasks/_end.js'
        },
        optimize: 'uglify2',
        preserveLicenseComments: false
    }, function() {
        return 0;
    }, function(err) {
        console.log(err);
        return 1;
    });
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(prochtml('index.html'))
        .pipe(gulp.dest(PATHS.build));
});

gulp.task('styles', function() {
    return gulp.src(PATHS.styles)
        .pipe(gulp.dest(PATHS.build + 'styles/'));
});

gulp.task('connect', function() {
    connect.server({
        root: './src/',
        host: '127.0.0.1',
        port: PORT,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/index.html');
    gulp.watch(PATHS.styles);
    gulp.watch(PATHS.scripts, ['lint']);

    gulp.watch(['./src/index.html', PATHS.styles, PATHS.scripts], function() {
        gulp.src('./src/index.html')
            .pipe(connect.reload());
    });
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['requirejs', 'html', 'styles']);
