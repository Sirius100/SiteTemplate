'use strict';

const {parallel, watch, src, dest}  = require('gulp');
const rename                        = require("gulp-rename");
const sass                          = require('gulp-dart-sass');
const concat                        = require('gulp-concat');
const prefixer                      = require('gulp-autoprefixer');
const pug                           = require('gulp-pug');
const plumber                       = require('gulp-plumber');
const browserSync                   = require('browser-sync').create();
const uglify                        = require("gulp-uglify-es").default;
const sourcemaps                    = require('gulp-sourcemaps');
const imagemin                      = require('gulp-imagemin');
const webp                          = require('imagemin-webp');

// секция функций и тасков для сборки готового сайта build
function uglifymin(){
  return src([
      "../src/js/**/*.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ])
    // .pipe(rename("bundle.min.js"))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest("../dist/js"));
}


function imgcompressed(){
	src('../src/img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
		.pipe(dest('../dist/img'))
  };

// эта функция вызывается командой build , когда сайт готов и собирается проект
function styles_min(){
  return src('../src/pug-sass/mozilla/*.sass')
    // .pipe(prefixer({cascade: false}))
    // ключ outputStyle имеет несколько значений:
    //  'compressed' - сжатый вид
    //  'expanded' - читабельный вид
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer({
      browsers: ['last 10 versions'],
      cascade: false}))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('../dist/css'))
    .pipe(browserSync.stream());
}

function create_dir_bild(){
  return src([
    '../src/css/*',
    '../src/font/**/*',
    '../src/*.php'
    ], {base: '../src'})
    .pipe(dest('../dist'));
}

// секция функций и тасков для webde-йва  сайта
function styles(){
  return src('../src/pug-sass/mozilla/*.sass')
    // .pipe(prefixer({cascade: false}))
    // ключ outputStyle имеет несколько значений:
    //  'compressed' - сжатый вид
    //  'expanded' - читабельный вид
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(prefixer({
      browsers: ['last 10 versions'],
      cascade: false}))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('../src/css'))
    .pipe(browserSync.stream());
}

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
    .pipe(dest('../src'))
    .pipe(browserSync.stream());
}
function uglifymindev(){
  return src([
      "../src/js/**/*.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ])
    // .pipe(rename("bundle.min.js"))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest("../src/js"));
}

function browser(){
  browserSync.init({
      injectChanges: true,
      proxy: 'animxyz',
      notify: false
  });
}


function watching(){
  watch([
    '../src/pug-sass/mozilla/*.sass',
    '../src/pug-sass/mozilla/**/*.sass',
    '../src/pug-sass/*.sass'], styles);

  watch([
    '../src/pug-sass/*.pug',
    '../src/pug-sass/**/*.pug',
    '../src/img/**/*.pug',
    '../src/img/*.pug'], funcpug);
  watch([
    "../src/js/**/*",
    "!../src/js/bundle.min.js"
  ], uglifymindev)

  watch("../src/*.php").on('change', browserSync.reload);
  watch(["../src/js/**/*","!../src/js/bundle.min.js"]).on('change', browserSync.reload);
  watch("../src/css/*.css").on('change', browserSync.reload);
}

exports.uglifymin         = uglifymin;
exports.imgcompressed     = imgcompressed;
exports.browser           = browser;
exports.styles_min        = styles_min;
exports.create_dir_bild   = create_dir_bild;

exports.styles            = styles;
exports.funcpug           = funcpug;
exports.uglifymindev      = uglifymindev;
exports.watching          = watching;



exports.default = parallel(browser, watching);
exports.build = parallel(uglifymin, imgcompressed, styles_min, create_dir_bild);
