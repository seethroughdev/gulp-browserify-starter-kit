'use strict';

var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')(),
  watchify    = require('watchify'),
  browserify  = require('browserify'),
  reactify    = require('reactify'),
  buffer      = require('vinyl-buffer'),
  source      = require('vinyl-source-stream'),
  browserSync = require('browser-sync');

var path      = require('../utils/paths'),
  handleErrors = require('../utils/handleErrors');


// Array shared between mainJS external and vendorJS require options.

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
  'to-no-case',
  'moment'
];


var production = process.env.NODE_ENV === 'production';

/*==========  MainJS Handling  ==========*/

var mainBundle = watchify(browserify({
    basedir: __dirname,
    debug: !production,
    entries: '../../' + path.src.js + 'index.js',
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.jsx']
  }, watchify.args));

mainBundle.transform(reactify);
mainBundle.external(dependencies);
mainBundle.on('update', function() {
  return bundle(mainBundle, 'bundle.js');
});


/*==========  VENDOR JS BUNDLE  ==========*/

var vendorBundle = watchify(browserify({
  basedir: __dirname,
  debug: !production,
  entries: '../../' + path.src.js + 'vendor.js',
  cache: {},
  packageCache: {},
  fullPaths: true,
  require: dependencies
}));

vendorBundle.on('update', function() {
  return bundle(vendorBundle, 'vendor.js');
});


/*==========  BUNDLE FUNCTION  ==========*/

function bundle(src, filename) {
  var startTime = Date.now();
  return src.bundle()
    .on('error', handleErrors)
    .pipe(source(filename))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.if(production, $.uglify()))
      .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.js))
    .pipe($.size({
      showFiles: true
    }))
    .pipe(browserSync.reload({ stream:true }));
}


/*==========  ADDING TASKS  ==========*/

gulp.task('js:browserify', function() {
  return bundle(mainBundle, 'bundle.js');
});


gulp.task('js:vendor', function() {
  return bundle(vendorBundle, 'vendor.js');
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


gulp.task('js', ['js:browserify', 'js:vendor', 'js:modernizr', 'js:hint']);
