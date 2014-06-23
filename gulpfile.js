'use strict';

// Gulp configuration
var PORT = 8080,
    PATHS = {
        // Base paths
        source: './src/',
        build: './build/',

        // Subdirectories after base path where contents should be read from and written to
        media: 'media/',
        scripts: 'scripts/',
        styles: 'styles/',

        // Path to header file to concatenate with minified script output file
        header: './tasks/header.js'
    };

// Load Gulp task dependencies
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    prochtml = require('gulp-processhtml'),
    requirejs = require('requirejs'),
    rimraf = require('rimraf');

// Lint JavaScript files
gulp.task('lint', function() {
    return gulp.src([PATHS.source + PATHS.scripts + '**/*.js', '!' + PATHS.source + PATHS.scripts + '{,bower_components,bower_components/**/*}'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// Concatenates, minifies, uglifies, and outputs JavaScript files to build directory
gulp.task('scripts', ['lint'], function() {
    requirejs.optimize({
        baseUrl: PATHS.source + PATHS.scripts,
        out: PATHS.build + PATHS.scripts + 'game.min.js',
        mainConfigFile: PATHS.source + PATHS.scripts + 'main.js',
        include: ['almond', 'main'],
        wrap: {
            startFile: './tasks/_start.js',
            endFile: './tasks/_end.js'
        },
        optimize: 'uglify2',
        preserveLicenseComments: false
    }, function() {
        return gulp.src([PATHS.header, PATHS.build + PATHS.scripts + 'game.min.js'])
            .pipe(concat('game.min.js'))
            .pipe(gulp.dest(PATHS.build + PATHS.scripts));
    }, function(err) {
        console.log(err);
        return 1;
    });
});

// Copies media files to build directory
// Image files (GIF, JPG, PNG, SVG) are minified; Non-media files are copied without modifications.
gulp.task('media', function() {
    return gulp.src(PATHS.source + PATHS.media + '**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(PATHS.build + PATHS.media));
});

// Processes "special comments" in HTML files and outputs to build directory
gulp.task('html', function() {
    return gulp.src(PATHS.source + 'index.html')
        .pipe(prochtml('index.html'))
        .pipe(gulp.dest(PATHS.build));
});

// Copies style sheet files to build directory
gulp.task('styles', function() {
    return gulp.src(PATHS.source + PATHS.styles + '**/*.css')
        .pipe(gulp.dest(PATHS.build + PATHS.styles));
});

// Start web server with LiveReload enabled
gulp.task('connect', function() {
    connect.server({
        root: PATHS.source,
        host: '127.0.0.1',
        port: PORT,
        livereload: true
    });
});

// Watch source files and perform appropriate tasks and reload browser when
// modifications are detected (if opened and at web page)
gulp.task('watch', function() {
    gulp.watch(PATHS.source + 'index.html');
    gulp.watch(PATHS.source + PATHS.styles + '**/*.css');
    gulp.watch(PATHS.source + PATHS.scripts + '**/*.js', ['lint']);
    gulp.watch(PATHS.source + PATHS.media + '**/*');

    gulp.watch([
        PATHS.source + 'index.html',
        PATHS.source + PATHS.styles + '**/*.css',
        PATHS.source + PATHS.scripts + '**/*.js',
        PATHS.source + PATHS.media + '**/*'
    ], function() {
        gulp.src(PATHS.source + 'index.html')
            .pipe(connect.reload());
    });
});

// Cleans (removes) build directory
gulp.task('clean', function(cb) {
    rimraf(PATHS.build, cb);
});

// Build from source
gulp.task('build', ['clean'], function() {
    gulp.start('scripts', 'media', 'html', 'styles');
});

// Serve and run source (default)
gulp.task('default', ['connect', 'watch']);
