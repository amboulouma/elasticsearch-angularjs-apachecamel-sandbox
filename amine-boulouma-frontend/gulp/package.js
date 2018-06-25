'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var exec = require('child_process').exec;

gulp.task('package', ['clean'], function () {
  conf.env = 'production';
  gulp.start('createArchive');
});

gulp.task('createArchive', ['build'], function (cb) {
  var packageName = config.appName +'-' + config.appVersion;
  exec('tar czf '+packageName+'.tgz dist/ --transform="s|^dist|'+packageName+'|"', function (err, stdout, stderr) {
    console.log("Making package "+packageName);
    cb(err);
  });
});
