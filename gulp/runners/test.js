'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')();

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

var mochaOpts = {
  reporter: 'spec',
  globals: ['module']
};

var phantomOpts = {
  viewportSize: {
    width: 1,
    height: 1
  }
};

gulp.task('test:unit', function() {
  return gulp.src(path.test.unit + '**/*.js')
    .pipe($.mocha(mochaOpts));
});

gulp.task('test:functional', function() {
  return gulp.src(path.test.functional + 'runner.html')
    .pipe($.mochaPhantomjs({phantomjs: phantomOpts}));
});

gulp.task('test:watch', ['test'], function() {
  gulp.watch([path.src.js + '**/*.js'], ['test']);
  gulp.watch([path.test.unit + '**/*.js'], ['test:unit']);
  gulp.watch([path.test.functional + '**/*'], ['test:functional']);
});

gulp.task('test', ['test:unit', 'test:functional']);
