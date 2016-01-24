'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var srcJs = ['*.js', 'bin/**'];

gulp.task('jshint', function() {
  return gulp.src(srcJs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src(srcJs)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('static-analysis', ['jshint', 'jscs']);
gulp.task('default', ['static-analysis']);


