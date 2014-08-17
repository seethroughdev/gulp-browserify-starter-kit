'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')();

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

gulp.task('clean', function() {
  return gulp.src(path.dist.path, {read: false})
    .pipe($.clean())
    .on('error', handleErrors);
});
