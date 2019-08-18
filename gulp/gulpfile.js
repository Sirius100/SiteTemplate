const gulp            = require('gulp');
const sass            = require('gulp-ruby-sass');
const concat          = require('gulp-concat');
const prefixer        = require('gulp-autoprefixer');
const pug             = require('gulp-pug');



//объединение файлов *.sass in style.sass
gulp.task('concat',  () => {
   return gulp.src('../sass/css/*.css')
       .pipe(concat('style.css'))
       .pipe(gulp.dest('../css'))
});

gulp.task('watch', () => {
    gulp.watch('../sass/*.sass', ['sass']);
    gulp.watch('../pug/*.pug', ['pug']);
});

//запуск шаблонизатора pug
gulp.task('pug', () =>  {
   return gulp.src('../pug/*.pug')
  .pipe(pug({
    // Your options in here.
      pretty : true
  }))
  .pipe(gulp.dest('../html/'))
});

//команда запуска препроцессора sass
//создает сss файл из sass файла
gulp.task('sass',  () => {
    sass('../sass/*.sass')
    .on('error', sass.logError)
        .pipe(gulp.dest('../sass/css/'))
            .pipe(concat('style.css'))
            .pipe(prefixer())
            .pipe(gulp.dest('../css'))
});

gulp.task('default',['watch']);
