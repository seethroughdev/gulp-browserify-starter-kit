/**
*
* I'm choosing to deploy to gh-pages, but feel free to replace this
* task with any deployment task you choose.
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
