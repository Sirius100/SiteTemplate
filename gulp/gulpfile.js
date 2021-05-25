const gulp                = require('gulp');
const rename              = require("gulp-rename");
const sass                = require('gulp-ruby-sass');
const concat              = require('gulp-concat');
const prefixer            = require('gulp-autoprefixer');
const pug                 = require('gulp-pug');
const plumber             = require('gulp-plumber');
const sourcemaps          = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');



gulp.task( 'imgmin', () => {
  return gulp.src('../src/img/*.*')
    .pipe(imagemin(["*.png", "*.jpg"], "images", {
      use: [
        webp({ quality: 75})
      ]
    }))
    .pipe(gulp.dest('../src/img_webp/'));
});



//запуск шаблонизатора pug
gulp.task('pug', () =>  {
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  console.log('Start Pug');
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  return gulp.src('../src/pug-sass/*.pug')
  .pipe(plumber())
  .pipe(pug({
    // Your options in here.
      pretty : true
  }))
  .pipe(rename({
    extname: '.php'
  }))
  .pipe(gulp.dest('../'))
  .pipe(plumber.stop())
});



gulp.task('mozilla_sass', () => {
  console.log('Start Sourcemap!!!');
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  console.log('Start Sass!!!');
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  return sass(['../src/pug-sass/mozilla/*.sass'])
    .on('error', sass.logError)
    .pipe(sourcemaps.init({loadMaps : true}))
    .pipe(prefixer())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../src/css/'))
});
gulp.task('webkit_sass', () => {
  console.log('Start Sourcemap!!!');
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  console.log('Start Sass!!!');
  console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
  return sass(['../src/pug-sass/webkit/*.sass'])
    .on('error', sass.logError)
    .pipe(sourcemaps.init({loadMaps : true}))
    .pipe(prefixer())
    .pipe(concat('stylechrome.css'))

    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../src/css'))
});



gulp.task('watch', () => {
  gulp.watch('../src/pug-sass/mozilla/**/*.sass', ['mozilla_sass']);
  gulp.watch('../src/pug-sass/mozilla/*.sass', ['mozilla_sass']);
  gulp.watch('../src/pug-sass/webkit/**/*.sass', ['webkit_sass']);
  gulp.watch('../src/pug-sass/webkit/*.sass', ['webkit_sass']);

  gulp.watch('../src/pug-sass/mozilla/**/*.pug', ['pug']);

  gulp.watch('../src/pug-sass/webkit/**/*.pug', ['pug']);

  gulp.watch('../src/pug-sass/*.pug', ['pug']);
  gulp.watch('../src/img/**/*.pug', ['pug']);
  gulp.watch('../src/img/*.pug', ['pug']);
});

// запуск таска для разработки
gulp.task('default',['watch']);
