'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   browserSync = require('browser-sync')
,   reload      = browserSync.reload;

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


gulp.task('css:scss', function () {
  return gulp.src([ path.src.css + '**/*.scss' ])
    .pipe($.rubySass())
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe($.csso())
    .pipe($.size({ showFiles: true, title: 'css compressed:' }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.reload({ stream:true }));
});

gulp.task('css', [ 'css:scss' ]);
