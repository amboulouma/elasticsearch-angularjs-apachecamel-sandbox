'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var gulpPlugins = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe(gulpPlugins.inject(injectStyles, injectOptions))
    .pipe(gulpPlugins.inject(injectScripts, injectOptions))
    .pipe(wiredep())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
