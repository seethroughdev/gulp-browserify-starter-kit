/**
*
* For some reason the latest gh-pages is broken with gulp,
* waiting for a fix, after, after, we'll need to add deploy:gh
* back to the deploy task list.
*
**/


'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   runSequence = require('run-sequence');

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


/*==========  GH PAGES OPTIONS  ==========*/

var ghPagesOpts = {
  cacheDir: '.tmp',
  origin: 'origin',
  branch: 'gh-pages'
};

gulp.task('deploy:gh', function() {
  return gulp.src(path.dist.path + '**/*.*')
    .pipe($.ghPages(ghPagesOpts))
    .on('error', handleErrors)
    .pipe(gulp.dest(ghPagesOpts.cacheDir));
});

gulp.task('deploy', function(callback) {
  runSequence('clean', 'default', 'deploy:gh', callback);
});
