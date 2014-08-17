'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')();

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

var mochaOpts = {
  reporter: 'spec',
  globals: ['module']
};

gulp.task('test', function() {
  return gulp.src(path.test.path + '**/*.js')
    .pipe($.mocha(mochaOpts));
});
