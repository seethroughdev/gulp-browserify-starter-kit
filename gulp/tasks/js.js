'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  watchify = require('watchify'),
  uglifyify = require('uglifyify'),
  reactify = require('reactify'),
  envify = require('envify'),
  source = require('vinyl-source-stream');

var path = require('../utils/paths'),
  handleErrors = require('../utils/handleErrors');


var dependencies = [
  'lodash',
  'react/addons',
  'domtastic',
  'react-router',
  'reflux',
  'd3',
  'c3',
  'numeral',
  'reqwest',
  'to-no-case'
];

// // Options
// var browserifyOpts = {
//   debug: true,
//   standalone: 'shared',
//   transform: [
//     'reactify'
//   ]
// };

// gulp.task('js:browserify', function () {
//   return browserify( './' + path.src.js + 'index.js', browserifyOpts ).bundle()
//     .on('error', handleErrors)
//     .pipe(source( './' + path.src.js + 'index.js' ))
//     .pipe($.rename('bundle.js'))
//     .pipe(gulp.dest(path.dist.js))
//     .pipe($.rename('bundle.min.js'))
//     .pipe($.streamify($.uglify()))
//     .on('error', handleErrors)
//     .pipe(gulp.dest(path.dist.js))
//     .pipe(reload({stream: true}));
// });

// gulp.task('js:vendor', function() {
//   return gulp.src([
//       path.npm.path + 'lodash/dist/lodash.js',
//       path.npm.path + 'domtastic/domtastic.js',
//       path.npm.path + 'react/dist/react-with-addons.js',
//       path.npm.path + 'react-router/dist/react-router.js',
//       path.bower.path + 'reflux/dist/reflux.js',
//       path.npm.path + 'd3/d3.js',
//       path.npm.path + 'c3/c3.js',
//       path.npm.path + 'numeral/min/numeral.min.js',
//       path.src.js + 'vendor/**/*.js',
//       '!' + path.src.js + 'vendor/modernizr.js'
//     ])
//     .on('error', handleErrors)
//     .pipe($.changed(path.dist.js + 'vendor/'))
//     .pipe($.concat('vendor.js'))
//     .pipe($.uglify())
//     .pipe($.size({
//       showFiles: true,
//       title: 'compressed vendor:'
//     }))
//     .pipe(gulp.dest(path.dist.js));
// });

var production = process.env.NODE_ENV === 'production';

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify({
    basedir: __dirname,
    debug: !production,
    entries: '../../' + path.src.js + 'index.js',
    cache: {},
    packageCache: {},
    fullPaths: watch,
    extensions: ['.jsx']
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);
  bundler.transform({
    global: true
  }, envify);

  bundler.external(dependencies);

  if (production) {
    bundler.transform({
      global: true
    }, uglifyify);
  }

  rebundle = function() {
    var stream = bundler.bundle();
    var start = Date.now();
    stream.on('error', handleErrors);

    stream = stream.pipe(source('bundle.js'));

    if (production) {
      stream.pipe($.streamify($.uglify()));
    }

    return stream
      .pipe(gulp.dest(path.dist.js))
      .pipe($.notify(function() {
        console.log('Bundle built in ' + (Date.now() - start) + 'ms');
      }))
      .pipe(reload({
        stream: true
      }));
  };
  bundler.on('update', rebundle);

  return rebundle();
}

gulp.task('js:browserify', function() {
  return scripts(true);
});

gulp.task('js:vendor', function() {
    var vendorsBundler = browserify({
    basedir: __dirname,
    debug: !production,
    entries: '../../' + path.src.js + 'vendor.js',
    cache: {},
    packageCache: {},
    fullPaths: true,
    require: dependencies
  });

  var start = new Date();
  vendorsBundler.bundle()
    .on('error', handleErrors)
    .pipe(source('vendor.js'))
    .pipe($.streamify($.uglify()))
    .pipe(gulp.dest(path.dist.js))
    .pipe($.notify(function() {
      console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
    }));
});

gulp.task('js:modernizr', function() {
  return gulp.src(path.bower.path + 'modernizr/modernizr.js')
    .on('error', handleErrors)
    .pipe($.changed(path.dist.js + 'vendor/modernizr/js'))
    .pipe($.uglify())
    .pipe($.size({
      showFiles: true,
      title: 'compressed modernizr:'
    }))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js:hint', function() {
  return gulp.src([path.src.js + '**/*', '!' + path.src.js + 'vendor/**/*.js'])
    .pipe($.jscs())
    .on('error', handleErrors);
});


gulp.task('js', ['js:browserify', 'js:modernizr', 'js:hint']);
