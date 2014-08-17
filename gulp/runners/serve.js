'use strict';

var gulp        = require('gulp')
,   browserSync = require('browser-sync');

var path = require('../utils/paths');

gulp.task('serve', [ 'default' ], function () {

  browserSync.init({
    server: {
      baseDir: path.dist.path,
      directory: true
    },
    startPath: '/views/',
    notify: false,
    browser: 'google chrome canary'
  });

  gulp.watch([path.src.html + '**/*.jade'], ['html']);
  gulp.watch([path.src.css + '**/*.scss'], ['css']);
  gulp.watch([path.src.js + '**/*.js'], ['js']);
  gulp.watch([path.src.img + '**/*'], ['img']);

});
