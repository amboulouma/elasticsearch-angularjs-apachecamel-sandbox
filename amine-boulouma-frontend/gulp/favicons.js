var favicons = require("gulp-favicons");
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task("favicons", ['html'], function () {
  return gulp.src(config.favicon).pipe(favicons({
    appName: config.appTitle,
    appDescription: config.appDescription,
    developerName: 'Boot-start',
    developerURL: 'http://boot-start.com/',
    background: config.flattenedIconsBg,
    path: 'favicons/',
    url: config.url,
    display: 'browser',
    orientation: 'landscape',
    version: config.appVersion,
    logging: false,
    online: false,
    html: 'dist/index.html',
    replace: true
  })).pipe(gulp.dest('dist/favicons/'));
});
