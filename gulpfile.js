'use strict';

var PORT = 8080,
    PATHS = {
        source: './src/',
        build: './build/',
        styles: 'styles/',
        scripts: 'scripts/'
    };

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    prochtml = require('gulp-processhtml'),
    requirejs = require('requirejs'),
    rimraf = require('rimraf');

gulp.task('clean', function(cb) {
    rimraf(PATHS.build, cb);
});

gulp.task('lint', function() {
    return gulp.src([PATHS.source + PATHS.scripts + '**/*.js', '!' + PATHS.source + PATHS.scripts + '{,bower_components,bower_components/**/*}'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('requirejs', ['lint'], function() {
    requirejs.optimize({
        baseUrl: PATHS.source + PATHS.scripts,
        out: PATHS.build + PATHS.scripts + 'game.min.js',
        paths: {
            almond: 'bower_components/almond/almond',
            phaser: 'bower_components/phaser/index'
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
    return gulp.src(PATHS.source + 'index.html')
        .pipe(prochtml('index.html'))
        .pipe(gulp.dest(PATHS.build));
});

gulp.task('styles', function() {
    return gulp.src(PATHS.source + PATHS.styles + '**/*.css')
        .pipe(gulp.dest(PATHS.build + PATHS.styles));
});

gulp.task('connect', function() {
    connect.server({
        root: PATHS.source,
        host: '127.0.0.1',
        port: PORT,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(PATHS.source + 'index.html');
    gulp.watch(PATHS.source + PATHS.styles);
    gulp.watch(PATHS.source + PATHS.scripts, ['lint']);
    gulp.watch([PATHS.source + 'index.html', PATHS.source + PATHS.styles, PATHS.source + PATHS.scripts], function() {
        gulp.src(PATHS.source + 'index.html')
            .pipe(connect.reload());
    });
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['clean'], function() {
    gulp.start('requirejs', 'html', 'styles');
});
