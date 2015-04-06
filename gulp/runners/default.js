'use strict';

var gulp        = require('gulp'),
    args       = require('yargs').alias('p', 'production').argv,
    webpackBuild = require('../../webpack/build'),
    webpackDevServer = require('../../webpack/devserver'),
    makeWebpackConfig = require('../../webpack/makeconfig');

gulp.task('env', function() {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build-webpack-production', webpackBuild(makeWebpackConfig(false)));
gulp.task('build-webpack-dev', webpackDevServer(makeWebpackConfig(true)));
gulp.task('build-webpack', [args.production ? 'build-webpack-production' : 'build-webpack-dev']);
gulp.task('build', ['build-webpack']);

// gulp.task('default', ['css', 'js', 'js:vendor', 'html', 'img', 'data']);
gulp.task('server', ['env', 'build']);
gulp.task('default',  ['server']);
