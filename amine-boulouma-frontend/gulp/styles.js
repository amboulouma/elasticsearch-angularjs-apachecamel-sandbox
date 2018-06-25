'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var gulpPlugins = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

var buildStyles = function() {
  var sassOptions = {
    style: 'expanded',
    precision: 3
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
    path.join(conf.paths.src, '/app/index.scss')
  ])
    .pipe(gulpPlugins.inject(injectFiles, injectOptions))
    .pipe(wiredep())
    .pipe(gulpPlugins.sourcemaps.init())
    .pipe(gulpPlugins.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe(gulpPlugins.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(gulpPlugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

gulp.task('styles', function() {
  return buildStyles();
});

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
      .pipe(browserSync.stream());
});
