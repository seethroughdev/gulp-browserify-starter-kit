'use strict';

var gulp        = require('gulp')
,   rimraf      = require('rimraf')
,   $           = require('gulp-load-plugins')();

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

gulp.task('clean', function(callback) {
  rimraf(path.dist.path, callback);
});
