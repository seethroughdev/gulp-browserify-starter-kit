'use strict';

var gulp        = require('gulp')
,   browserSync = require('browser-sync');

var path = require('../utils/paths');

function browserSyncInit() {
  return browserSync.init({
    server: {
      baseDir: path.dist.path,
      directory: true
    },
    startPath: '/views/',
    notify: false,
    browser: 'google chrome canary'
  });
}

gulp.task('serve', [ 'default', 'test' ], function () {

  browserSyncInit();

  gulp.watch([path.src.html + '**/*.jade'], ['html']);
  gulp.watch([path.src.css + '**/*.scss'], ['css']);
  gulp.watch([path.src.js + '**/*.js'], ['js', 'test:unit']);
  gulp.watch([path.src.img + '**/*'], ['img']);
  gulp.watch([path.test.unit + '**/*.js'], ['test:unit']);
  gulp.watch([path.test.functional + '**/*'], ['test:functional']);

});

gulp.task('serve:notest', [ 'default' ], function() {

  browserSyncInit();
  gulp.watch([path.src.js + '**/*.js'], ['js']);
  gulp.watch([path.src.html + '**/*.jade'], ['html']);
  gulp.watch([path.src.css + '**/*.scss'], ['css']);
  gulp.watch([path.src.img + '**/*'], ['img']);

})
