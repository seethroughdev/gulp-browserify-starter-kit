'use strict';

var gulp        = require('gulp')
,   browserSync = require('browser-sync');

var path = require('../utils/paths');

gulp.task('serve', [ 'default', 'test' ], function () {

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
  gulp.watch([path.src.js + '**/*.js'], ['js', 'test:unit']);
  gulp.watch([path.src.img + '**/*'], ['img']);
  gulp.watch([path.test.unit + '**/*.js'], ['test:unit']);
  gulp.watch([path.test.functional + '**/*'], ['test:functional']);

});
