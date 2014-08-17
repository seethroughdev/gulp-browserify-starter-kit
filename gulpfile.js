'use strict';

require('./gulp');

// 'use strict';


// var gulp        = require('gulp')
// ,   $           = require('gulp-load-plugins')()
// ,   browserSync = require('browser-sync')
// ,   reload      = browserSync.reload
// ,   fs          = require('fs')
// ,   browserify = require('browserify')
// ,   source     = require('vinyl-source-stream');


// // var path = {
// //   src: {
// //     path: 'app/',
// //     css: 'app/scss/',
// //     img: 'app/img/',
// //     js: 'app/js/',
// //     html: 'app/html/'
// //   },
// //   dist: {
// //     path: 'dist/',
// //     css: 'dist/css/',
// //     img: 'dist/img/',
// //     js: 'dist/js/',
// //     html: 'dist/views/',
// //     fonts: 'dist/fonts/'
// //   }
// // };



// /*==========  JAVASCRIPT  ==========*/

// // Options
// var browserifyOpts = {
//   debug: true,
//   external: 'jquery',
//   standalone: 'shared'
// };

// gulp.task('js:browserify', function () {
//   return browserify( './' + path.src.js + 'index.js', browserifyOpts ).bundle()
//     .pipe(source( './' + path.src.js + 'index.js' ))
//     .pipe($.changed(path.dist.js))
//     .pipe($.rename('bundle.js'))
//     .pipe(gulp.dest(path.dist.js))
//     .pipe($.rename('bundle.min.js'))
//     .pipe($.streamify($.uglify()))
//     .pipe(gulp.dest(path.dist.js));
// });

// gulp.task('js:hint', function () {
//   return gulp.src([path.src.js + '**/*.js', '!' + path.src.js + 'vendor/**/*.js'])
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.jshint.reporter('fail'))
//     .pipe(reload({stream: true}));
// });

// gulp.task('js:vendor', function() {
//   return gulp.src([path.src.js + 'vendor/**/*.js', '!' + path.src.js + 'vendor/modernizr.js'])
//     .pipe($.changed(path.dist.js + 'vendor/'))
//     .pipe($.concat('vendor.js'))
//     .pipe($.uglify())
//     .pipe($.size({ showFiles: true, title: 'compressed vendor:' }))
//     .pipe(gulp.dest(path.dist.js));
// });

// gulp.task('js:modernizr', function() {
//   return gulp.src(path.src.js + 'vendor/modernizr.js')
//     .pipe($.changed(path.dist.js + 'vendor/modernizr/js'))
//     .pipe($.uglify())
//     .pipe($.size({ showFiles: true, title: 'compressed modernizr:' }))
//     .pipe(gulp.dest(path.dist.js));
// });

// gulp.task('js', ['js:browserify', 'js:vendor', 'js:modernizr']);



// /*==========  IMAGES  ==========*/


// gulp.task('images:compress', function () {
//   return gulp.src(path.src.img + '**/*')
//     .pipe($.changed(path.dist.img))
//     .pipe($.imagemin({
//       progressive: true,
//       interlaced: true,
//       svgoPlugins: []
//     }))
//     .pipe($.size({ showFiles: true, title: 'IMAGES COMPRESSED' }))
//     .pipe(gulp.dest(path.dist.img))
//     .pipe(reload({ stream: true, once: true }));
// });

// gulp.task('images:iconfont', function() {
//   var fontName = 'icons';

//   gulp.src([path.src.img + 'icons/*.svg'])
//     .pipe($.changed(path.dist.fonts))
//     .pipe($.iconfont({
//       fontName: fontName,
//       normalize: true,
//       appendCodepoints: true
//     }))
//     .on('codepoints', function(codepoints, options) {
//       gulp.src(path.src.css + 'templates/_font-icons.scss')
//         .pipe($.consolidate('lodash', {
//           glyphs: codepoints,
//           fontName: fontName,
//           fontPath: '/fonts/' + version + '/'
//           }))
//         .pipe(gulp.dest(path.src.css + 'modules/'));
//     })
//     .pipe(gulp.dest(path.dist.fonts));
//   });

// gulp.task('images', [ 'images:compress', 'images:iconfont' ]);



// /*==========  CSS  ==========*/


// gulp.task('styles:scss', function () {
//   return gulp.src([ path.src.css + '**/*.scss' ])
//     .pipe($.rubySass())
//     .pipe($.autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
//     .pipe($.csso())
//     .pipe($.size({ showFiles: true, title: 'CSS COMPRESSED' }))
//     .pipe(gulp.dest(path.dist.css))
//     .pipe(browserSync.reload({ stream:true }));
// });

// gulp.task('styles', [ 'styles:scss' ]);



// /*==========  HTML  ==========*/


// gulp.task('html:all', function () {
//   return gulp.src(path.src.html + 'pages/**/*.jade')
//     .pipe($.jade({ pretty: true }))
//     .pipe($.size({ showFiles: true, title: 'HTML COMPRESSED' }))
//     .pipe(gulp.dest(path.dist.html))
//     .pipe(browserSync.reload({ stream:true }));
// });

// gulp.task('html', [ 'html:all' ]);



// /*==========  BUILD  ==========*/


// gulp.task('serve', [ 'default' ], function () {

//   browserSync.init({
//     server: {
//       baseDir: path.dist.path,
//       directory: true
//     },
//     startPath: '/views/',
//     notify: false
//   });

//   gulp.watch([path.src.html + '**/*.jade'], ['html']);
//   gulp.watch([path.src.css + '**/*.scss'], ['styles']);
//   gulp.watch([path.src.js + '**/*.js'], ['js']);
//   gulp.watch([path.src.img + '**/*'], ['images']);
// });


// gulp.task('default', ['styles', 'js', 'html', 'images']);

