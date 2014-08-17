/**
*
* I'm choosing to deploy to gh-pages, but feel free to replace this
* task with any deployment task you choose.
*
**/


'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   ghPages     = require('gulp-gh-pages')
,   runSequence = require('run-sequence');

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


gulp.task('deploy:gh', function() {
  return gulp.src(path.dist.path)
    .pipe(ghPages())
    .on('error', handleErrors);
});

gulp.task('deploy', function(callback) {
  runSequence('clean', 'default', 'deploy:gh', callback);
});
