'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var rename = require("gulp-rename");

var gulpPlugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe(gulpPlugins.htmlmin({
      //removeEmptyAttributes: true,
      removeAttributeQuotes: true//,
      //collapseBooleanAttributes: true,
      //collapseWhitespace: true
    }))
    .pipe(gulpPlugins.angularTemplatecache('templateCacheHtml.js', {
      module: config.appName,
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = gulpPlugins.filter('*.html', { restore: true });
  var jsFilter = gulpPlugins.filter('**/*.js', { restore: true });
  var cssFilter = gulpPlugins.filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(gulpPlugins.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(gulpPlugins.useref())
    .pipe(jsFilter)
    // .pipe(gulpPlugins.sourcemaps.init())
    //.pipe(gulpPlugins.uglify({ preserveComments: gulpPlugins.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulpPlugins.rev())
    // .pipe(gulpPlugins.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    // .pipe(gulpPlugins.sourcemaps.init())
    .pipe(gulpPlugins.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe(gulpPlugins.replace('../../bower_components/font-awesome/fonts/', '../fonts/'))
    //.pipe(gulpPlugins.cssnano({zindex:false}))
    .pipe(gulpPlugins.rev())
    // .pipe(gulpPlugins.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(gulpPlugins.revReplace())
    .pipe(htmlFilter)
    .pipe(gulpPlugins.htmlmin({
      //removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      //collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(gulpPlugins.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src(gulpPlugins.mainBowerFiles())
    .pipe(gulpPlugins.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe(gulpPlugins.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('i18n', function () {

  var files = 'bower_components/angular-i18n/angular-locale_*.js';
  if (config.locales !== undefined && config.locales !== "*"){
    files = 'bower_components/angular-i18n/angular-locale_{' + config.locales + '}.js';
  }
  return gulp.src(files)
    .pipe(gulpPlugins.uglify({ preserveComments: gulpPlugins.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulpPlugins.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/angular-i18n/')));
});

gulp.task('other', function () {
  var fileFilter = gulpPlugins.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}'),
    path.join('!' + conf.paths.config, '/**')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});


// Generate /config/config.js angular module
gulp.task('config', function () {

  // Use config.production.js for dist/config/config.js used for distribution
  gulp.src(path.join(conf.paths.config, '/config.production.js'))
  	.pipe(rename('config.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/config')));

  // Use config.development.js for tmp/serve/config/config.js used for local running via gulp serve
  gulp.src(path.join(conf.paths.config, '/config.development.js'))
  	.pipe(rename('config.js'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/config')));

  // Include other configuration files in config directory
  gulp.src([
    path.join(conf.paths.config, '/**/*'),
    path.join('!' + conf.paths.config, '/**/config*.{exemple,json}'),
    path.join('!' + conf.paths.config, '/**/config.*.js')
  ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/config')));
});

gulp.task('clean', function () {
  return gulpPlugins.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['favicons', 'fonts', 'other', 'i18n', 'config'], function () {
});
