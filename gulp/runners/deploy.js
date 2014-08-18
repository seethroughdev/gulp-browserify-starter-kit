
'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   runSequence = require('run-sequence');

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


/*==========  GH PAGES OPTIONS  ==========*/

var ghPagesOpts = {
  origin: 'origin',
  branch: 'gh-pages'
};

gulp.task('deploy:gh', function() {
  return gulp.src(path.dist.path + '**/*.*')
    .pipe($.ghPages(ghPagesOpts))
    .on('error', handleErrors)
    .pipe(gulp.dest('.tmp'));
});

gulp.task('deploy', function(callback) {
  runSequence('clean', 'default', 'deploy:gh', callback);
});
