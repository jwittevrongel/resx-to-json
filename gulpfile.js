'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gulpMocha = require('gulp-mocha');

var srcJs = ['*.js', 'bin/**'];
var testJs = ['test/**/*.js'];
var allJs = srcJs.concat(testJs);

gulp.task('jshint', function() {
  return gulp.src(allJs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src(allJs)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('test', function() {
  return gulp.src(testJs, { read: false })
    .pipe(gulpMocha());
});

gulp.task('static-analysis', ['jshint', 'jscs']);
gulp.task('default', ['static-analysis', 'test']);


