'use strict';

const {parallel, watch, src, dest}  = require('gulp');
const rename                        = require("gulp-rename");
const pug                           = require('gulp-pug');
const plumber                       = require('gulp-plumber');
const bs                  = require('browser-sync').create('Animxyz');
const requireDir                    = require('require-dir');
const tasks                         = requireDir('./modulesTasks');


function funcpug(){
  return src('../src/pug-sass/*.pug')
    .pipe(plumber())
    .pipe(pug({
      // Your options in here.
        pretty : true
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(plumber.stop())
    .pipe(dest('../src/'))
}

// эта функция используется для обновления сайта на apache
// function browser(){
//   browserSync.init({
//       injectChanges: true,
//       proxy: 'animxyz',
//       notify: false
//   });
// }


exports.imgcompressed     = tasks.imgcompressed;
exports.stylesmin         = tasks.stylesmin;
exports.create_dir_bild   = tasks.create_dir_bild;
exports.uglifymin         = tasks.uglifymin;


exports.bs                = tasks.bs;
exports.server            = tasks.server;
exports.styles            = tasks.styles;
exports.uglifymindev      = tasks.uglifymindev;
exports.watching          = tasks.watching;
exports.funcpug          = funcpug;




exports.default = parallel (
  exports.bs,
  exports.server,
  exports.watching
  );

exports.build = parallel(exports.uglifymin, exports.imgcompressed, exports.stylesmin, exports.create_dir_bild);
