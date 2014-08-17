'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   browserSync = require('browser-sync')
,   reload      = browserSync.reload;

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


gulp.task('img:compress', function () {
  return gulp.src(path.src.img + '**/*')
    .pipe($.changed(path.dist.img))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: []
    }))
    .on('error', handleErrors)
    .pipe($.size({ showFiles: true, title: 'images compressed:' }))
    .pipe(gulp.dest(path.dist.img))
    .pipe(reload({ stream: true, once: true }));
});

gulp.task('img:iconfont', function() {
  var fontName = 'icons';

  gulp.src([path.src.img + 'icons/*.svg'])
    .pipe($.changed(path.dist.fonts))
    .pipe($.iconfont({
      fontName: fontName,
      normalize: true,
      appendCodepoints: true
    }))
    .on('error', handleErrors)
    .on('codepoints', function(codepoints, options) {
      gulp.src(path.src.css + 'templates/_font-icons.scss')
        .pipe($.consolidate('lodash', {
          glyphs: codepoints,
          fontName: fontName,
          fontPath: path.dist.fonts
          }))
        .on('error', handleErrors)
        .pipe(gulp.dest(path.src.css + 'modules/'));
    })
    .pipe(gulp.dest(path.dist.fonts));
  });

gulp.task('img', [ 'img:compress', 'img:iconfont' ]);
