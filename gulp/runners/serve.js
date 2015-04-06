'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    path        = require('../utils/paths');

function browserSyncInit() {
  return browserSync.init({
    server: {
      baseDir: path.src.path,
      directory: true
    },
    startPath: '/index.html',
    notify: false,
    browser: 'google chrome canary'
  });
}

gulp.task('serve', ['default'], function() {

  browserSyncInit();

  gulp.watch([path.src.html + '**/*.jade'], ['html']);
  gulp.watch([path.src.css + '**/*.scss'], ['css']);
  gulp.watch([path.src.js + '**/*'], ['js:hint']);
  gulp.watch([path.src.img + '**/*'], ['img']);
  gulp.watch([path.src.data + '**/*'], ['data']);

});
