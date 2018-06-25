/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');

global.config = {
    appName: 'amine-boulouma-frontend',
    locales: 'en',
    appTitle: 'Amine Boulouma Sandbox',
    appDescription: 'This application allows...',
    appVersion: "1.0.1",
    url: 'http://localhost',
    logo: 'src/assets/images/logo.png',
    favicon: 'src/assets/images/favicon.png',
    flattenedIconsBg: '#fff'
};

require('./gulp/conf.js');
require('./gulp/styles.js');
require('./gulp/scripts.js');
require('./gulp/inject.js');
require('./gulp/watch.js');
require('./gulp/server.js');
require('./gulp/build.js');
require('./gulp/package.js');
require('./gulp/favicons.js');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

