'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   browserSync = require('browser-sync')
,   reload      = browserSync.reload;

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

gulp.task('html:all', function () {
  return gulp.src(path.src.html + 'pages/**/*.jade')
    .pipe($.jade({ pretty: true }))
    .on('error', handleErrors)
    .pipe($.size({ showFiles: true, title: 'HTML COMPRESSED' }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({ stream:true }));
});

gulp.task('html', [ 'html:all' ]);
