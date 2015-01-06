'use strict';

var gulp = require('gulp'),
    path = require('../utils/paths');

gulp.task('data', function() {
  return gulp.src(path.src.data + '**/*')
    .pipe(gulp.dest(path.dist.data));
});
